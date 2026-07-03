const fs = require('fs');
const path = require('path');

function ensureLogDir(projectDir) {
  const logDir = path.join(projectDir, 'ai_logs');
  fs.mkdirSync(logDir, { recursive: true });
  const gitignorePath = path.join(logDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, '*\n');
  }
  return logDir;
}

function createLogFile(logDir, sessionId, now = new Date()) {
  const timestamp = formatTimestampForFilename(now);
  return path.join(logDir, `${timestamp}_${sessionId}.log`);
}

function findLogFile(logDir, sessionId) {
  try {
    const files = fs.readdirSync(logDir);
    const match = files.find((f) => f.endsWith(`_${sessionId}.log`));
    return match ? path.join(logDir, match) : null;
  } catch {
    return null;
  }
}

function writeLogLine(logFile, line) {
  fs.appendFileSync(logFile, `${line}\n`);
}

function writeFirstLogLine(logFile, line) {
  fs.writeFileSync(logFile, `${line}\n`);
}

function formatTimestampForFilename(date) {
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${y}${mo}${d}-${h}${mi}${s}`;
}

function formatLine(eventName, fields, now = new Date()) {
  const ts = now.toISOString();
  const fieldStr = fields.map(([k, v]) => `${k}=${v}`).join(' ');
  return `${ts} [${eventName}]${fieldStr ? ` ${fieldStr}` : ''}`;
}

function extractFieldsFromCanonical(eventName, payload) {
  const fields = [];

  switch (eventName) {
    // Supported by: claude,opencode
    case 'SessionStart':
      if (payload.source) fields.push(['source', payload.source]);
      if (payload.model) fields.push(['model', payload.model]);
      if (payload.agentType) fields.push(['agent_type', payload.agentType]);
      break;

    // Supported by: claude,opencode
    case 'UserPromptSubmit':
      if (payload.prompt != null) {
        const prompt = String(payload.prompt);
        if (prompt.includes('\n')) {
          fields.push(['prompt', `\n${prompt}`]);
        } else {
          fields.push(['prompt', quote(prompt)]);
        }
      }
      break;

    // Supported by: claude,opencode
    case 'PreToolUse':
    // Supported by: claude,opencode
    case 'PostToolUse':
    // Supported by: claude
    case 'PermissionRequest': {
      if (payload.toolName) fields.push(['tool', payload.toolName]);
      const skipInput = payload.toolName === 'AskUserQuestion' && eventName !== 'PreToolUse';
      if (!skipInput) {
        fields.push(...summarizeToolInput(payload.toolName, payload.toolInput));
      }
      if (eventName === 'PostToolUse' && payload.toolResponse) {
        fields.push(...summarizeToolResponse(payload.toolName, payload.toolResponse));
      }
      break;
    }

    // Supported by: claude
    case 'PostToolUseFailure':
      if (payload.toolName) fields.push(['tool', payload.toolName]);
      if (payload.error) fields.push(['error', quote(truncate(String(payload.error), 200))]);
      break;

    // Supported by: claude
    case 'SubagentStart':
    // Supported by: claude
    case 'SubagentStop':
      if (payload.agentId) fields.push(['agent_id', payload.agentId]);
      if (payload.agentType) fields.push(['agent_type', payload.agentType]);
      break;

    // Supported by: claude
    case 'PreCompact':
      if (payload.trigger) fields.push(['trigger', payload.trigger]);
      break;

    // Supported by: claude
    case 'SessionEnd':
      if (payload.reason) fields.push(['reason', payload.reason]);
      break;
  }

  return fields;
}

function summarizeToolInput(toolName, toolInput) {
  if (!toolInput || typeof toolInput !== 'object') return [];

  const fields = [];

  if (toolInput.file_path != null) {
    fields.push(['file_path', toolInput.file_path]);
  }

  if (toolInput.old_string != null) {
    fields.push(['edit_length', String(toolInput.old_string).length]);
  }

  if (toolInput.new_string != null) {
    fields.push(['content_length', String(toolInput.new_string).length]);
  }

  if (toolInput.content != null && toolInput.new_string == null) {
    fields.push(['content_length', String(toolInput.content).length]);
  }

  if (toolInput.command != null) {
    fields.push(['command', quote(truncate(String(toolInput.command), 200))]);
  }
  if (toolInput.pattern) {
    fields.push(['pattern', quote(truncate(String(toolInput.pattern), 200))]);
  }
  if (toolInput.subagent_type) {
    fields.push(['subagent_type', toolInput.subagent_type]);
  }
  if (toolInput.description && ['task', 'bash'].includes(String(toolName || '').toLowerCase())) {
    fields.push(['description', quote(truncate(String(toolInput.description), 100))]);
  }
  if (toolInput.skill) {
    fields.push(['skill', toolInput.skill]);
  }
  if (toolInput.query) {
    fields.push(['query', quote(truncate(String(toolInput.query), 200))]);
  }
  if (toolInput.url) {
    fields.push(['url', toolInput.url]);
  }
  if (toolInput.questions && Array.isArray(toolInput.questions)) {
    fields.push(['questions', `\n${formatQuestions(toolInput.questions)}`]);
  }

  return fields;
}

function summarizeToolResponse(toolName, toolResponse) {
  if (!toolResponse || typeof toolResponse !== 'object') return [];

  const fields = [];
  if (toolName === 'AskUserQuestion') {
    const answers = toolResponse.answers;
    if (answers && typeof answers === 'object') {
      fields.push(['answers', `\n${formatAnswers(answers)}`]);
    } else {
      fields.push(['response', quote(truncate(JSON.stringify(toolResponse), 500))]);
    }
  }

  return fields;
}

function formatAnswers(answers) {
  return Object.entries(answers)
    .map(([, answer], i) => `  [${i + 1}] ${answer}`)
    .join('\n');
}

function formatQuestions(questions) {
  return questions
    .map((q, i) => {
      const lines = [`[${i + 1}] ${q.question}`];
      if (q.options && Array.isArray(q.options)) {
        for (const opt of q.options) {
          const desc = opt.description ? `: ${opt.description}` : '';
          lines.push(`    - ${opt.label}${desc}`);
        }
      }
      return lines.join('\n');
    })
    .join('\n');
}

function truncate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return `${str.slice(0, maxLen)}...`;
}

function quote(str) {
  return `"${str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')}"`;
}

module.exports = {
  ensureLogDir,
  createLogFile,
  findLogFile,
  writeLogLine,
  writeFirstLogLine,
  formatLine,
  extractFieldsFromCanonical,
  truncate,
  quote,
  summarizeToolInput,
  summarizeToolResponse,
};
