import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');
const fixturesRoot = path.join(__dirname, 'fixtures');

const require = createRequire(import.meta.url);
const { formatDartFiles } = require(path.join(repoRoot, 'hooks/core/act-dart-formatter.js'));
const {
  SETTINGS_ERROR_CODES,
  getActSettingsPath,
  loadActSettings,
  isLoggingEnabled,
  resolveToolkitPath,
} = require(path.join(repoRoot, 'hooks/core/act-settings.js'));
const { extractFormatterCandidatePaths, handleEvent: handleCodexFormatEvent } = require(path.join(repoRoot, 'hooks/codex/act-codex-dart-format.js'));

async function main() {
  await testFormatDartFiles();
  testActSettingsLoader();
  testClaudeLogSessionMapping();
  testCodexLogSessionAdapter();
  testCodexLogSessionGatesAndInvalidInput();
  testCodexFormatterAdapter();
  testCodexInstallLayout();
  testClaudeLoggingGateAndWarnings();
  testClaudeStatuslineUnaffectedWhenLoggingDisabled();
  testInstallHooksTransformsCommandsAndIsIdempotent();
  testInstallHooksRemovePreservesSimilarUserEntries();
  testInstallHooksRemoveLegacyStatusLineByExactCommand();
  testInstallHooksRemovePreservesUserStatusLine();
  testClaudeInstallLayout();
  await testOpenCodeAdapterMapping();
  await testOpenCodeSkillLoggingIncludesSkillName();
  await testOpenCodeLoggingDisabledKeepsFormatter();
  await testOpenCodeSettingsWarningDedupe();
  await testOpenCodePluginStartupWarning();
  console.log('hooks tests: ok');
}

function testCodexLogSessionAdapter() {
  const projectDir = makeTempDir('act-hooks-codex-');
  const homeDir = makeTempDir('act-hooks-codex-home-');
  writeActSettings(homeDir, { enableLogging: true });

  const sessionStart = { ...fixture('codex/session-start.json'), cwd: projectDir };
  const duplicateStart = { ...fixture('codex/session-start-resume.json'), cwd: projectDir };
  const prompt = { ...fixture('codex/user-prompt-submit.json'), cwd: projectDir };
  const preTool = { ...fixture('codex/pre-tool-use-apply-patch.json'), cwd: projectDir };
  const permission = { ...fixture('codex/permission-request.json'), cwd: projectDir };
  const postTool = { ...fixture('codex/post-tool-use-apply-patch.json'), cwd: projectDir };

  for (const event of [sessionStart, duplicateStart, prompt, preTool, permission, postTool]) {
    const result = runNodeScript('hooks/codex/act-codex-log-session.js', JSON.stringify(event), {
      ...process.env,
      HOME: homeDir,
    });
    assert.equal(result.stdout, '');
  }

  const logDir = path.join(projectDir, 'ai_logs');
  const entries = fs.readdirSync(logDir).filter((entry) => entry.endsWith('_codex-session-1.log'));
  assert.equal(entries.length, 1);

  const logContent = fs.readFileSync(path.join(logDir, entries[0]), 'utf8');
  assert.equal((logContent.match(/\[SessionStart\]/g) || []).length, 2);
  assert.match(logContent, /source=startup/);
  assert.match(logContent, /source=resume/);
  assert.match(logContent, /\[UserPromptSubmit\] prompt="Format the edited Dart file"/);
  assert.match(logContent, /\[PreToolUse\] tool=apply_patch/);
  assert.match(logContent, /file_path=lib\/main\.dart,lib\/extra\.dart,lib\/old\.dart/);
  assert.match(logContent, /\[PermissionRequest\] tool=Bash command="dart test" description="Run Dart tests"/);
  assert.match(logContent, /\[PostToolUse\] tool=apply_patch/);
  assert.doesNotMatch(logContent, /very long raw response/);
}

