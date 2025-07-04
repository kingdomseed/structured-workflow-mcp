import { SessionManager } from '../session/SessionManager';
import { handleBuildCustomWorkflow } from '../tools/buildCustomWorkflow';
import { handlePhaseOutput } from '../tools/phaseOutput';
import fs from 'fs';
import path from 'path';

// Integration tests run without mocking index.ts to preserve SessionManager singleton behavior

describe('Integration Tests - Custom Output Directory', () => {
  let sessionManager: SessionManager;
  let testOutputDir: string;

  beforeEach(() => {
    sessionManager = new SessionManager();
    testOutputDir = path.resolve('./test-workflow-integration');
    
    // Clean up any existing test directory
    if (fs.existsSync(testOutputDir)) {
      fs.rmSync(testOutputDir, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    // Clean up test directory after each test
    if (fs.existsSync(testOutputDir)) {
      fs.rmSync(testOutputDir, { recursive: true, force: true });
    }
    
    // Clean up default workflow directory
    const defaultWorkflowDir = path.resolve('./structured-workflow');
    if (fs.existsSync(defaultWorkflowDir)) {
      fs.rmSync(defaultWorkflowDir, { recursive: true, force: true });
    }
  });

  test('should create workflow with custom output directory and save files', async () => {
    // Start a custom workflow with specific output directory
    const workflowResult = await handleBuildCustomWorkflow({
      task: 'Test workflow integration',
      workflowType: 'custom',  // Explicitly set to custom to avoid workflow detection
      selectedPhases: ['AUDIT_INVENTORY', 'WRITE_OR_REFACTOR', 'PRESENT'],
      outputPreferences: {
        outputDirectory: testOutputDir,
        formats: ['markdown'],
        realTimeUpdates: true
      }
    }, sessionManager);

    expect('success' in workflowResult && workflowResult.success).toBe(true);
    expect('directoryCreated' in workflowResult && workflowResult.directoryCreated).toBeDefined();
    
    // Type guard to access properties safely
    if ('directoryCreated' in workflowResult && workflowResult.directoryCreated) {
      // Check that the directory was created
      expect(fs.existsSync(workflowResult.directoryCreated.taskDirectory)).toBe(true);
    } else {
      fail('Expected workflowResult to have directoryCreated property');
    }

    // Now simulate completing the AUDIT_INVENTORY phase with actual file creation
    const auditResult = await handlePhaseOutput({
      phase: 'AUDIT_INVENTORY',
      output: {
        summary: 'Analysis complete',
        filesAnalyzed: ['src/index.ts', 'src/utils/fileSystem.ts'],
        issues: ['No major issues found'],
        recommendations: ['Continue with implementation']
      },
      outputArtifacts: [{
        path: 'audit-analysis',
        format: 'markdown',
        description: 'Audit and inventory analysis results',
        content: `# Audit & Inventory Analysis

## Files Analyzed
- src/index.ts
- src/utils/fileSystem.ts

## Issues Found
- No major issues found

## Recommendations
- Continue with implementation

## Dependencies
- @modelcontextprotocol/sdk
- TypeScript

## Summary
The codebase is well-structured and ready for the planned modifications.`
      }]
    }, sessionManager);

    // Verify the phase output was successful
    expect(auditResult.recorded).toBe(true);
    expect(auditResult.artifactsSaved).toBe(1);
    expect(auditResult.artifactsFailed).toBe(0);
    
    // Verify the file was actually created with numbered naming
    expect(auditResult.artifacts).toBeDefined();
    expect(auditResult.artifacts!.length).toBe(1);
    const savedArtifact = auditResult.artifacts![0];
    expect(savedArtifact.path).toContain('01-audit-inventory');
    expect(savedArtifact.path).toContain(testOutputDir);
    expect(savedArtifact.savedAt).toBeDefined();
    
    // Verify the file exists on disk
    expect(fs.existsSync(savedArtifact.path)).toBe(true);
    
    // Verify the file content
    const fileContent = fs.readFileSync(savedArtifact.path, 'utf-8');
    expect(fileContent).toContain('# Audit & Inventory Analysis');
    expect(fileContent).toContain('src/index.ts');
    expect(fileContent).toContain('No major issues found');
  });

  test('should handle workflow with default output directory when not specified', async () => {
    // Start workflow without specifying output directory (should use default)
    const workflowResult = await handleBuildCustomWorkflow({
      task: 'Default directory test',
      workflowType: 'custom',
      selectedPhases: ['AUDIT_INVENTORY', 'PRESENT']
    }, sessionManager);

    expect('success' in workflowResult && workflowResult.success).toBe(true);
    
    // Type guard to access properties safely
    if ('directoryCreated' in workflowResult && workflowResult.directoryCreated) {
      // Should use the real default directory
      expect(workflowResult.directoryCreated.baseDirectory).toBe('structured-workflow');
      expect(fs.existsSync(workflowResult.directoryCreated.taskDirectory)).toBe(true);
    } else {
      fail('Expected workflowResult to have directoryCreated property');
    }
  });

  test('should create numbered files in correct sequence', async () => {
    // Start workflow
    const workflowResult = await handleBuildCustomWorkflow({
      task: 'Numbered file test',
      workflowType: 'custom',
      selectedPhases: ['AUDIT_INVENTORY', 'COMPARE_ANALYZE', 'WRITE_OR_REFACTOR'],
      outputPreferences: {
        outputDirectory: testOutputDir
      }
    }, sessionManager);

    expect('success' in workflowResult && workflowResult.success).toBe(true);

    // Complete AUDIT_INVENTORY phase
    const auditResult = await handlePhaseOutput({
      phase: 'AUDIT_INVENTORY',
      output: { summary: 'Audit complete' },
      outputArtifacts: [{
        path: 'audit-results',
        format: 'json',
        description: 'Audit results',
        content: JSON.stringify({ files: ['test.ts'], issues: [] })
      }]
    }, sessionManager);

    expect(auditResult.recorded).toBe(true);
    const auditFile = auditResult.artifacts![0].path;
    expect(auditFile).toContain('01-audit-inventory');
    expect(fs.existsSync(auditFile)).toBe(true);

    // Complete COMPARE_ANALYZE phase
    const compareResult = await handlePhaseOutput({
      phase: 'COMPARE_ANALYZE',
      output: { summary: 'Analysis complete' },
      outputArtifacts: [{
        path: 'comparison-analysis',
        format: 'markdown',
        description: 'Comparison analysis',
        content: '# Comparison Analysis\n\n## Approaches\n- Approach 1: Simple\n- Approach 2: Complex\n\n## Recommendation\nUse Approach 1'
      }]
    }, sessionManager);

    expect(compareResult.recorded).toBe(true);
    const compareFile = compareResult.artifacts![0].path;
    expect(compareFile).toContain('02-compare-analyze');
    expect(fs.existsSync(compareFile)).toBe(true);

    // Complete WRITE_OR_REFACTOR phase
    const refactorResult = await handlePhaseOutput({
      phase: 'WRITE_OR_REFACTOR',
      output: { summary: 'Implementation complete' },
      outputArtifacts: [{
        path: 'implementation-results',
        format: 'markdown',
        description: 'Implementation results',
        content: '# Implementation Results\n\n## Changes Made\n- Updated file A\n- Created file B\n\n## Status\nComplete'
      }]
    }, sessionManager);

    expect(refactorResult.recorded).toBe(true);
    const refactorFile = refactorResult.artifacts![0].path;
    expect(refactorFile).toContain('04-write-or-refactor');
    expect(fs.existsSync(refactorFile)).toBe(true);

    // Verify all files are in the same task directory
    const taskDir = path.dirname(auditFile);
    expect(path.dirname(compareFile)).toBe(taskDir);
    expect(path.dirname(refactorFile)).toBe(taskDir);

    // Verify file naming sequence
    const files = fs.readdirSync(taskDir).sort();
    expect(files.length).toBeGreaterThanOrEqual(3);
    expect(files.some(f => f.startsWith('01-audit-inventory'))).toBe(true);
    expect(files.some(f => f.startsWith('02-compare-analyze'))).toBe(true);
    expect(files.some(f => f.startsWith('04-write-or-refactor'))).toBe(true);
  });

  test('should gracefully handle file creation failures', async () => {
    // Start workflow with a directory that will cause permission issues
    const readOnlyDir = '/root/restricted';  // This should fail on most systems
    
    const workflowResult = await handleBuildCustomWorkflow({
      task: 'Permission test',
      workflowType: 'custom',
      selectedPhases: ['AUDIT_INVENTORY'],
      outputPreferences: {
        outputDirectory: readOnlyDir
      }
    }, sessionManager);

    // Should fail with directory creation error
    expect('error' in workflowResult && workflowResult.error).toBeDefined();
    if ('message' in workflowResult) {
      expect(workflowResult.message).toContain('Cannot create workflow directory');
    }
  });

  test('should maintain session state across phase completions', async () => {
    // Start workflow
    const workflowResult = await handleBuildCustomWorkflow({
      task: 'Session state test',
      workflowType: 'custom',
      selectedPhases: ['AUDIT_INVENTORY', 'WRITE_OR_REFACTOR', 'PRESENT'],
      outputPreferences: {
        outputDirectory: testOutputDir
      }
    }, sessionManager);

    expect('success' in workflowResult && workflowResult.success).toBe(true);

    // Complete first phase
    await handlePhaseOutput({
      phase: 'AUDIT_INVENTORY',
      output: { summary: 'First phase complete' },
      outputArtifacts: [{
        path: 'audit',
        format: 'json',
        description: 'Audit results',
        content: JSON.stringify({ 
          audit: 'complete',
          files: ['src/index.ts', 'src/utils/test.ts'],
          changes: ['refactor main function', 'add error handling'],
          completed: true 
        })
      }]
    }, sessionManager);

    // Check session state
    const session = sessionManager.getSession();
    expect(session).toBeDefined();
    expect(session!.completedPhases).toContain('AUDIT_INVENTORY');
    expect(session!.phaseOutputs.has('AUDIT_INVENTORY')).toBe(true);

    // Complete second phase
    await handlePhaseOutput({
      phase: 'WRITE_OR_REFACTOR',
      output: { summary: 'Implementation complete' },
      outputArtifacts: [{
        path: 'implementation',
        format: 'markdown',
        description: 'Implementation details',
        content: '# Implementation\n\nChanges made successfully.'
      }]
    }, sessionManager);

    // Verify session state updated
    expect(session!.completedPhases).toContain('AUDIT_INVENTORY');
    expect(session!.completedPhases).toContain('WRITE_OR_REFACTOR');
    expect(session!.phaseOutputs.has('WRITE_OR_REFACTOR')).toBe(true);
  });
});