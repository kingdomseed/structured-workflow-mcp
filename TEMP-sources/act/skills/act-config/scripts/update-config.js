#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { getFlag, hasFlag, usage } = require('./script-args');

const currentWorkingDirectory = process.cwd();
const configDir = path.join(currentWorkingDirectory, '.act');
const configPath = path.join(configDir, 'config.yaml');
const usageLines = [
  'Usage:',
  '  update-config.js --check',
  '  update-config.js --backend github',
  '  update-config.js --backend local --local-path <path>',
];

function normalizeLocalPath(input) {
  let value = input;
  while (value.startsWith('./')) value = value.slice(2);
  while (value.length > 1 && value.endsWith('/')) value = value.slice(0, -1);
  return value;
}

function validateLocalPath(input) {
  if (typeof input !== 'string') return { ok: false, reason: 'local.path is required' };

  const normalized = normalizeLocalPath(input.trim()).replace(/\\/g, '/');
  if (!normalized) return { ok: false, reason: 'local.path must not be empty' };
  if (path.isAbsolute(normalized)) return { ok: false, reason: 'local.path must be current-working-directory-relative' };

  const parts = normalized.split('/');
  if (parts.some((part) => part === '')) return { ok: false, reason: 'local.path must not contain empty path segments' };
  if (parts.some((part) => part === '.' || part === '..')) return { ok: false, reason: 'local.path must not contain . or .. path segments' };
  if (parts.some((part) => !/^[A-Za-z0-9._-]+$/.test(part))) {
    return { ok: false, reason: 'local.path segments may only contain letters, numbers, dots, underscores, and hyphens' };
  }

  if (parts[0] === '.act') return { ok: false, reason: 'local.path must not be .act or under .act' };
  if (parts[0] === '.git') return { ok: false, reason: 'local.path must not be .git or under .git' };

  const target = path.join(currentWorkingDirectory, normalized);
  if (fs.existsSync(target) && !fs.statSync(target).isDirectory()) {
    return { ok: false, reason: 'local.path points to an existing non-directory file' };
  }

  return { ok: true, value: normalized };
}

function parseConfig(content) {
  const result = {};
  let section = null;

  for (const rawLine of content.split(/\r?\n/)) {
    const withoutComment = rawLine.replace(/\s+#.*$/, '');
    if (!withoutComment.trim()) continue;

    const sectionMatch = withoutComment.match(/^([A-Za-z0-9_-]+):\s*$/);
    if (sectionMatch) {
      section = sectionMatch[1];
      result[section] = result[section] || {};
      continue;
    }

    const valueMatch = withoutComment.match(/^ +([A-Za-z0-9_-]+):\s*(.*?)\s*$/);
    if (valueMatch && section) {
      result[section][valueMatch[1]] = valueMatch[2].replace(/^['"]|['"]$/g, '');
    }
  }

  return result;
}

function readAndValidateConfig() {
  if (!fs.existsSync(configPath)) {
    return { ok: false, status: 'missing', reason: '.act/config.yaml does not exist' };
  }

  let parsed;
  try {
    parsed = parseConfig(fs.readFileSync(configPath, 'utf8'));
  } catch (error) {
    return { ok: false, status: 'invalid', reason: `Could not read .act/config.yaml: ${error.message}` };
  }

  const backend = parsed.workflow && parsed.workflow.backend;
  if (!backend) return { ok: false, status: 'invalid', reason: 'workflow.backend is required' };
  if (backend !== 'local' && backend !== 'github') {
    return { ok: false, status: 'invalid', reason: 'workflow.backend must be local or github' };
  }

  if (backend === 'github') return { ok: true, backend };

  const localPath = parsed.local && parsed.local.path;
  const validation = validateLocalPath(localPath);
  if (!validation.ok) return { ok: false, status: 'invalid', reason: validation.reason };

  return { ok: true, backend, localPath: validation.value };
}

function writeConfig(backend, localPath) {
  let content;
  if (backend === 'github') {
    content = 'workflow:\n  backend: github\n';
  } else if (backend === 'local') {
    const validation = validateLocalPath(localPath);
    if (!validation.ok) {
      process.stderr.write(`${validation.reason}\n`);
      process.exit(1);
    }
    content = `workflow:\n  backend: local\n\nlocal:\n  path: ${validation.value}\n`;
  } else {
    process.stderr.write('workflow.backend must be local or github\n');
    process.exit(1);
  }

  fs.mkdirSync(configDir, { recursive: true });
  fs.writeFileSync(configPath, content, 'utf8');
  process.stdout.write('Wrote .act/config.yaml\n');
}

if (hasFlag('--help')) usage(usageLines, 0);

if (hasFlag('--check')) {
  const result = readAndValidateConfig();
  if (result.ok) {
    const local = result.localPath ? ` local.path=${result.localPath}` : '';
    process.stdout.write(`VALID workflow.backend=${result.backend}${local}\n`);
    process.exit(0);
  }
  process.stdout.write(`${result.status.toUpperCase()} ${result.reason}\n`);
  process.exit(1);
}

const backend = getFlag('--backend');
if (!backend) usage(usageLines, 1);

writeConfig(backend, getFlag('--local-path'));