function testCodexLogSessionGatesAndInvalidInput() {
  const projectDir = makeTempDir('act-hooks-codex-gates-');
  const disabledHome = makeTempDir('act-hooks-codex-disabled-home-');
  writeActSettings(disabledHome, { enableLogging: false });

  const disabledResult = runNodeScript('hooks/codex/act-codex-log-session.js', JSON.stringify({
    ...fixture('codex/session-start.json'),
    cwd: projectDir,
  }), {
    ...process.env,
    HOME: disabledHome,
  });
  assert.equal(disabledResult.stdout, '');
  assert.equal(disabledResult.stderr, '');
  assert.equal(fs.existsSync(path.join(projectDir, 'ai_logs')), false);

  const enabledHome = makeTempDir('act-hooks-codex-enabled-home-');
  writeActSettings(enabledHome, { enableLogging: true });
  const noPriorLog = runNodeScript('hooks/codex/act-codex-log-session.js', JSON.stringify({
    ...fixture('codex/user-prompt-submit.json'),
    cwd: projectDir,
  }), {
    ...process.env,
    HOME: enabledHome,
  });
  assert.equal(noPriorLog.stdout, '');
  assert.equal(noPriorLog.stderr, '');
  assert.equal(fs.existsSync(path.join(projectDir, 'ai_logs')), false);

  const missingSession = runNodeScript('hooks/codex/act-codex-log-session.js', JSON.stringify({
    hook_event_name: 'SessionStart',
    cwd: projectDir,
  }), {
    ...process.env,
    HOME: enabledHome,
  });
  assert.equal(missingSession.stderr, '');

  const invalid = runNodeScript('hooks/codex/act-codex-log-session.js', '{ not-json\n', {
    ...process.env,
    HOME: enabledHome,
  });
  assert.equal(invalid.stdout, '');
  assert.match(invalid.stderr, /Failed to parse stdin/);
}

function testCodexFormatterAdapter() {
  const projectDir = makeTempDir('act-hooks-codex-format-');
  fs.mkdirSync(path.join(projectDir, 'lib'), { recursive: true });
  fs.writeFileSync(path.join(projectDir, 'lib/main.dart'), 'void main(){}\n');
  fs.writeFileSync(path.join(projectDir, 'lib/moved.dart'), 'void moved(){}\n');
  fs.writeFileSync(path.join(projectDir, 'lib/generated.g.dart'), '// generated\n');
  fs.writeFileSync(path.join(projectDir, 'lib/readme.txt'), 'text\n');

  const input = {
    ...fixture('codex/post-tool-use-apply-patch.json'),
    cwd: projectDir,
    tool_input: {
      command: [
        'apply_patch <<\'PATCH\'',
        '*** Begin Patch',
        '*** Update File: lib/main.dart',
        '*** Add File: lib/main.dart',
        '*** Update File: lib/generated.g.dart',
        '*** Update File: lib/readme.txt',
        '*** Update File: lib/missing.dart',
        '*** Move to: lib/moved.dart',
        '*** Delete File: lib/deleted.dart',
        '*** End Patch',
        'PATCH',
      ].join('\n'),
    },
  };

  assert.deepEqual(extractFormatterCandidatePaths(input), [
    'lib/main.dart',
    'lib/main.dart',
    'lib/generated.g.dart',
    'lib/readme.txt',
    'lib/missing.dart',
    'lib/moved.dart',
  ]);

  const formatted = [];
  const result = handleCodexFormatEvent(input, {
    runFormat: (filePath) => formatted.push(filePath),
  });
  assert.equal(result.error, null);
  assert.deepEqual(formatted, [
    path.join(projectDir, 'lib/main.dart'),
    path.join(projectDir, 'lib/moved.dart'),
  ]);

  const ignored = handleCodexFormatEvent({ ...input, hook_event_name: 'PreToolUse' });
  assert.deepEqual(ignored.dartPaths, []);

  const scriptResult = runNodeScript('hooks/codex/act-codex-dart-format.js', JSON.stringify(input), {
    ...process.env,
    HOME: makeTempDir('act-hooks-codex-format-home-'),
    PATH: '',
  });
  assert.equal(scriptResult.stdout, '');
  assert.match(scriptResult.stderr, /dart format failed/);
}

