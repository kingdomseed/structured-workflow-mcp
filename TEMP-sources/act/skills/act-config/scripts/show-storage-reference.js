#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { getFlag, hasFlag, usage } = require('./script-args');

const usageLines = [
  'Usage:',
  '  show-storage-reference.js --storage local',
  '  show-storage-reference.js --storage github',
];

if (hasFlag('--help')) usage(usageLines, 0);

const storage = getFlag('--storage');
if (storage !== 'local' && storage !== 'github') usage(usageLines, 1);

const referencePath = path.join(__dirname, '..', 'references', `storage-${storage}.md`);

try {
  process.stdout.write(fs.readFileSync(referencePath, 'utf8'));
} catch (error) {
  process.stderr.write(`Could not read storage reference: ${error.message}\n`);
  process.exit(1);
}
