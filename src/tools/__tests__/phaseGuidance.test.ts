import { handlePhaseGuidance } from '../phaseGuidance';
import { SessionManager } from '../../session/SessionManager';

describe('Phase guidance universal instructions', () => {
  const universalHelpfulInstructions = [
    'You are an agent – keep working until the user’s query is fully resolved **before** yielding back.',
    'If you are unsure about file contents or project structure, leverage your file-reading and search tools – do **NOT** guess or fabricate details.',
    'Plan extensively before each tool/function call and reflect on prior outcomes; avoid blindly chaining calls.'
  ];

  it('includes universal instructions in suggestive mode', async () => {
    const sessionManager = new SessionManager();
    sessionManager.startSession('test-task');
    const guidance = await handlePhaseGuidance('compare_analyze_guidance', sessionManager);
    // Expect universal instructions appended at end of suggestions
    const tail = guidance.instructions.slice(-universalHelpfulInstructions.length);
    // Ensure all universal instructions are present (order-insensitive to dash variants)
    // Normalize unicode hyphens before comparing to avoid invisible dash mismatches
    const normalize = (s: string) => s.replace(/[\u2010\u2011]/g, '-');
    expect(tail.map(normalize)).toEqual(
      expect.arrayContaining(universalHelpfulInstructions.map(normalize))
    );
  });

  it('includes universal instructions in directive mode', async () => {
    const sessionManager = new SessionManager();
    // Provide a valid WorkflowConfiguration to trigger directive mode
    const workflowConfig = {
      selectedPhases: [],
      iterationLimits: { TEST: 1, LINT: 1, ITERATE: 1 },
      outputPreferences: {
        formats: ['markdown'] as ('markdown' | 'json')[],
        realTimeUpdates: false,
        generateDiagrams: false,
        includeCodeSnippets: false,
        outputDirectory: 'out',
        createProgressReport: false,
        createPhaseArtifacts: false
      },
      userCheckpoints: {
        beforeMajorChanges: false,
        afterFailedIterations: false,
        beforeFinalPresentation: false
      },
      escalationTriggers: {
        enableUserInput: false,
        escalateOnIterationLimit: false,
        escalateOnErrors: false,
        escalateOnTime: false
      }
    };
    sessionManager.startSession('test-task', workflowConfig, 'refactor');
    const guidance = await handlePhaseGuidance('iterate_guidance', sessionManager);
    const tail = guidance.instructions.slice(-universalHelpfulInstructions.length);
    const normalize = (s: string) => s.replace(/[\u2010\u2011]/g, '-');
    expect(tail.map(normalize)).toEqual(
      expect.arrayContaining(universalHelpfulInstructions.map(normalize))
    );
  });
});
