import * as fs from 'fs';
import * as path from 'path';

export interface DirectoryConfig {
  baseDirectory?: string;
  taskName?: string;
  createTaskSubdirectory?: boolean;
}

export interface NumberedFileConfig {
  phase: string;
  outputDirectory: string;
  extension?: string;
  includeDate?: boolean;
}

/**
 * Sanitizes a task name for use as a directory name
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
 * Creates a directory structure for workflow outputs
 */
export function createWorkflowDirectory(config: DirectoryConfig): string {
  const baseDir = config.baseDirectory || 'structured-workflow';
  
  let targetDirectory = baseDir;
  
  if (config.createTaskSubdirectory && config.taskName) {
    const sanitizedTaskName = sanitizeTaskName(config.taskName);
    targetDirectory = path.join(baseDir, sanitizedTaskName);
  }
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
  }
  
  return targetDirectory;
}

/**
 * Generates a numbered filename following the pattern: 01-phase-name-YYYY-MM-DD.ext
 */
export function generateNumberedFileName(config: NumberedFileConfig): string {
  const phaseNumber = getPhaseNumber(config.phase);
  const phaseName = config.phase.toLowerCase().replace(/_/g, '-');
  const extension = config.extension || 'md';
  
  let fileName = `${phaseNumber.toString().padStart(2, '0')}-${phaseName}`;
  
  if (config.includeDate !== false) {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    fileName += `-${date}`;
  }
  
  return `${fileName}.${extension}`;
}

/**
 * Creates a complete file path with directory creation
 */
export function createWorkflowFilePath(
  directoryConfig: DirectoryConfig,
  fileConfig: NumberedFileConfig
): string {
  const directory = createWorkflowDirectory(directoryConfig);
  const fileName = generateNumberedFileName(fileConfig);
  return path.join(directory, fileName);
}

/**
 * Saves content to a workflow file, creating directories as needed
 */
export function saveWorkflowFile(
  directoryConfig: DirectoryConfig,
  fileConfig: NumberedFileConfig,
  content: string
): string {
  const filePath = createWorkflowFilePath(directoryConfig, fileConfig);
  
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return filePath;
  } catch (error) {
    throw new Error(`Failed to save workflow file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Maps workflow phases to numbers for consistent ordering
 */
function getPhaseNumber(phase: string): number {
  const phaseMap: Record<string, number> = {
    'PLANNING': 0,
    'AUDIT_INVENTORY': 1,
    'COMPARE_ANALYZE': 2,
    'QUESTION_DETERMINE': 3,
    'WRITE_OR_REFACTOR': 4,
    'TEST': 5,
    'LINT': 6,
    'ITERATE': 7,
    'PRESENT': 8
  };
  
  return phaseMap[phase] || 99; // Default to 99 for unknown phases
}

/**
 * Checks if a directory exists and is writable
 */
export function validateDirectoryAccess(directoryPath: string): { isValid: boolean; error?: string } {
  try {
    // Check if directory exists
    if (!fs.existsSync(directoryPath)) {
      // Try to create it
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    
    // Check if it's writable by creating a test file
    const testFile = path.join(directoryPath, '.write-test');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    
    return { isValid: true };
  } catch (error) {
    return { 
      isValid: false, 
      error: `Directory access failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Gets the default output directory based on current working directory
 */
export function getDefaultOutputDirectory(): string {
  return path.join(process.cwd(), 'structured-workflow');
}

/**
 * Resolves an output directory. If the provided path is absolute, returns it as-is.
 * Otherwise, treats it as relative to the provided base directory (defaults to CWD).
 */
export function resolveOutputDirectory(rawDir: string, baseDir: string = process.cwd()): string {
  return path.isAbsolute(rawDir) ? rawDir : path.resolve(baseDir, rawDir);
}