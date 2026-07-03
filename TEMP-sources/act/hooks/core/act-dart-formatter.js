const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function normalizeDartPaths(pathsToNormalize, projectDirectory) {
  const result = [];
  const seen = new Set();

  for (const candidate of pathsToNormalize || []) {
    if (typeof candidate !== 'string' || candidate.trim() === '') {
      continue;
    }

    const resolved = path.isAbsolute(candidate)
      ? candidate
      : path.resolve(projectDirectory || process.cwd(), candidate);

    if (!resolved.endsWith('.dart') || resolved.endsWith('.g.dart')) {
      continue;
    }
    if (!fs.existsSync(resolved) || seen.has(resolved)) {
      continue;
    }

    seen.add(resolved);
    result.push(resolved);
  }

  return result;
}

function formatDartFiles({ candidatePaths, projectDirectory, runFormat }) {
  const dartPaths = normalizeDartPaths(candidatePaths, projectDirectory);
  if (dartPaths.length === 0) {
    return { dartPaths, error: null };
  }

  const formatRunner = typeof runFormat === 'function' ? runFormat : defaultRunFormat;

  let firstError = null;
  for (const filePath of dartPaths) {
    try {
      formatRunner(filePath);
    } catch (error) {
      if (!firstError) {
        firstError = extractProcessError(error);
      }
    }
  }

  return { dartPaths, error: firstError };
}

function extractProcessError(error) {
  if (!error) {
    return 'unknown error';
  }
  if (error.code === 'ENOENT') {
    return 'dart executable not found';
  }

  const stderr = typeof error.stderr === 'string'
    ? error.stderr
    : Buffer.isBuffer(error.stderr)
      ? error.stderr.toString('utf8')
      : '';

  if (stderr.trim()) {
    return truncate(stderr.trim(), 300);
  }
  if (error.message) {
    return truncate(String(error.message), 300);
  }

  return 'dart format failed';
}

function defaultRunFormat(filePath) {
  execFileSync('dart', ['format', filePath], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength)}...`;
}

module.exports = {
  formatDartFiles,
};