function testCodexInstallLayout() {
  const installRoot = makeTempDir('act-hooks-codex-install-');
  const homeDir = makeTempDir('act-hooks-codex-install-home-');
  writeActSettings(homeDir, { enableLogging: true });
  const coreDir = path.join(installRoot, 'core');
  const codexDir = path.join(installRoot, 'codex');
  fs.mkdirSync(coreDir);
  fs.mkdirSync(codexDir);

  for (const file of fs.readdirSync(path.join(repoRoot, 'hooks/core'))) {
    fs.copyFileSync(path.join(repoRoot, 'hooks/core', file), path.join(coreDir, file));
  }
  for (const file of fs.readdirSync(path.join(repoRoot, 'hooks/codex'))) {
    if (file.endsWith('.js')) {
      fs.copyFileSync(path.join(repoRoot, 'hooks/codex', file), path.join(codexDir, file));
    }
  }

  const projectDir = makeTempDir('act-hooks-codex-install-proj-');
  const sessionStart = { ...fixture('codex/session-start.json'), cwd: projectDir };
  const result = spawnSync('node', [path.join(codexDir, 'act-codex-log-session.js')], {
    input: JSON.stringify(sessionStart),
    encoding: 'utf8',
    env: { ...process.env, HOME: homeDir },
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, '');

  const logDir = path.join(projectDir, 'ai_logs');
  const entries = fs.readdirSync(logDir).filter((entry) => entry.endsWith('.log'));
  assert.equal(entries.length, 1);
}

function fixture(relPath) {
  const fullPath = path.join(fixturesRoot, relPath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

function makeTempDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

async function testFormatDartFiles() {
  const projectDir = makeTempDir('act-hooks-format-');
  fs.mkdirSync(path.join(projectDir, 'lib'), { recursive: true });
  fs.writeFileSync(path.join(projectDir, 'lib/main.dart'), 'void main(){}\n');
  fs.writeFileSync(path.join(projectDir, 'lib/model.g.dart'), '// generated\n');

  const formatted = [];
  const result = formatDartFiles({
    candidatePaths: ['lib/main.dart', 'lib/model.g.dart', 'lib/main.dart', 'missing.dart'],
    projectDirectory: projectDir,
    runFormat: (filePath) => {
      formatted.push(filePath);
    },
  });

  assert.equal(result.error, null);
  assert.equal(result.dartPaths.length, 1);
  assert.equal(formatted.length, 1);
  assert.equal(formatted[0], path.join(projectDir, 'lib/main.dart'));

  const failing = formatDartFiles({
    candidatePaths: ['lib/main.dart'],
    projectDirectory: projectDir,
    runFormat: () => {
      throw new Error('boom');
    },
  });
  assert.match(String(failing.error), /boom/);
}

function testClaudeLogSessionMapping() {
  const projectDir = makeTempDir('act-hooks-claude-');
  const homeDir = makeTempDir('act-hooks-claude-home-');
  writeActSettings(homeDir, {
    enableLogging: true,
  });
  const sessionStart = fixture('claude/session-start.json');
  const preToolUse = fixture('claude/pre-tool-use-edit.json');

  runNodeScript('hooks/claude/act-claude-log-session.js', JSON.stringify(sessionStart), {
    ...process.env,
    HOME: homeDir,
    CLAUDE_PROJECT_DIR: projectDir,
  });
  runNodeScript('hooks/claude/act-claude-log-session.js', JSON.stringify(preToolUse), {
    ...process.env,
    HOME: homeDir,
    CLAUDE_PROJECT_DIR: projectDir,
  });

  const logDir = path.join(projectDir, 'ai_logs');
  const entries = fs.readdirSync(logDir).filter((entry) => entry.endsWith('_claude-session-1.log'));
  assert.equal(entries.length, 1);

  const logContent = fs.readFileSync(path.join(logDir, entries[0]), 'utf8');
  assert.match(logContent, /\[SessionStart\]/);
  assert.match(logContent, /\[PreToolUse\]/);
  assert.match(logContent, /tool=Edit/);
  assert.match(logContent, /file_path=lib\/main\.dart/);
}

function testActSettingsLoader() {
  const homeDir = makeTempDir('act-hooks-settings-');
  const settingsPath = getActSettingsPath({ homedir: homeDir });
  const settingsDir = path.dirname(settingsPath);

  const missing = loadActSettings({ homedir: homeDir });
  assert.equal(missing.settingsPath, settingsPath);
  assert.equal(missing.enableLogging, false);
  assert.equal(missing.toolkitPath, null);
  assert.equal(missing.errorCode, null);
  assert.equal(missing.errorMessage, null);
  assert.equal(isLoggingEnabled(missing), false);
  assert.equal(resolveToolkitPath(missing), null);

  fs.mkdirSync(settingsDir, { recursive: true });

  fs.writeFileSync(settingsPath, '{"enableLogging":true,"toolkitPath":"/tmp/act"}\n');
  const enabled = loadActSettings({ homedir: homeDir });
  assert.equal(enabled.enableLogging, true);
  assert.equal(enabled.toolkitPath, '/tmp/act');
  assert.equal(enabled.errorCode, null);
  assert.equal(isLoggingEnabled(enabled), true);
  assert.equal(resolveToolkitPath(enabled), '/tmp/act');

  fs.writeFileSync(settingsPath, '{"enableLogging":false}\n');
  const disabled = loadActSettings({ homedir: homeDir });
  assert.equal(disabled.enableLogging, false);
  assert.equal(disabled.toolkitPath, null);
  assert.equal(disabled.errorCode, null);

  fs.writeFileSync(settingsPath, '{"enableLogging":"yes"}\n');
  const invalidType = loadActSettings({ homedir: homeDir });
  assert.equal(invalidType.enableLogging, false);
  assert.equal(invalidType.toolkitPath, null);
  assert.equal(invalidType.errorCode, SETTINGS_ERROR_CODES.INVALID_TYPE);
  assert.match(invalidType.errorMessage, /boolean/);

  fs.writeFileSync(settingsPath, '{"toolkitPath":123}\n');
  const invalidToolkitPathType = loadActSettings({ homedir: homeDir });
  assert.equal(invalidToolkitPathType.enableLogging, false);
  assert.equal(invalidToolkitPathType.toolkitPath, null);
  assert.equal(invalidToolkitPathType.errorCode, SETTINGS_ERROR_CODES.INVALID_TYPE);
  assert.match(invalidToolkitPathType.errorMessage, /toolkitPath must be a string/);

  fs.writeFileSync(settingsPath, '[]\n');
  const invalidShape = loadActSettings({ homedir: homeDir });
  assert.equal(invalidShape.enableLogging, false);
  assert.equal(invalidShape.errorCode, SETTINGS_ERROR_CODES.INVALID_SHAPE);

  fs.writeFileSync(settingsPath, '{ not-json\n');
  const invalidJson = loadActSettings({ homedir: homeDir });
  assert.equal(invalidJson.enableLogging, false);
  assert.equal(invalidJson.errorCode, SETTINGS_ERROR_CODES.INVALID_JSON);

  fs.rmSync(settingsPath, { force: true });
  fs.mkdirSync(settingsPath, { recursive: true });
  const unreadable = loadActSettings({ homedir: homeDir });
  assert.equal(unreadable.enableLogging, false);
  assert.equal(unreadable.errorCode, SETTINGS_ERROR_CODES.UNREADABLE);

  fs.rmSync(settingsPath, { recursive: true, force: true });
  fs.symlinkSync(path.join(homeDir, 'missing-target.json'), settingsPath);
  const unreadableSymlink = loadActSettings({ homedir: homeDir });
  assert.equal(unreadableSymlink.enableLogging, false);
  assert.equal(unreadableSymlink.errorCode, SETTINGS_ERROR_CODES.UNREADABLE);
}

function testClaudeLoggingGateAndWarnings() {
  const projectDir = makeTempDir('act-hooks-claude-disabled-');
  const sessionStart = fixture('claude/session-start.json');
  const preToolUse = fixture('claude/pre-tool-use-edit.json');

  const missingSettingsHome = makeTempDir('act-hooks-claude-home-missing-');
  const missingResult = runNodeScript('hooks/claude/act-claude-log-session.js', JSON.stringify(sessionStart), {
    ...process.env,
    HOME: missingSettingsHome,
    CLAUDE_PROJECT_DIR: projectDir,
  });
  assert.equal(missingResult.stderr.trim(), '');
  assert.equal(fs.existsSync(path.join(projectDir, 'ai_logs')), false);

  const invalidSettingsHome = makeTempDir('act-hooks-claude-home-invalid-');
  writeActSettingsRaw(invalidSettingsHome, '{ invalid-json\n');

  const preToolResult = runNodeScript('hooks/claude/act-claude-log-session.js', JSON.stringify(preToolUse), {
    ...process.env,
    HOME: invalidSettingsHome,
    CLAUDE_PROJECT_DIR: projectDir,
  });
  assert.equal(preToolResult.stderr.trim(), '');

  const sessionStartResult = runNodeScript('hooks/claude/act-claude-log-session.js', JSON.stringify(sessionStart), {
    ...process.env,
    HOME: invalidSettingsHome,
    CLAUDE_PROJECT_DIR: projectDir,
  });
  assert.match(sessionStartResult.stderr, /ACT_SETTINGS_INVALID_JSON/);
  assert.match(sessionStartResult.stderr, /settingsPath=/);
  assert.match(sessionStartResult.stderr, /message=/);
  assert.equal(fs.existsSync(path.join(projectDir, 'ai_logs')), false);
}

function testClaudeStatuslineUnaffectedWhenLoggingDisabled() {
  const homeDir = makeTempDir('act-hooks-claude-statusline-home-');
  writeActSettings(homeDir, {
    enableLogging: false,
  });

  const statuslineEvent = {
    hook_event_name: 'Notification',
    model: { display_name: 'Claude' },
    workspace: { current_dir: process.cwd() },
    context_window: { used_percentage: 20, remaining_percentage: 80, context_window_size: 1000000 },
  };

  const result = runNodeScript('hooks/claude/act-claude-statusline.js', JSON.stringify(statuslineEvent), {
    ...process.env,
    HOME: homeDir,
  });

  assert.ok(result.stdout.length > 0, 'Statusline should produce output even with logging disabled');
}

function testInstallHooksTransformsCommandsAndIsIdempotent() {
  const homeDir = makeTempDir('act-hooks-install-hooks-home-');
  const configDir = path.join(homeDir, "Claude Work's Config");
  const settingsPath = path.join(configDir, 'settings.json');
  const hookDir = path.join(configDir, 'hooks', 'claude');

  for (let i = 0; i < 2; i++) {
    const result = runInstallHooks({ settingsPath, hookDir });
    assert.equal(result.status, 0, result.stderr);
  }

  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  const quotedStatuslinePath = `'${path.join(hookDir, 'act-claude-statusline.js').replaceAll("'", "'\\''")}'`;
  const quotedLogPath = `'${path.join(hookDir, 'act-claude-log-session.js').replaceAll("'", "'\\''")}'`;
  assert.equal(settings.statusLine.command, `node ${quotedStatuslinePath}`);
  assert.equal(settings.hooks.SessionStart.length, 1);
  assert.equal(settings.hooks.SessionStart[0].hooks[0].command, `node ${quotedLogPath}`);
}

function testInstallHooksRemovePreservesSimilarUserEntries() {
  const homeDir = makeTempDir('act-hooks-remove-similar-home-');
  const configDir = path.join(homeDir, '.claude-work');
  const settingsPath = path.join(configDir, 'settings.json');
  const hookDir = path.join(configDir, 'hooks', 'claude');
  fs.mkdirSync(configDir, { recursive: true });
  const userHook = {
    matcher: 'Edit|Write',
    hooks: [{ type: 'command', command: 'node /tmp/user-format.js' }],
    description: '[ACT-ish] Auto-format Dart files after edits (excludes generated .g.dart files)',
  };
  fs.writeFileSync(settingsPath, JSON.stringify({ hooks: { PostToolUse: [userHook] } }, null, 2));

  const install = runInstallHooks({ settingsPath, hookDir });
  assert.equal(install.status, 0, install.stderr);
  const remove = runInstallHooks({ settingsPath, hookDir, remove: true });
  assert.equal(remove.status, 0, remove.stderr);

  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  assert.deepEqual(settings.hooks.PostToolUse, [userHook]);
}

function testInstallHooksRemoveLegacyStatusLineByExactCommand() {
  const homeDir = makeTempDir('act-hooks-remove-legacy-statusline-home-');
  const configDir = path.join(homeDir, '.claude-work');
  const settingsPath = path.join(configDir, 'settings.json');
  const hookDir = path.join(configDir, 'hooks', 'claude');
  const statusLine = {
    type: 'command',
    command: `node '${path.join(hookDir, 'act-claude-statusline.js')}'`,
  };
  fs.mkdirSync(configDir, { recursive: true });
  fs.writeFileSync(settingsPath, JSON.stringify({ hooks: {}, statusLine }, null, 2));

  const remove = runInstallHooks({ settingsPath, hookDir, remove: true });
  assert.equal(remove.status, 0, remove.stderr);

  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  assert.equal(settings.statusLine, undefined);
}

function testInstallHooksRemovePreservesUserStatusLine() {
  const homeDir = makeTempDir('act-hooks-remove-statusline-home-');
  const configDir = path.join(homeDir, '.claude-work');
  const settingsPath = path.join(configDir, 'settings.json');
  const hookDir = path.join(configDir, 'hooks', 'claude');
  const statusLine = {
    type: 'command',
    command: 'node /tmp/user-status.js',
    description: 'User statusline',
  };
  fs.mkdirSync(configDir, { recursive: true });
  fs.writeFileSync(settingsPath, JSON.stringify({ statusLine }, null, 2));

  const remove = runInstallHooks({ settingsPath, hookDir, remove: true });
  assert.equal(remove.status, 0, remove.stderr);

  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  assert.deepEqual(settings.statusLine, statusLine);
}

/**
 * Smoke-test that Claude hook scripts work from the installed directory layout
 * (core/ and claude/ as siblings) rather than only from the repo tree.
 */
function testClaudeInstallLayout() {
  const installRoot = makeTempDir('act-hooks-install-');
  const homeDir = makeTempDir('act-hooks-install-home-');
  writeActSettings(homeDir, {
    enableLogging: true,
  });
  const coreDir = path.join(installRoot, 'core');
  const claudeDir = path.join(installRoot, 'claude');
  fs.mkdirSync(coreDir);
  fs.mkdirSync(claudeDir);

  // Copy files mirroring what install.sh does
  for (const file of fs.readdirSync(path.join(repoRoot, 'hooks/core'))) {
    fs.copyFileSync(path.join(repoRoot, 'hooks/core', file), path.join(coreDir, file));
  }
  for (const file of fs.readdirSync(path.join(repoRoot, 'hooks/claude'))) {
    fs.copyFileSync(path.join(repoRoot, 'hooks/claude', file), path.join(claudeDir, file));
  }

  // Run the log-session script from the installed location
  const projectDir = makeTempDir('act-hooks-install-proj-');
  const sessionStart = fixture('claude/session-start.json');
  const result = spawnSync('node', [path.join(claudeDir, 'act-claude-log-session.js')], {
    input: JSON.stringify(sessionStart),
    encoding: 'utf8',
    env: { ...process.env, HOME: homeDir, CLAUDE_PROJECT_DIR: projectDir },
  });

  if (result.status !== 0) {
    throw new Error(`Install-layout smoke test failed (log-session):\n${result.stderr}`);
  }

  const logDir = path.join(projectDir, 'ai_logs');
  const entries = fs.readdirSync(logDir).filter((e) => e.endsWith('.log'));
  assert.equal(entries.length, 1);
  assert.match(fs.readFileSync(path.join(logDir, entries[0]), 'utf8'), /\[SessionStart\]/);
}

async function testOpenCodeAdapterMapping() {
  const projectDir = makeTempDir('act-hooks-opencode-');

  const { createOpenCodeLogSessionAdapter } = await loadOpenCodeAdapterModule();

  const warnings = [];
  const adapter = createOpenCodeLogSessionAdapter({
    defaultDirectory: projectDir,
    settings: {
      enableLogging: true,
      settingsPath: getActSettingsPath({ homedir: makeTempDir('act-hooks-opencode-home-') }),
      errorCode: null,
      errorMessage: null,
    },
    logWarn: async (message, extra) => {
      warnings.push({ message, extra });
    },
  });

  const sessionCreated = fixture('opencode/session-created.json');
  sessionCreated.properties.info.directory = projectDir;

  const messageUpdated = fixture('opencode/message-updated-user.json');
  const expandedCommandMessage = fixture('opencode/message-updated-user-expanded-help-command.json');
  const commandExecuted = fixture('opencode/command-executed-help-workflow.json');
  const messagePartUpdated = fixture('opencode/message-part-updated-user-text.json');
  const toolBefore = fixture('opencode/tool-before-edit.json');
  const toolAfter = fixture('opencode/tool-after-edit.json');

  await adapter.handleEvent(sessionCreated);

  // Slash command: prefer raw command input, not expanded template body.
  adapter.handleCommandBefore({
    sessionID: commandExecuted.properties.sessionID,
    command: commandExecuted.properties.name,
    arguments: commandExecuted.properties.arguments,
  });
  await adapter.handleEvent(expandedCommandMessage);
  await adapter.handleEvent({
    type: 'message.updated',
    properties: {
      info: {
        id: 'assistant-message-1',
        sessionID: sessionCreated.properties.info.id,
        role: 'assistant',
        parentID: expandedCommandMessage.properties.info.id,
      },
    },
  });
  await adapter.handleEvent({
    type: 'message.part.updated',
    properties: {
      part: {
        id: 'assistant-part-1',
        sessionID: sessionCreated.properties.info.id,
        messageID: 'assistant-message-1',
        type: 'text',
        text: 'done',
      },
    },
  });
  await adapter.handleEvent(commandExecuted);
  await adapter.handleEvent(commandExecuted); // dedupe command by message id
  await adapter.handleEvent({
    type: 'session.idle',
    properties: {
      sessionID: sessionCreated.properties.info.id,
    },
  });

  // Plain prompt fallback: capture user text from message parts.
  const plainUserMessage = {
    ...messageUpdated,
    properties: {
      info: {
        ...messageUpdated.properties.info,
        id: 'message-2',
      },
    },
  };
  const plainUserPart = {
    ...messagePartUpdated,
    properties: {
      part: {
        ...messagePartUpdated.properties.part,
        messageID: 'message-2',
        text: 'What changed in this session?',
      },
    },
  };
  const assistantReply = {
    type: 'message.updated',
    properties: {
      info: {
        id: 'message-3',
        sessionID: sessionCreated.properties.info.id,
        role: 'assistant',
        parentID: 'message-2',
      },
    },
  };

  await adapter.handleEvent(plainUserMessage);
  await adapter.handleEvent(plainUserPart);
  await adapter.handleEvent(assistantReply);
  await adapter.handleEvent({
    type: 'session.idle',
    properties: {
      sessionID: sessionCreated.properties.info.id,
    },
  });

  await adapter.handleEvent(messageUpdated); // dedupe user message by id
  await adapter.handleEvent(messagePartUpdated);
  await adapter.handleEvent(messagePartUpdated); // dedupe after part event
  adapter.handleToolBefore(toolBefore.input, toolBefore.output);
  await adapter.handleToolAfter(toolAfter.input, toolAfter.output);

  const logDir = path.join(projectDir, 'ai_logs');
  const entries = fs.readdirSync(logDir).filter((entry) => entry.endsWith('_opencode-session-1.log'));
  assert.equal(entries.length, 1);

  const logContent = fs.readFileSync(path.join(logDir, entries[0]), 'utf8');
  assert.match(logContent, /\[SessionStart\]/);
  assert.match(logContent, /\[UserPromptSubmit\] prompt="\/act-help workflow"/);
  assert.match(logContent, /\[UserPromptSubmit\] prompt="What changed in this session\?"/);
  assert.doesNotMatch(logContent, /\[UserPromptSubmit\] prompt="done"/);
  assert.doesNotMatch(logContent, /Provide Flutter-style progressive help/);
  assert.match(logContent, /\[PreToolUse\]/);
  assert.match(logContent, /\[PostToolUse\]/);

  const promptMatches = logContent.match(/\[UserPromptSubmit\]/g) || [];
  assert.equal(promptMatches.length, 2);
  assert.equal(warnings.length, 0);
}

async function testOpenCodeSkillLoggingIncludesSkillName() {
  const projectDir = makeTempDir('act-hooks-opencode-skill-');

  const { createOpenCodeLogSessionAdapter } = await loadOpenCodeAdapterModule();

  const adapter = createOpenCodeLogSessionAdapter({
    defaultDirectory: projectDir,
    settings: {
      enableLogging: true,
      settingsPath: getActSettingsPath({ homedir: makeTempDir('act-hooks-opencode-skill-home-') }),
      errorCode: null,
      errorMessage: null,
    },
  });

  await adapter.handleEvent({
    type: 'session.created',
    properties: {
      info: {
        id: 'opencode-session-1',
        directory: projectDir,
      },
    },
  });

  const skillToolEvent = {
    sessionID: 'opencode-session-1',
    tool: 'skill',
    args: {
      name: 'flutter-tdd',
    },
  };

  adapter.handleToolBefore(skillToolEvent, { args: skillToolEvent.args });
  await adapter.handleToolAfter(skillToolEvent, { args: skillToolEvent.args });

  const logDir = path.join(projectDir, 'ai_logs');
  const entries = fs.readdirSync(logDir).filter((entry) => entry.endsWith('_opencode-session-1.log'));
  assert.equal(entries.length, 1);

  const logContent = fs.readFileSync(path.join(logDir, entries[0]), 'utf8');
  assert.match(logContent, /\[PreToolUse\] tool=skill skill=flutter-tdd/);
  assert.match(logContent, /\[PostToolUse\] tool=skill skill=flutter-tdd/);
}

async function testOpenCodeLoggingDisabledKeepsFormatter() {
  const projectDir = makeTempDir('act-hooks-opencode-disabled-');
  fs.mkdirSync(path.join(projectDir, 'lib'), { recursive: true });
  fs.writeFileSync(path.join(projectDir, 'lib', 'main.dart'), 'void main() { print("x"); }\n');

  const { createOpenCodeLogSessionAdapter } = await loadOpenCodeAdapterModule();

  const warnings = [];
  const adapter = createOpenCodeLogSessionAdapter({
    defaultDirectory: projectDir,
    settings: {
      enableLogging: false,
      settingsPath: getActSettingsPath({ homedir: makeTempDir('act-hooks-opencode-home-disabled-') }),
      errorCode: null,
      errorMessage: null,
    },
    logWarn: async (message, extra) => {
      warnings.push({ message, extra });
    },
  });

  const originalPath = process.env.PATH;
  process.env.PATH = '';
  try {
    const sessionCreated = fixture('opencode/session-created.json');
    sessionCreated.properties.info.directory = projectDir;
    await adapter.handleEvent(sessionCreated);
    adapter.handleToolBefore(
      { sessionID: 'opencode-session-1', tool: 'Edit', args: { file_path: 'lib/main.dart' } },
      { args: { file_path: 'lib/main.dart' } },
    );
    await adapter.handleToolAfter(
      { sessionID: 'opencode-session-1', tool: 'Edit', args: { file_path: 'lib/main.dart' } },
      { args: { file_path: 'lib/main.dart' } },
    );
  } finally {
    process.env.PATH = originalPath;
  }

  assert.equal(fs.existsSync(path.join(projectDir, 'ai_logs')), false);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].message, 'dart format skipped');
}

async function testOpenCodeSettingsWarningDedupe() {
  const { createOpenCodeLogSessionAdapter } = await loadOpenCodeAdapterModule();
  const warnings = [];
  const adapter = createOpenCodeLogSessionAdapter({
    defaultDirectory: makeTempDir('act-hooks-opencode-dedupe-'),
    settings: {
      enableLogging: false,
      settingsPath: '/tmp/test-act-settings.json',
      errorCode: SETTINGS_ERROR_CODES.INVALID_JSON,
      errorMessage: 'invalid JSON',
    },
    logWarn: async (message, extra) => {
      warnings.push({ message, extra });
    },
  });

  await adapter.emitSettingsWarning();
  await adapter.emitSettingsWarning();

  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].message, 'ACT settings invalid');
  assert.equal(warnings[0].extra.code, SETTINGS_ERROR_CODES.INVALID_JSON);
  assert.equal(warnings[0].extra.settingsPath, '/tmp/test-act-settings.json');
  assert.equal(warnings[0].extra.message, 'invalid JSON');
}

