const args = process.argv.slice(2);

function getFlag(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) return null;
  return value;
}

function hasFlag(name) {
  return args.includes(name);
}

function usage(lines, exitCode = 1) {
  const stream = exitCode === 0 ? process.stdout : process.stderr;
  stream.write([...lines, ''].join('\n'));
  process.exit(exitCode);
}

module.exports = { getFlag, hasFlag, usage };
