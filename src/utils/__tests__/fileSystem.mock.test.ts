import * as fs from 'fs';
import * as path from 'path';
import mock from 'mock-fs';
import {
  resolveOutputDirectory,
  validateDirectoryAccess,
  sanitizeTaskName,
  generateNumberedFileName
} from '../fileSystem';

describe('FileSystem Utils with Mock FS', () => {
  // Setup and teardown mock filesystem
  beforeEach(() => {
    // Create a mock filesystem structure
    mock({
      '/mock-root': {
        'writable-dir': {
          'existing-file.md': 'This is a test file',
          'task-artifacts': {
            '01-some-artifact.md': '# Content here'
          }
        },
        'readonly-dir': mock.directory({
          mode: 0o444, // Read-only directory
          items: {}
        })
      },
      // Current working directory
      'project-root': {
        'artifacts': {
          'existing-task': {
            '01-audit-inventory.md': '# Audit content'
          }
        }
      }
    });
  });

  afterEach(() => {
    // Restore real filesystem
    mock.restore();
  });

  describe('validateDirectoryAccess', () => {
    it('returns valid for existing writable directories', () => {
      const result = validateDirectoryAccess('/mock-root/writable-dir');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('returns error for non-existent directories', () => {
      const result = validateDirectoryAccess('/mock-root/nonexistent-dir');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('ENOENT');
    });

    it('returns error for read-only directories', () => {
      const result = validateDirectoryAccess('/mock-root/readonly-dir');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('resolveOutputDirectory', () => {
    it('resolves absolute paths correctly', () => {
      const absolutePath = '/mock-root/writable-dir';
      const result = resolveOutputDirectory(absolutePath);
      expect(result).toBe(absolutePath);
    });

    it('resolves relative paths from current directory', () => {
      // Mock process.cwd() to return a predictable value
      const originalCwd = process.cwd;
      process.cwd = jest.fn(() => '/mock-root');
      
      try {
        const relativePath = 'writable-dir';
        const result = resolveOutputDirectory(relativePath);
        expect(result).toBe('/mock-root/writable-dir');
      } finally {
        // Restore original process.cwd
        process.cwd = originalCwd;
      }
    });
  });

  describe('generateNumberedFileName', () => {
    it('generates a properly formatted filename based on phase', () => {
      const mockDirectory = '/mock-root/writable-dir/task-artifacts';
      
      const result = generateNumberedFileName({
        phase: 'AUDIT_INVENTORY',
        outputDirectory: mockDirectory,
        extension: 'md'
      });
      
      // Verify the file doesn't exist yet (using fs module to fix unused import warning)
      const fullPath = path.join(mockDirectory, result);
      expect(fs.existsSync(fullPath)).toBe(false);
      
      expect(result).toContain('01-audit-inventory');
      expect(result.endsWith('.md')).toBe(true);
      expect(result).toMatch(/^\d{2}-[a-z-]+-\d{4}-\d{2}-\d{2}\.md$/);
    });
    
    it('handles phase to prefix conversion correctly', () => {
      const result = generateNumberedFileName({
        phase: 'COMPARE_ANALYZE',
        outputDirectory: '/mock-root/writable-dir',
        extension: 'json',
        includeDate: false
      });
      
      // Should use correct phase number prefix
      expect(result).toMatch(/^02-compare-analyze\.json$/);
    });
    
    it('handles custom phase not in the phase map', () => {
      const result = generateNumberedFileName({
        phase: 'CUSTOM_PHASE',
        outputDirectory: '/mock-root/writable-dir',
        extension: 'md'
      });
      
      // Should use default number 99 for unknown phases
      expect(result).toMatch(/^99-custom-phase/);
    });
  });

  describe('sanitizeTaskName', () => {
    it('sanitizes task names correctly', () => {
      expect(sanitizeTaskName('Task with spaces')).toBe('task-with-spaces');
      expect(sanitizeTaskName('Task@#$%^&*')).toBe('task');
      expect(sanitizeTaskName('UPPERCASE')).toBe('uppercase');
    });
  });
});