async function testOpenCodePluginStartupWarning() {
  const homeDir = makeTempDir('act-hooks-opencode-plugin-home-');
  writeActSettingsRaw(homeDir, '{ invalid-json\n');
  const projectDir = makeTempDir('act-hooks-opencode-plugin-project-');

  const modulePath = pathToFileURL(path.join(repoRoot, 'hooks/opencode/act-hooks-plugin.js')).href;
  const { ActHooksPlugin } = await import(modulePath);

  const logs = [];
  const client = {
    app: {
      log: async ({ body }) => {
        logs.push(body);
      },
    },
  };

  const originalHome = process.env.HOME;
  process.env.HOME = homeDir;
  try {
    await ActHooksPlugin({
      directory: projectDir,
      client,
    });
  } finally {
    process.env.HOME = originalHome;
  }

  const warningLogs = logs.filter((entry) => entry.level === 'warn' && entry.message === 'ACT settings invalid');
  assert.equal(warningLogs.length, 1);
  assert.equal(warningLogs[0].extra.code, SETTINGS_ERROR_CODES.INVALID_JSON);
  assert.equal(
    warningLogs[0].extra.settingsPath,
    getActSettingsPath({ homedir: homeDir }),
  );
  assert.match(String(warningLogs[0].extra.message), /invalid JSON/);
}

