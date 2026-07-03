import { createOpenCodeLogSessionAdapter } from "./act-opencode-log-session.js";
import settingsCore from "../core/act-settings.js";

const { loadActSettings } = settingsCore;

export const ActHooksPlugin = async ({ directory, client }) => {
  const settings = loadActSettings();
  const adapter = createOpenCodeLogSessionAdapter({
    defaultDirectory: directory,
    settings,
    logWarn: async (message, extra = {}) => {
      await logPlugin(client, "warn", message, extra);
    },
  });

  if (settings.errorCode) {
    await adapter.emitSettingsWarning();
  }

  await logPlugin(client, "info", "Initialized ACT OpenCode hooks", {
    limitations: [
      "Statusline parity is intentionally out of scope.",
      "Skill-name log parity for direct OpenCode skill execution remains a separate follow-up.",
    ],
  });

  return {
    event: async ({ event }) => {
      await safelyHandle(client, "event", async () => {
        await adapter.handleEvent(event);
      });
    },

    "tool.execute.before": async (input, output) => {
      await safelyHandle(client, "tool.execute.before", async () => {
        adapter.handleToolBefore(input, output);
      });
    },

    "tool.execute.after": async (input, output) => {
      await safelyHandle(client, "tool.execute.after", async () => {
        await adapter.handleToolAfter(input, output);
      });
    },

    "command.execute.before": async (input) => {
      await safelyHandle(client, "command.execute.before", async () => {
        adapter.handleCommandBefore(input);
      });
    },
  };
};

export default ActHooksPlugin;

async function safelyHandle(client, hookName, callback) {
  try {
    await callback();
  } catch (error) {
    await logPlugin(client, "error", `ACT hooks runtime error (${hookName})`, {
      details: extractErrorMessage(error),
    });
  }
}

function extractErrorMessage(error) {
  if (!error) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error.message) {
    return String(error.message);
  }
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

async function logPlugin(client, level, message, extra = {}) {
  if (client?.app?.log) {
    try {
      await client.app.log({
        body: {
          service: "act-hooks-plugin",
          level,
          message,
          extra,
        },
      });
      return;
    } catch {
      // Fall back to stderr.
    }
  }

  const suffix = Object.keys(extra).length > 0 ? ` ${JSON.stringify(extra)}` : "";
  console.error(`[act-hooks-plugin][${level}] ${message}${suffix}`);
}
