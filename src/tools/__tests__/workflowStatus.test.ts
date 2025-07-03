import { handleWorkflowStatus } from '../workflowStatus';
import { SessionManager } from '../../session/SessionManager';
import { Phase } from '../../types';

describe('WorkflowStatus Tool', () => {
  let sm: SessionManager;

  beforeEach(() => {
    sm = new SessionManager();
  });

  test('returns No active session when none started', async () => {
    const res = await handleWorkflowStatus(sm);
    expect(res).toHaveProperty('status', 'No active session');
    expect(res).toHaveProperty('message');
  });

  test('returns full status when session active', async () => {
    const config = {
      selectedPhases: ['TEST', 'LINT'] as Phase[],
      iterationLimits: { TEST: 1, LINT: 1, ITERATE: 1 },
      outputPreferences: {
        formats: ['json'] as ('json' | 'markdown')[], realTimeUpdates: false,
        generateDiagrams: false, includeCodeSnippets: false,
        outputDirectory: 'out', createProgressReport: false,
        createPhaseArtifacts: false
      },
      userCheckpoints: { beforeMajorChanges: false, afterFailedIterations: false, beforeFinalPresentation: false },
      escalationTriggers: { enableUserInput: false, escalateOnIterationLimit: false, escalateOnErrors: false, escalateOnTime: false }
    };
    sm.startSession('My task', config, 'test');
    sm.recordFileRead('foo.ts');
    sm.recordFileModification('foo.ts');
    sm.updatePhase('TEST');
    sm.recordPhaseOutput('TEST', { ok: true });

    const res = await handleWorkflowStatus(sm);
    expect(res.sessionId).toBeDefined();
    expect(res.task).toBe('My task');
    expect(res.currentPhase).toBe('TEST');
    expect(res.completedPhases).toContain('PLANNING');
    expect(res.phaseOutputs).toHaveProperty('TEST');
    expect(res.metrics).toHaveProperty('filesAnalyzed');
    expect(res.fileOperations!.filesRead).toContain('foo.ts');
    expect(res.fileOperations!.filesModified).toContain('foo.ts');
    expect(Array.isArray(res.nextSteps)).toBe(true);
  });
});
