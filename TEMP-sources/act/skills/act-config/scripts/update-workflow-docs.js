#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { getFlag, hasFlag, usage } = require('./script-args');

const currentWorkingDirectory = process.cwd();
const actDir = path.join(currentWorkingDirectory, '.act');
const workflowPath = path.join(actDir, 'workflow.md');
const workflowTemplatePath = path.join(__dirname, '..', 'references', 'workflow-template.md');
const usageLines = [
  'Usage:',
  '  update-workflow-docs.js [--agent-file AGENTS.md|CLAUDE.md]',
];

const agentBlock = `## ACT Workflow

ACT workflow storage for new Specs is configured in \`.act/config.yaml\`.

ACT workflow semantics, Workflow Storage selection, artifact vocabulary, and domain-doc guidance are defined in \`.act/workflow.md\`.`;

function ensureWorkflowDoc() {
  fs.mkdirSync(actDir, { recursive: true });
  const workflowContent = fs.readFileSync(workflowTemplatePath, 'utf8');
  fs.writeFileSync(workflowPath, workflowContent, 'utf8');
  return 'Wrote .act/workflow.md';
}

function selectAgentFile() {
  const requested = getFlag('--agent-file');
  if (requested) {
    if (requested !== 'AGENTS.md' && requested !== 'CLAUDE.md') {
      process.stderr.write('--agent-file must be AGENTS.md or CLAUDE.md\n');
      process.exit(1);
    }
    return requested;
  }

  if (fs.existsSync(path.join(currentWorkingDirectory, 'AGENTS.md'))) return 'AGENTS.md';
  if (fs.existsSync(path.join(currentWorkingDirectory, 'CLAUDE.md'))) return 'CLAUDE.md';

  process.stdout.write('NO_AGENT_FILE No AGENTS.md or CLAUDE.md exists\n');
  process.exit(2);
}

function replaceOrAppendActWorkflow(content) {
  const headingMatch = content.match(/^## ACT Workflow\s*$/m);
  if (!headingMatch) {
    if (content.trim() === '') return `${agentBlock}\n`;
    return `${content.replace(/\s*$/, '')}\n\n${agentBlock}\n`;
  }

  const start = headingMatch.index;
  const heading = headingMatch[0];
  const afterStart = start + heading.length;
  const nextHeadingMatch = content.slice(afterStart).match(/\n## (?!#)/);
  const end = nextHeadingMatch ? afterStart + nextHeadingMatch.index : content.length;
  const prefix = content.slice(0, start).replace(/\s*$/, '');
  const suffix = content.slice(end).replace(/^\s*/, '');

  if (!prefix && !suffix) return `${agentBlock}\n`;
  if (!prefix) return `${agentBlock}\n\n${suffix}`;
  if (!suffix) return `${prefix}\n\n${agentBlock}\n`;
  return `${prefix}\n\n${agentBlock}\n\n${suffix}`;
}

function ensureAgentBlock() {
  const agentFile = selectAgentFile();
  const agentPath = path.join(currentWorkingDirectory, agentFile);
  const createdAgentFile = !pathExists(agentPath);
  const current = createdAgentFile ? '' : fs.readFileSync(agentPath, 'utf8');
  const updated = replaceOrAppendActWorkflow(current);
  fs.writeFileSync(agentPath, updated, 'utf8');
  if (createdAgentFile) ensureCompanionSymlink(agentFile);
  return `Updated ${agentFile}`;
}

function ensureCompanionSymlink(agentFile) {
  const companionFile = agentFile === 'AGENTS.md' ? 'CLAUDE.md' : 'AGENTS.md';
  const companionPath = path.join(currentWorkingDirectory, companionFile);
  if (pathExists(companionPath)) return;
  fs.symlinkSync(agentFile, companionPath);
}

function pathExists(filePath) {
  try {
    fs.statSync(filePath);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

if (hasFlag('--help')) usage(usageLines, 0);

const workflowResult = ensureWorkflowDoc();
const agentResult = ensureAgentBlock();
process.stdout.write(`${workflowResult}\n${agentResult}\n`);
