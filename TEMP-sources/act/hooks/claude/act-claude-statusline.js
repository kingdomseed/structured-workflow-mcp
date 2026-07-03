#!/usr/bin/env node
// Claude Code Statusline - ACT Edition
// Shows: context | model | dir | branch

const { execSync } = require('child_process');
const path = require('path');

let rawInput = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => rawInput += chunk);
process.stdin.on('end', () => {
  try {
    const event = JSON.parse(rawInput);
    const modelName = event.model?.display_name || 'Claude';
    const workDir = event.workspace?.current_dir || process.cwd();
    const usedPctRaw = event.context_window?.used_percentage;
    const windowSize = event.context_window?.context_window_size;

    // Git branch + dirty indicator
    const gitOpts = { cwd: workDir, timeout: 500, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] };
    let branchName = '';
    try {
      branchName = execSync('git rev-parse --abbrev-ref HEAD', gitOpts).trim();
      const dirtyFiles = execSync('git --no-optional-locks status --porcelain', gitOpts).trim();
      if (dirtyFiles) branchName += '*';
    } catch (e) {
      branchName = '';
    }

    // Context usage bar
    let contextBar = '';
    if (usedPctRaw != null) {
      const usedPct = Math.max(0, Math.min(100, Math.round(usedPctRaw)));
      const segments = Math.floor(usedPct / 10);
      const progressBar = '█'.repeat(segments) + '░'.repeat(10 - segments);

      // Token count — prefer precise current_usage input totals, fall back to % estimate
      const cu = event.context_window?.current_usage;
      const preciseTokens = cu
        ? (cu.cache_read_input_tokens || 0) + (cu.cache_creation_input_tokens || 0) + (cu.input_tokens || 0)
        : 0;
      let tokenText = '';
      if (preciseTokens > 0) {
        tokenText = ` ${(preciseTokens / 1000).toFixed(1)}k`;
      } else if (windowSize) {
        tokenText = ` ${(windowSize * usedPctRaw / 100 / 1000).toFixed(1)}k`;
      }

      // Color thresholds (tokens): tuned per context window size
      const [tYellow, tOrange, tRed] = windowSize && windowSize < 500000
        ? [50000, 150000, 180000]   // 200k window
        : [100000, 200000, 400000]; // 1M window
      const tokensForColor = preciseTokens > 0 ? preciseTokens : (windowSize ? windowSize * usedPctRaw / 100 : 0);
      const is1M = windowSize && windowSize >= 500000;
      const label = is1M ? `${progressBar}${tokenText}` : `${progressBar} ${usedPct}%${tokenText}`;
      if (tokensForColor < tYellow) {
        contextBar = `\x1b[32m${label}\x1b[0m`;
      } else if (tokensForColor < tOrange) {
        contextBar = `\x1b[33m${label}\x1b[0m`;
      } else if (tokensForColor < tRed) {
        contextBar = `\x1b[38;5;208m${label}\x1b[0m`;
      } else {
        contextBar = `\x1b[5;31m💀 ${label}\x1b[0m`;
      }
    }

    // Assemble sections
    const sections = [];
    if (contextBar) sections.push(contextBar);
    sections.push(`🤖 \x1b[2m${modelName}\x1b[0m`);
    sections.push(`📁 \x1b[2m${path.basename(workDir)}\x1b[0m`);
    if (branchName) sections.push(`🌿 \x1b[32m${branchName}\x1b[0m`);

    process.stdout.write(sections.join(' │ '));
  } catch (e) {
    // Parse errors are non-fatal — statusline must never block Claude
  }
});
