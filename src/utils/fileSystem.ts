import * as fs from 'fs';
import * as path from 'path';

/**
 * Minimal filesystem utilities.
 * NOTE: No helper here writes to disk. The MCP server now only SUGGESTS
 * file paths - the AI agent (Cascade, etc) performs actual writes via tools.
 *
 * @version 0.2.7
 */

export interface NumberedFileConfig {
  phase: string;
  outputDirectory: string;
  extension?: string;
  includeDate?: boolean;
}

/**
 * Sanitizes a task name for safe directory usage.
 * Replaces spaces with hyphens and removes special characters except dash and underscore
 */
export function sanitizeTaskName(taskName: string): string {
  return taskName
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^a-z0-9\-_]/g, '')   // Remove special characters except dash and underscore
    .replace(/-+/g, '-')            // Replace multiple consecutive hyphens with single hyphen
    .replace(/^-|-$/g, '');         // Remove leading/trailing hyphens
}

/**
 * Converts a workflow phase to its numeric prefix (01-, 02-, etc.).
 */
function getPhaseNumber(phase: string): number {
  const phaseMap: Record<string, number> = {
    'SETUP': 0,
    'PLANNING': 0,  // Keep planning as 0 for backward compatibility
    'AUDIT_INVENTORY': 1,
    'COMPARE_ANALYZE': 2,
    'QUESTION_DETERMINE': 3,
    'WRITE_OR_REFACTOR': 4,
    'TEST': 5,
    'LINT': 6,
    'ITERATE': 7,
    'PRESENT': 8
  };
  
  return phaseMap[phase] ?? 99; // Default to 99 for unknown phases
}

/**
 * Generates a numbered filename without touching the filesystem.
 * Creates the pattern: 01-phase-name-YYYY-MM-DD.ext
 */
export function generateNumberedFileName(config: NumberedFileConfig): string {
  const number = getPhaseNumber(config.phase).toString().padStart(2, '0');
  const slug = config.phase.toLowerCase().replace(/_/g, '-');
  const ext = config.extension ?? 'md';
  const date = config.includeDate === false ? '' : `-${new Date().toISOString().split('T')[0]}`;
  return `${number}-${slug}${date}.${ext}`;
}

/**
 * Lightweight check: is a directory currently writable by the process?
 * Does NOT attempt to create directories or files.
 */
export function validateDirectoryAccess(directoryPath: string): { isValid: boolean; error?: string } {
  try {
    fs.accessSync(directoryPath, fs.constants.W_OK);
    return { isValid: true };
  } catch (err) {
    return {
      isValid: false,
      error: (err instanceof Error ? err.message : 'Unknown error')
    };
  }
}

/**
 * Resolves a raw directory path relative to a base (defaults to CWD).
 * If the provided path is absolute, returns it as-is.
 * Otherwise, treats it as relative to the provided base directory.
 */
export function resolveOutputDirectory(rawDir: string, baseDir: string = process.cwd()): string {
  return path.isAbsolute(rawDir) ? rawDir : path.resolve(baseDir, rawDir);
}
