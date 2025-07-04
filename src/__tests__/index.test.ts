import { jest } from '@jest/globals';
import { parseArguments } from '../index';

describe('CLI Parameter Parsing', () => {
  let mockProcessChdir: jest.MockedFunction<typeof process.chdir>;
  let mockConsoleError: jest.MockedFunction<typeof console.error>;
  let mockProcessExit: jest.SpiedFunction<typeof process.exit>;

  beforeEach(() => {
    // Mock process functions
    mockProcessChdir = jest.fn();
    process.chdir = mockProcessChdir;
    
    mockConsoleError = jest.fn();
    console.error = mockConsoleError;
    
    mockProcessExit = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called');
    });
  });

  afterEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    mockProcessExit.mockRestore();
  });

  describe('parseArguments function', () => {
    test('should parse --output-dir parameter', () => {
      const argv = ['--output-dir', './custom-output'];
      const config = parseArguments(argv);
      
      expect(config.outputDirectory).toBe('./custom-output');
    });

    test('should parse --outputDirectory parameter (alternative syntax)', () => {
      const argv = ['--outputDirectory', '/tmp/workflows'];
      const config = parseArguments(argv);
      
      expect(config.outputDirectory).toBe('/tmp/workflows');
    });

    test('should parse --working-dir parameter', () => {
      const argv = ['--working-dir', '/project/root'];
      const config = parseArguments(argv);
      
      expect(config.workingDirectory).toBe('/project/root');
    });

    test('should parse --workingDirectory parameter (alternative syntax)', () => {
      const argv = ['--workingDirectory', '/another/path'];
      const config = parseArguments(argv);
      
      expect(config.workingDirectory).toBe('/another/path');
    });

    test('should use default when no parameters provided', () => {
      const argv: string[] = [];
      const config = parseArguments(argv);
      
      expect(config.outputDirectory).toBeUndefined();
      expect(config.workingDirectory).toBeUndefined();
    });

    test('should handle multiple parameters', () => {
      const argv = ['--output-dir', './docs/workflows', '--working-dir', '/project'];
      const config = parseArguments(argv);
      
      expect(config.outputDirectory).toBe('./docs/workflows');
      expect(config.workingDirectory).toBe('/project');
    });

    test('should ignore parameters without values', () => {
      const argv = ['--output-dir', '--working-dir', '/project'];
      const config = parseArguments(argv);
      
      // Should be undefined since --output-dir had no value
      expect(config.outputDirectory).toBeUndefined();
      expect(config.workingDirectory).toBe('/project');
    });
  });

  describe('Help functionality', () => {
    test('should show help with --help flag', () => {
      const argv = ['--help'];
      const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      expect(() => parseArguments(argv)).toThrow('process.exit called');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('structured-workflow-mcp'));
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('--output-dir'));
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('--working-dir'));
      expect(mockProcessExit).toHaveBeenCalledWith(0);
      
      mockConsoleLog.mockRestore();
    });

    test('should show help with -h flag', () => {
      const argv = ['-h'];
      const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      expect(() => parseArguments(argv)).toThrow('process.exit called');
      
      expect(mockConsoleLog).toHaveBeenCalled();
      expect(mockProcessExit).toHaveBeenCalledWith(0);
      
      mockConsoleLog.mockRestore();
    });
  });
});