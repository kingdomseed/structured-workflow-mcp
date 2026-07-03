#!/usr/bin/env node

// Codex command-hook logging adapter.

const path = require('path');
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

const SUPPORTED_EVENTS = new Set([
  'SessionStart',
  'UserPromptSubmit',
  'PreToolUse',
  'PermissionRequest',
  'PostToolUse',
]);

function main() {
  let raw = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => { raw += chunk; });
  process.stdin.on('end', () => {
    try {
      handleEvent(JSON.parse(raw));
    } catch (error) {
      console.error(`[act-codex-log-session] Failed to parse stdin: ${error.message}`);
    }
  });
}

function handleEvent(input) {
  const eventName = input?.hook_event_name;
  const sessionId = input?.session_id;
  if (!SUPPORTED_EVENTS.has(eventName) || !sessionId) {
    return;
  }

  const settings = loadActSettings();
  if (!isLoggingEnabled(settings)) {
    return;
  }

  const projectDir = input.cwd || process.cwd();
  const canonicalEvent = mapCodexInputToCanonical(input);
  const line = formatLine(eventName, extractFieldsFromCanonical(eventName, canonicalEvent));

  if (eventName === 'SessionStart') {
    const logDir = ensureLogDir(projectDir);
    const existingLog = findLogFile(logDir, sessionId);
    if (existingLog) {
      writeLogLine(existingLog, line);
    } else {
      writeFirstLogLine(createLogFile(logDir, sessionId), line);
    }
    return;
  }

  const logFile = findLogFile(path.join(projectDir, 'ai_logs'), sessionId);
  if (logFile) {
    writeLogLine(logFile, line);
  }
}

function mapCodexInputToCanonical(input) {
  return {
    source: input.source,
    model: input.model,
    prompt: input.prompt,
    toolName: input.tool_name,
    toolInput: toCanonicalToolInput(input.tool_input),
  };
}

function toCanonicalToolInput(payload) {
  if (!payload || typeof payload !== 'object') {
    return undefined;
  }

  return {
    command: payload.command,
    description: payload.description,
    file_path: payload.file_path || extractPatchPathSummary(payload.command),
    pattern: payload.pattern,
    query: payload.query,
    url: payload.url,
  };
}

function extractPatchPathSummary(command) {
  if (typeof command !== 'string') {
    return undefined;
  }
  const paths = extractApplyPatchPaths(command, { includeDelete: true });
  return paths.length > 0 ? paths.join(',') : undefined;
}

function extractApplyPatchPaths(command, { includeDelete = false } = {}) {
  if (typeof command !== 'string') {
    return [];
  }

  const paths = [];
  for (const line of command.split(/\r?\n/)) {
    const match = line.match(/^\*\*\* (Update File|Add File|Delete File|Move to):\s*(.+)$/);
    if (!match) {
      continue;
    }
    if (match[1] === 'Delete File' && !includeDelete) {
      continue;
    }
    paths.push(match[2].trim());
  }
  return paths;
}

if (require.main === module) {
  main();
}

module.exports = {
  SUPPORTED_EVENTS,
  mapCodexInputToCanonical,
  extractApplyPatchPaths,
};
