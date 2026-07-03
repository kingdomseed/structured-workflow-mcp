import logger from "../core/act-logger.js";
import dartFormatter from "../core/act-dart-formatter.js";

const {
  ensureLogDir,
  createLogFile,
  findLogFile,
  writeLogLine,
  writeFirstLogLine,
  formatLine,
  extractFieldsFromCanonical,
} = logger;

const { formatDartFiles } = dartFormatter;

const MUTATING_TOOLS = new Set(["edit", "write", "multiedit", "multi_edit"]);

export function createOpenCodeLogSessionAdapter({ defaultDirectory, logWarn, settings }) {
  const sessionDirectoryById = new Map();
  const logFileBySessionId = new Map();
  const loggedUserMessageIds = new Set();
  const loggedCommandMessageIds = new Set();
  const activeCommandSessions = new Set();
  const pendingUserPromptByMessageId = new Map();
  const emittedWarnings = new Set();

  return {
    async emitSettingsWarning() {
      await emitSettingsWarningOnce();
    },

    async handleEvent(event) {
      if (!event || typeof event !== "object") {
        return;
      }

      switch (event.type) {
        case "session.created": {
          const info = event.properties?.info;
          const sessionId = info?.id;
          rememberSessionDirectory(sessionId, info?.directory || defaultDirectory);
          writeSessionStart(sessionId, {
            source: "opencode",
          });
          return;
        }

        case "session.updated": {
          const info = event.properties?.info;
          rememberSessionDirectory(info?.id, info?.directory || defaultDirectory);
          return;
        }

        case "message.updated": {
          const info = event.properties?.info;
          if (!info || !info.id) {
            return;
          }

          if (info.role === "assistant") {
            const parentMessageId = info.parentID;
            if (!parentMessageId || loggedUserMessageIds.has(parentMessageId)) {
              return;
            }

            const pendingPrompt = pendingUserPromptByMessageId.get(parentMessageId);
            if (!pendingPrompt) {
              return;
            }

            rememberPendingUserPrompt(parentMessageId, {
              sessionId: info.sessionID,
            });

            if (activeCommandSessions.has(info.sessionID)) {
              return;
            }

            if (typeof pendingPrompt.prompt !== "string") {
              return;
            }

            writeEvent(pendingPrompt.sessionId || info.sessionID, "UserPromptSubmit", {
              prompt: pendingPrompt.prompt,
            });
            clearPendingUserPrompt(parentMessageId);
            loggedUserMessageIds.add(parentMessageId);
            return;
          }

          if (info.role !== "user" || loggedUserMessageIds.has(info.id)) {
            return;
          }

          rememberPendingUserPrompt(info.id, {
            sessionId: info.sessionID,
            prompt: extractPromptFromUserMessage(info),
          });
          return;
        }

        case "command.executed": {
          const info = event.properties;
          if (!info?.sessionID || !info?.messageID || loggedCommandMessageIds.has(info.messageID)) {
            return;
          }

          const commandWasActive = activeCommandSessions.delete(info.sessionID);

          if (!commandWasActive) {
            const prompt = toRawCommandPrompt(info.name, info.arguments);
            if (prompt != null) {
              writeEvent(info.sessionID, "UserPromptSubmit", {
                prompt,
              });
            }
          }

          loggedCommandMessageIds.add(info.messageID);
          clearPendingUserPromptsForSession(info.sessionID);
          return;
        }

        case "message.part.updated": {
          const part = event.properties?.part;
          if (!part || part.type !== "text" || !part.messageID) {
            return;
          }

          if (loggedUserMessageIds.has(part.messageID)) {
            return;
          }

          if (typeof part.text !== "string") {
            return;
          }

          if (!pendingUserPromptByMessageId.has(part.messageID)) {
            return;
          }

          rememberPendingUserPrompt(part.messageID, {
            sessionId: part.sessionID,
            prompt: part.text,
          });
          return;
        }

        case "message.removed": {
          const messageId = event.properties?.messageID;
          if (messageId) {
            clearPendingUserPrompt(messageId);
            loggedCommandMessageIds.delete(messageId);
          }
          return;
        }

        case "session.deleted": {
          const sessionId = event.properties?.info?.id;
          if (!sessionId) {
            return;
          }

          activeCommandSessions.delete(sessionId);
          clearPendingUserPromptsForSession(sessionId);
          return;
        }

        default:
          return;
      }
    },

    handleToolBefore(input, output) {
      const sessionId = input?.sessionID;
      rememberSessionDirectory(sessionId, defaultDirectory);

      writeEvent(sessionId, "PreToolUse", {
        toolName: input?.tool,
        toolInput: toCanonicalToolInput(input?.tool, output?.args || input?.args),
      });
    },

    async handleToolAfter(input, output) {
      const sessionId = input?.sessionID;
      rememberSessionDirectory(sessionId, defaultDirectory);

      writeEvent(sessionId, "PostToolUse", {
        toolName: input?.tool,
        toolInput: toCanonicalToolInput(input?.tool, input?.args || output?.args),
        toolResponse: output,
      });

      const toolName = String(input?.tool || "").toLowerCase();
      if (!MUTATING_TOOLS.has(toolName)) {
        return;
      }

      const candidatePaths = [
        ...extractFileCandidates(input?.args),
        ...extractFileCandidates(output?.metadata),
      ];
      const projectDir = resolveProjectDirectory(sessionId);
      const { error } = formatDartFiles({
        candidatePaths,
        projectDirectory: projectDir,
      });
      if (error && typeof logWarn === "function") {
        await logWarn("dart format skipped", {
          sessionId,
          error,
        });
      }
    },

    handleCommandBefore(input) {
      const sessionId = input?.sessionID;
      rememberSessionDirectory(sessionId, defaultDirectory);

      const prompt = toRawCommandPrompt(input?.command, input?.arguments);
      if (prompt != null) {
        writeEvent(sessionId, "UserPromptSubmit", {
          prompt,
        });
      }

      if (sessionId) {
        activeCommandSessions.add(sessionId);
      }
    },
  };

  function writeSessionStart(sessionId, payload) {
    if (!sessionId) {
      return;
    }

    if (!isSessionLoggingEnabled()) {
      return;
    }

    const projectDir = resolveProjectDirectory(sessionId);
    const logDir = ensureLogDir(projectDir);
    const logFile = createLogFile(logDir, sessionId);
    const fields = extractFieldsFromCanonical("SessionStart", payload || {});
    const line = formatLine("SessionStart", fields);
    writeFirstLogLine(logFile, line);
    logFileBySessionId.set(sessionId, logFile);
  }

  function writeEvent(sessionId, eventName, payload) {
    if (!sessionId) {
      return;
    }

    if (!isSessionLoggingEnabled()) {
      return;
    }

    const logFile = ensureSessionLogFile(sessionId);
    if (!logFile) {
      return;
    }

    const fields = extractFieldsFromCanonical(eventName, payload || {});
    const line = formatLine(eventName, fields);
    writeLogLine(logFile, line);
  }

  function ensureSessionLogFile(sessionId) {
    if (!isSessionLoggingEnabled()) {
      return null;
    }

    const cached = logFileBySessionId.get(sessionId);
    if (cached) {
      return cached;
    }

    const projectDir = resolveProjectDirectory(sessionId);
    const logDir = ensureLogDir(projectDir);
    const existingFile = findLogFile(logDir, sessionId);
    if (!existingFile) {
      return null;
    }

    logFileBySessionId.set(sessionId, existingFile);
    return existingFile;
  }

  function resolveProjectDirectory(sessionId) {
    return sessionDirectoryById.get(sessionId) || defaultDirectory || process.cwd();
  }

  function rememberSessionDirectory(sessionId, directory) {
    if (!sessionId || !directory) {
      return;
    }
    sessionDirectoryById.set(sessionId, directory);
  }

  function extractFileCandidates(payload) {
    if (!payload || typeof payload !== "object") {
      return [];
    }

    const candidates = [];
    const singlePath = payload.file_path || payload.filePath || payload.path || payload.file;
    if (typeof singlePath === "string") {
      candidates.push(singlePath);
    }

    const listPath = payload.files || payload.paths;
    if (Array.isArray(listPath)) {
      for (const item of listPath) {
        if (typeof item === "string") {
          candidates.push(item);
        }
      }
    }

    return candidates;
  }

  function toCanonicalToolInput(toolName, payload) {
    if (!payload || typeof payload !== "object") {
      return undefined;
    }

    const normalizedToolName = String(toolName || "").toLowerCase();

    return {
      file_path: payload.file_path || payload.filePath || payload.path || payload.file,
      old_string: payload.old_string || payload.oldString,
      new_string: payload.new_string || payload.newString,
      content: payload.content || payload.text,
      command: payload.command,
      pattern: payload.pattern,
      subagent_type: payload.subagent_type || payload.subagentType,
      description: payload.description,
      skill:
        payload.skill ||
        (normalizedToolName === "skill" && typeof payload.name === "string"
          ? payload.name
          : undefined),
      query: payload.query,
      url: payload.url,
      questions: payload.questions,
    };
  }

  function extractPromptFromUserMessage(info) {
    if (!info || typeof info !== "object") {
      return undefined;
    }

    if (typeof info.text === "string") {
      return info.text;
    }

    if (typeof info.prompt === "string") {
      return info.prompt;
    }

    return undefined;
  }

  function toRawCommandPrompt(name, args) {
    if (typeof name !== "string" || name.length === 0) {
      return undefined;
    }

    const commandName = name.startsWith("/") ? name : `/${name}`;
    const commandArgs = typeof args === "string" ? args.trim() : "";
    if (commandArgs.length === 0) {
      return commandName;
    }

    return `${commandName} ${commandArgs}`;
  }

  function clearPendingUserPrompt(messageId) {
    pendingUserPromptByMessageId.delete(messageId);
  }

  function clearPendingUserPromptsForSession(sessionId) {
    for (const [messageId, pending] of pendingUserPromptByMessageId) {
      if (pending.sessionId !== sessionId) {
        continue;
      }
      clearPendingUserPrompt(messageId);
    }
  }

  function rememberPendingUserPrompt(messageId, update) {
    const previous = pendingUserPromptByMessageId.get(messageId);
    if (!previous && !update.sessionId && update.prompt == null) {
      return;
    }

    pendingUserPromptByMessageId.set(messageId, {
      sessionId: update.sessionId || previous?.sessionId,
      prompt: update.prompt != null ? update.prompt : previous?.prompt,
    });
  }

  function isSessionLoggingEnabled() {
    return settings?.enableLogging === true;
  }

  async function emitSettingsWarningOnce() {
    if (!settings?.errorCode || !settings?.settingsPath) {
      return;
    }

    const dedupeKey = `${settings.errorCode}:${settings.settingsPath}`;
    if (emittedWarnings.has(dedupeKey)) {
      return;
    }
    emittedWarnings.add(dedupeKey);

    const payload = {
      code: settings.errorCode,
      settingsPath: settings.settingsPath,
      message: settings.errorMessage || 'settings load failed',
    };

    if (typeof logWarn === 'function') {
      await logWarn('ACT settings invalid', payload);
      return;
    }

    console.error(
      `[act-opencode-log-session][warn] ACT settings invalid ${JSON.stringify(payload)}`,
    );
  }
}
