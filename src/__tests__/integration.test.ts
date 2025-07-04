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

  test('should suggest workflow output directory paths correctly', async () => {
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
      // Check that the path suggestion is correct
      expect(workflowResult.directoryCreated.taskDirectory).toContain(testOutputDir);
      expect(workflowResult.directoryCreated.message).toContain('Suggested output directory path');
    } else {
      fail('Expected workflowResult to have directoryCreated property');
    }

    // Now simulate completing the AUDIT_INVENTORY phase with artifact generation
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

    // Verify the phase output response has the expected fields
    expect(auditResult.recorded).toBe(true);
    expect(auditResult.artifacts).toBeDefined();
    expect(auditResult.artifacts!.length).toBe(1);
    
    // Verify the file path is correctly constructed
    const savedArtifact = auditResult.artifacts![0];
    expect(savedArtifact.path).toContain('01-audit-inventory');
    expect(savedArtifact.path).toContain(testOutputDir);
    
    // Since we're no longer actually saving files to disk, we can't check file content directly
    // Instead, verify that the phase output records were processed correctly
  });

  test('should handle workflow with default output directory when not specified', async () => {
    // Start workflow without specifying output directory (should use default)
    const workflowResult = await handleBuildCustomWorkflow({
      task: 'Default directory test',
      workflowType: 'custom',
      selectedPhases: ['AUDIT_INVENTORY']
      // No outputPreferences specified - should use default
    }, sessionManager);

    expect('success' in workflowResult && workflowResult.success).toBe(true);
    expect('directoryCreated' in workflowResult && workflowResult.directoryCreated).toBeDefined();
    
    if ('directoryCreated' in workflowResult && workflowResult.directoryCreated) {
      // Should use default directory when not specified
      const resolvedDefault = path.resolve('./structured-workflow');
      const baseDir = workflowResult.directoryCreated.baseDirectory;
      expect(baseDir === 'structured-workflow' || baseDir === resolvedDefault).toBe(true);
      // Instead of checking filesystem, verify the suggested path contains the expected directory
      expect(workflowResult.directoryCreated.taskDirectory).toContain(baseDir);
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

    // Verify all paths use the same suggested directory
    const taskDir = path.dirname(auditFile);
    expect(path.dirname(compareFile)).toBe(taskDir);
    expect(path.dirname(refactorFile)).toBe(taskDir);

    // Verify file naming sequence based on path strings
    expect(path.basename(auditFile)).toMatch(/^01-audit-inventory/);
    expect(path.basename(compareFile)).toMatch(/^02-compare-analyze/);
    expect(path.basename(refactorFile)).toMatch(/^04-write-or-refactor/);
  });

  test('should gracefully handle directory access issues with warnings', async () => {
    // Start workflow with a directory that will cause permission issues
    const readOnlyDir = '/root/restricted';  // This should fail most access checks
    
    const workflowResult = await handleBuildCustomWorkflow({
      task: 'Permission test',
      workflowType: 'custom',
      selectedPhases: ['AUDIT_INVENTORY'],
      outputPreferences: {
        outputDirectory: readOnlyDir
      }
    }, sessionManager);

    // Should succeed but with directory warning
    expect('success' in workflowResult && workflowResult.success).toBe(true);
    expect('directoryWarning' in workflowResult && workflowResult.directoryWarning).toBeDefined();
    
    if ('directoryWarning' in workflowResult && workflowResult.directoryWarning) {
      // Check warning message contains expected content
      expect(workflowResult.directoryWarning.warning).toBe('DIRECTORY ACCESS ISSUE');
      expect(workflowResult.directoryWarning.message).toContain('directory may not be writable');
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