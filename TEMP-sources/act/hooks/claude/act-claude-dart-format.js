#!/usr/bin/env node

// Claude PostToolUse hook: auto-format Dart files after edit/write-style tools.

const { formatDartFiles } = require('../core/act-dart-formatter');

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { raw += chunk; });
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw);
    const projectDir = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
    const filePath = input.tool_input?.file_path;
    const candidatePaths = typeof filePath === 'string' ? [filePath] : [];
    const { error } = formatDartFiles({
      candidatePaths,
      projectDirectory: projectDir,
    });
    if (error) {
      console.error('[Hook] dart format failed: ' + error);
    }
  } catch (e) {
    console.error('[act-claude-dart-format] Failed to parse stdin: ' + e.message);
  }

  // Always echo stdin back for PostToolUse data passthrough.
  console.log(raw);
});