async function loadOpenCodeAdapterModule() {
  const modulePath = pathToFileURL(path.join(repoRoot, 'hooks/opencode/act-opencode-log-session.js')).href;
  return import(modulePath);
}

function runNodeScript(scriptPath, stdin, env) {
  const result = spawnSync(process.execPath, [path.join(repoRoot, scriptPath)], {
    input: stdin,
    encoding: 'utf8',
    env,
  });

  if (result.status !== 0) {
    throw new Error(`script failed: ${scriptPath}\n${result.stderr}`);
  }

  return result;
}

function runInstallHooks({ settingsPath, hookDir, remove = false }) {
  const args = [
    path.join(repoRoot, 'scripts', 'lib', 'install-hooks.js'),
    '--settings', settingsPath,
    '--hook-dir', hookDir,
    path.join(repoRoot, 'hooks', 'hooks.json'),
  ];
  if (remove) {
    args.splice(1, 0, '--remove');
  }
  return spawnSync('node', args, { encoding: 'utf8' });
}

function writeActSettings(homeDir, value) {
  const settingsPath = getActSettingsPath({ homedir: homeDir });
  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(settingsPath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeActSettingsRaw(homeDir, content) {
  const settingsPath = getActSettingsPath({ homedir: homeDir });
  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(settingsPath, content);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
