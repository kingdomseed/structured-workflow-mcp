#!/usr/bin/env node

// Claude Code session logging adapter

const {
  ensureLogDir,
  createLogFile,
  findLogFile,
  writeLogLine,
  writeFirstLogLine,
  formatLine,
  extractFieldsFromCanonical,
} = require('../core/act-logger');
const { loadActSettings, isLoggingEnabled } = require('../core/act-settings');

let hasWarnedSettings = false;

function main() {
  let raw = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => { raw += chunk; });
  process.stdin.on('end', () => {
    try {
      const input = JSON.parse(raw);
      handleEvent(input);
    } catch (err) {
      console.error(`[act-claude-log-session] Failed to parse stdin: ${err.message}`);
    }
  });
}

function handleEvent(input) {
  const eventName = input.hook_event_name;
  if (!eventName) return;

  const sessionId = input.session_id;
  if (!sessionId) return;

  const settings = loadActSettings();
  maybeWarnSettings(settings, eventName);
  if (!isLoggingEnabled(settings)) {
    return;
  }

  const projectDir = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
  const canonicalEvent = mapClaudeInputToCanonical(input);
  const fields = extractFieldsFromCanonical(eventName, canonicalEvent);
  const line = formatLine(eventName, fields);

  if (eventName === 'SessionStart') {
    const logDir = ensureLogDir(projectDir);
    const logFile = createLogFile(logDir, sessionId);
    writeFirstLogLine(logFile, line);
    return;
  }

  const logDir = ensureLogDir(projectDir);
  const logFile = findLogFile(logDir, sessionId);
  if (!logFile) return;
  writeLogLine(logFile, line);
}

function maybeWarnSettings(settings, eventName) {
  if (eventName !== 'SessionStart' || hasWarnedSettings || !settings?.errorCode) {
    return;
  }

  hasWarnedSettings = true;
  const escapedMessage = String(settings.errorMessage || 'settings load failed')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
  console.error(
    `[${settings.errorCode}] settingsPath=${settings.settingsPath} message="${escapedMessage}"`,
  );
}

function mapClaudeInputToCanonical(input) {
  return {
    source: input.source,
    model: input.model,
    agentType: input.agent_type,
    prompt: input.prompt,
    toolName: input.tool_name,
    toolInput: toCanonicalToolInput(input.tool_input),
    toolResponse: input.tool_response,
    error: input.error,
    agentId: input.agent_id,
    trigger: input.trigger,
    reason: input.reason,
  };
}

function toCanonicalToolInput(payload) {
  if (!payload || typeof payload !== 'object') {
    return undefined;
  }

  return {
    file_path: payload.file_path,
    old_string: payload.old_string,
    new_string: payload.new_string,
    content: payload.content,
    command: payload.command,
    pattern: payload.pattern,
    subagent_type: payload.subagent_type,
    description: payload.description,
    skill: payload.skill,
    query: payload.query,
    url: payload.url,
    questions: payload.questions,
  };
}

if (require.main === module) {
  main();
}

module.exports = {
  mapClaudeInputToCanonical,
};
