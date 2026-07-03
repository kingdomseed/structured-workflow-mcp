const fs = require('fs');
const os = require('os');
const path = require('path');

const SETTINGS_ERROR_CODES = {
  INVALID_JSON: 'ACT_SETTINGS_INVALID_JSON',
  UNREADABLE: 'ACT_SETTINGS_UNREADABLE',
  INVALID_SHAPE: 'ACT_SETTINGS_INVALID_SHAPE',
  INVALID_TYPE: 'ACT_SETTINGS_INVALID_TYPE',
};

function getActSettingsPath({ homedir, pathModule = path, osModule = os } = {}) {
  const resolvedHome = typeof homedir === 'string' ? homedir : osModule.homedir();
  return pathModule.join(resolvedHome, '.config', 'agentic-coding-toolkit', 'act-settings.json');
}

function loadActSettings(options = {}) {
  const fsModule = options.fsModule || fs;
  const settingsPath = getActSettingsPath(options);

  let linkStats;
  try {
    linkStats = fsModule.lstatSync(settingsPath);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return createResult({ settingsPath });
    }
    return createResult({
      settingsPath,
      errorCode: SETTINGS_ERROR_CODES.UNREADABLE,
      errorMessage: extractFileError(error),
    });
  }

  let stats;
  try {
    stats = fsModule.statSync(settingsPath);
  } catch (error) {
    return createResult({
      settingsPath,
      errorCode: SETTINGS_ERROR_CODES.UNREADABLE,
      errorMessage: extractFileError(error),
    });
  }

  if (!stats.isFile() || linkStats.isDirectory()) {
    return createResult({
      settingsPath,
      errorCode: SETTINGS_ERROR_CODES.UNREADABLE,
      errorMessage: 'settings path is not a regular file',
    });
  }

  let parsed;
  try {
    const raw = fsModule.readFileSync(settingsPath, 'utf8');
    parsed = JSON.parse(raw);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return createResult({
        settingsPath,
        errorCode: SETTINGS_ERROR_CODES.INVALID_JSON,
        errorMessage: 'invalid JSON',
      });
    }
    return createResult({
      settingsPath,
      errorCode: SETTINGS_ERROR_CODES.UNREADABLE,
      errorMessage: extractFileError(error),
    });
  }

  if (!isObjectRecord(parsed)) {
    return createResult({
      settingsPath,
      errorCode: SETTINGS_ERROR_CODES.INVALID_SHAPE,
      errorMessage: 'settings JSON must be an object',
    });
  }

  if (
    Object.prototype.hasOwnProperty.call(parsed, 'enableLogging')
    && typeof parsed.enableLogging !== 'boolean'
  ) {
    return createResult({
      settingsPath,
      errorCode: SETTINGS_ERROR_CODES.INVALID_TYPE,
      errorMessage: 'enableLogging must be a boolean',
    });
  }

  if (
    Object.prototype.hasOwnProperty.call(parsed, 'toolkitPath')
    && typeof parsed.toolkitPath !== 'string'
  ) {
    return createResult({
      settingsPath,
      errorCode: SETTINGS_ERROR_CODES.INVALID_TYPE,
      errorMessage: 'toolkitPath must be a string',
    });
  }

  return createResult({
    settingsPath,
    enableLogging: parsed.enableLogging === true,
    toolkitPath: typeof parsed.toolkitPath === 'string' ? parsed.toolkitPath : null,
  });
}

function isLoggingEnabled(settings) {
  return settings?.enableLogging === true;
}

function resolveToolkitPath(settings) {
  return typeof settings?.toolkitPath === 'string' ? settings.toolkitPath : null;
}

function createResult({ settingsPath, enableLogging = false, toolkitPath = null, errorCode = null, errorMessage = null }) {
  return {
    enableLogging,
    toolkitPath,
    settingsPath,
    errorCode,
    errorMessage,
  };
}

function isObjectRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function extractFileError(error) {
  if (!error) {
    return 'unable to read settings file';
  }
  if (error.code === 'EACCES' || error.code === 'EPERM') {
    return 'permission denied';
  }
  if (error.message) {
    return String(error.message);
  }
  return 'unable to read settings file';
}

module.exports = {
  SETTINGS_ERROR_CODES,
  getActSettingsPath,
  loadActSettings,
  isLoggingEnabled,
  resolveToolkitPath,
};
