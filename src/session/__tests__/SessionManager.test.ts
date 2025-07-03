import { SessionManager } from '../SessionManager';
import { WorkflowConfiguration, ValidationState } from '../../types';

describe('SessionManager', () => {
  let sm: SessionManager;
  let config: WorkflowConfiguration;

  beforeEach(() => {
    sm = new SessionManager();
    config = {
      selectedPhases: ['TEST'],
      iterationLimits: { TEST: 1, LINT: 1, ITERATE: 1 },
      outputPreferences: {
        formats: ['json'],
        realTimeUpdates: false,
        generateDiagrams: false,
        includeCodeSnippets: false,
        outputDirectory: 'workflow-output',
        createProgressReport: false,
        createPhaseArtifacts: false
      },
      userCheckpoints: { beforeMajorChanges: false, afterFailedIterations: false, beforeFinalPresentation: false },
      escalationTriggers: { enableUserInput: true, escalateOnIterationLimit: true, escalateOnErrors: true, escalateOnTime: true }
    };
  });

  test('startSession initializes state correctly', () => {
    const session = sm.startSession('task', config, 'test');
    expect(session.taskDescription).toBe('task');
    expect(session.currentPhase).toBe('PLANNING');
    expect(session.workflowConfig).toEqual(config);
    expect(session.workflowType).toBe('test');
  });

  test('recordFileRead and recordFileModification update fileHistory and metrics', () => {
    sm.startSession('task', config, 'test');
    sm.recordFileRead('file.ts');
    let hist = sm.getFileHistory('file.ts');
    expect(hist.hasBeenRead).toBe(true);
    sm.recordFileModification('file.ts');
    hist = sm.getFileHistory('file.ts');
    expect(hist.hasBeenModified).toBe(true);
    const metrics = sm.getSession()!.metrics;
    expect(metrics.filesAnalyzed).toBe(1);
    expect(metrics.filesModified).toBe(1);
  });

  test('updatePhase and recordPhaseOutput track phases', () => {
    sm.startSession('task', config, 'test');
    sm.updatePhase('TEST');
    const session = sm.getSession()!;
    expect(session.currentPhase).toBe('TEST');
    expect(session.completedPhases).toContain('PLANNING');
    sm.recordPhaseOutput('TEST', { ok: true });
    const output = session.phaseOutputs.get('TEST');
    expect(output).toBeDefined();
    expect(output!.phase).toBe('TEST');
  });

  test('iteration count and limits work', () => {
    sm.startSession('task', config, 'test');
    expect(sm.getIterationCount('TEST')).toBe(0);
    sm.incrementIterationCount('TEST');
    expect(sm.getIterationCount('TEST')).toBe(1);
    expect(sm.hasReachedIterationLimit('TEST')).toBe(true);
  });

  test('validation state and escalation', () => {
    sm.startSession('task', config, 'test');
    const state: ValidationState = { isComplete: true, completedRequirements: [], failedRequirements: [], lastValidatedAt: Date.now(), attempts: 1 };
    sm.setValidationState('TEST', state);
    expect(sm.getValidationState('TEST')).toEqual(state);
    expect(sm.isPhaseValidationComplete('TEST')).toBe(true);

    sm.incrementIterationCount('TEST');
    const esc = sm.shouldEscalateToUserInput('TEST');
    expect(esc).not.toBeNull();
    expect(esc!.trigger).toBe('iteration_limit');
  });
});
