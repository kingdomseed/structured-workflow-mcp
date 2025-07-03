import { SessionManager } from '../../session/SessionManager';
import { handleValidateAction, handleValidatePhaseCompletion } from '../validation';
import { Phase } from '../../types';

describe('Validation Tools', () => {
  let sm: SessionManager;

  beforeEach(() => {
    sm = new SessionManager();
  });

  describe('handleValidateAction', () => {
    beforeEach(() => {
      sm.startSession('test');
    });
    test('blocks modification before read', async () => {
      const result = await handleValidateAction({ action: 'modify file', targetFile: 'foo.ts' }, sm);
      expect(result.allowed).toBe(false);
      expect(result.error).toContain('Cannot modify a file before reading it');
    });

    test('allows read and records history', async () => {
      // session started in beforeEach
      const result = await handleValidateAction({ action: 'read file', targetFile: 'foo.ts' }, sm);
      console.log('allows read and records history result:', result);
      expect(result.allowed).toBe(true);
      const hist = sm.getFileHistory('foo.ts');
      expect(hist.hasBeenRead).toBe(true);
    });

    test('allows modification after read', async () => {
      // session started in beforeEach
      await handleValidateAction({ action: 'read file', targetFile: 'foo.ts' }, sm);
      const result = await handleValidateAction({ action: 'modify file', targetFile: 'foo.ts' }, sm);
      expect(result.allowed).toBe(true);
      const hist = sm.getFileHistory('foo.ts');
      expect(hist.hasBeenModified).toBe(true);
    });
  });

  describe('handleValidatePhaseCompletion', () => {
    test('returns error when no session', async () => {
      const res = await handleValidatePhaseCompletion({ phase: 'TEST' as Phase, completedWork: {} }, sm);
      console.log('phase completion no session res:', res);
      expect(res.isValid).toBe(false);
      expect(res.error).toMatch(/No active session/);
    });

    test('validates phase completion with minimal requirements', async () => {
      sm.startSession('task', {
        selectedPhases: ['TEST'],
        iterationLimits: { TEST: 1, LINT: 1, ITERATE: 1 },
        outputPreferences: { formats: ['json'], realTimeUpdates: false, generateDiagrams: false, includeCodeSnippets: false, outputDirectory: 'out', createProgressReport: false, createPhaseArtifacts: false },
        userCheckpoints: { beforeMajorChanges: false, afterFailedIterations: false, beforeFinalPresentation: false },
        escalationTriggers: { enableUserInput: false, escalateOnIterationLimit: false, escalateOnErrors: false, escalateOnTime: false }
      }, 'test');
      const res = await handleValidatePhaseCompletion({ phase: 'TEST' as Phase, completedWork: { testsExecuted: true, resultsDocumented: true, commandsRecorded: true, outputFilesCreated: 2 }, createdFiles: ['out/04-test-results.md', 'out/04-test-metrics.json'] }, sm);
      console.log('phase completion valid res:', res);
      expect(res.isValid).toBe(true);
      expect(res.canProceed).toBe(true);
    });
  });
});
