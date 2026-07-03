#!/usr/bin/env node

// Codex PostToolUse formatter adapter for apply_patch edits.

const { formatDartFiles } = require('../core/act-dart-formatter');
const { extractApplyPatchPaths } = require('./act-codex-log-session');

function main() {
  let raw = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => { raw += chunk; });
  process.stdin.on('end', () => {
    try {
      const input = JSON.parse(raw);
      handleEvent(input);
    } catch (error) {
      console.error(`[act-codex-dart-format] Failed to parse stdin: ${error.message}`);
    }
  });
}

function handleEvent(input, options = {}) {
  if (input?.hook_event_name !== 'PostToolUse' || input?.tool_name !== 'apply_patch') {
    return { dartPaths: [], error: null };
  }

  const candidatePaths = extractFormatterCandidatePaths(input);
  const result = formatDartFiles({
    candidatePaths,
    projectDirectory: input.cwd || process.cwd(),
    runFormat: options.runFormat,
  });
  if (result.error) {
    console.error(`[act-codex-dart-format] dart format failed: ${result.error}`);
  }
  return result;
}

function extractFormatterCandidatePaths(input) {
  return extractApplyPatchPaths(input?.tool_input?.command, { includeDelete: false });
}

if (require.main === module) {
  main();
}

module.exports = {
  handleEvent,
  extractFormatterCandidatePaths,
};
