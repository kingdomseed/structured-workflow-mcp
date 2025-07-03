import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { PhaseGuidance, OutputFileInstruction, ValidationCriteria } from '../types';

export function createTestGuidanceTool(): Tool {
  return {
    name: 'test_guidance',
    description: 'Get MANDATORY guidance for the TEST phase - execute tests and validate functionality after refactoring',
    inputSchema: { type: 'object', properties: {} }
  };
}

export async function handleTestGuidance(
  sessionManager: SessionManager
): Promise<PhaseGuidance> {
  const session = sessionManager.getSession();
  
  if (!session) {
    throw new Error('No active session. Use build_custom_workflow first.');
  }

  // Update phase and increment iteration count
  sessionManager.updatePhase('TEST');
  const iterationCount = sessionManager.incrementIterationCount('TEST');
  const hasReachedLimit = sessionManager.hasReachedIterationLimit('TEST');
  const config = session.workflowConfig;

  // Check for escalation to USER_INPUT_REQUIRED
  if (hasReachedLimit && config?.escalationTriggers.escalateOnIterationLimit) {
    const escalationContext = sessionManager.shouldEscalateToUserInput('TEST');
    if (escalationContext) {
      return {
        phase: 'USER_INPUT_REQUIRED',
        objective: '⚠️ TEST ITERATION LIMIT REACHED - User input required to proceed',
        instructions: [
          '🛑 STOP: You have reached the maximum TEST iteration limit',
          '📋 ESCALATION: Generate user input request using user_input_required_guidance tool',
          '⏳ PAUSE: Do not proceed with further testing until user provides direction'
        ],
        expectedOutput: {
          escalationReport: 'Document why escalation was triggered',
          userOptions: 'Present clear options for user to choose from',
          currentStatus: 'Summary of test results and failures'
        },
        nextPhase: 'Use user_input_required_guidance to escalate to user'
      };
    }
  }

  const outputDir = config?.outputPreferences.outputDirectory || 'workflow-output';
  const iterationSuffix = iterationCount > 1 ? `-iteration-${iterationCount}` : '';

  // Define expected output files
  const requiredOutputFiles: OutputFileInstruction[] = [
    {
      path: `${outputDir}/04-test-results${iterationSuffix}.md`,
      description: 'Detailed test execution results and analysis',
      required: true,
      format: 'markdown',
      validationRules: [
        'Must include total test count',
        'Must show passing/failing test breakdown',
        'Must include error messages for failing tests',
        'Must include test execution commands used'
      ]
    },
    {
      path: `${outputDir}/04-test-metrics.json`,
      description: 'Machine-readable test metrics and status',
      required: true,
      format: 'json',
      validationRules: [
        'Must be valid JSON format',
        'Must include testCount, passCount, failCount fields',
        'Must include timestamp of test execution'
      ]
    }
  ];

  // If we have failing tests from previous iterations, add failure analysis
  if (iterationCount > 1) {
    requiredOutputFiles.push({
      path: `${outputDir}/04-test-failure-analysis${iterationSuffix}.md`,
      description: 'Analysis of recurring test failures and potential solutions',
      required: true,
      format: 'markdown',
      validationRules: [
        'Must identify patterns in test failures',
        'Must propose specific solutions',
        'Must prioritize fixes by impact'
      ]
    });
  }

  // Define validation criteria
  const validationCriteria: ValidationCriteria = {
    minimumRequirements: {
      testsExecuted: true,
      resultsDocumented: true,
      commandsRecorded: true,
      errorsAnalyzed: iterationCount > 1 ? true : false
    },
    blockingMessages: [
      '⛔ CANNOT PROCEED: Test suite has not been executed',
      '⛔ CANNOT PROCEED: Test results not documented in required format',
      '⛔ CANNOT PROCEED: Failing test error messages not captured',
      '⛔ CANNOT PROCEED: Test execution commands not recorded'
    ],
    expectedFiles: requiredOutputFiles.map(f => f.path),
    selfCheckQuestions: [
      'Have I executed the complete test suite?',
      'Have I documented all test results with specific counts?',
      'Have I captured error messages for all failing tests?',
      'Have I recorded the exact commands used to run tests?',
      'Have I created all required output files?'
    ],
    completionCriteria: [
      'Test suite executed successfully',
      'All test results documented with pass/fail counts',
      'Error messages captured for failing tests',
      'Test execution commands recorded',
      'Output files created in correct format'
    ],
    cannotProceedUntil: [
      'All tests are passing OR iteration limit not yet reached',
      'Test results are documented in required files',
      'Error analysis is complete (if tests are failing)'
    ]
  };

  const guidance: PhaseGuidance = {
    phase: 'TEST',
    objective: 'Execute tests and validate functionality after refactoring changes',
    
    directiveInstructions: [
      '🔴 MANDATORY: You MUST execute the complete test suite',
      '📊 REQUIRED: You MUST document all test results with exact counts',
      '🔍 CRITICAL: You MUST capture error messages for any failing tests',
      '📝 ESSENTIAL: You MUST record the commands used to execute tests',
      '📁 BLOCKING: You MUST create all required output files before proceeding'
    ],

    instructions: [
      'Execute the project\'s test suite using the appropriate test command',
      'Document test execution results with pass/fail counts and timing',
      'Capture and analyze error messages for any failing tests',
      'Record the exact commands used to run the tests',
      'Create comprehensive test documentation in the required format'
    ],

    suggestedApproach: [
      'Identify the test command (npm test, pytest, cargo test, etc.)',
      'Run the full test suite and capture all output',
      'Count total tests, passing tests, and failing tests',
      'For failing tests: extract error messages and stack traces',
      'Document findings in structured markdown and JSON formats',
      'If tests fail: analyze patterns and prepare for ITERATE phase'
    ],

    importantNotes: [
      `⚠️ ITERATION ${iterationCount}/${config?.iterationLimits.TEST || 3}: This is attempt ${iterationCount} of ${config?.iterationLimits.TEST || 3}`,
      '🛑 BLOCKING VALIDATION: You cannot proceed until all requirements are met',
      '⏱️ ESCALATION: If tests still fail after max iterations, user input will be required',
      '📋 TRACKING: All test attempts are being tracked and documented'
    ],

    blockingMessages: validationCriteria.blockingMessages,

    expectedOutput: {
      testResults: 'Comprehensive test execution results with pass/fail counts',
      errorAnalysis: 'Detailed analysis of any failing tests',
      executionCommands: 'Commands used to run the test suite',
      metrics: 'Machine-readable test metrics and timestamps',
      outputFiles: `Required files: ${requiredOutputFiles.map(f => f.path).join(', ')}`
    },

    requiredOutputFiles,
    validationCriteria,

    nextPhase: iterationCount >= (config?.iterationLimits.TEST || 3) 
      ? 'If tests still fail, use user_input_required_guidance for escalation'
      : 'If all tests pass, use lint_guidance. If tests fail, use iterate_guidance',

    prerequisites: {
      completed: ['WRITE_OR_REFACTOR'],
      warning: !session.completedPhases.includes('WRITE_OR_REFACTOR') 
        ? '⚠️ WARNING: WRITE_OR_REFACTOR phase not completed. Tests may not reflect recent changes.' 
        : null
    }
  };

  return guidance;
}

export function generateTestResultsTemplate(
  testCommand: string,
  totalTests: number,
  passingTests: number,
  failingTests: number,
  errors: string[],
  iterationCount: number
): string {
  const timestamp = new Date().toISOString();
  
  return `# Test Execution Results - Iteration ${iterationCount}

## Execution Summary
- **Timestamp**: ${timestamp}
- **Test Command**: \`${testCommand}\`
- **Total Tests**: ${totalTests}
- **Passing Tests**: ${passingTests}
- **Failing Tests**: ${failingTests}
- **Success Rate**: ${totalTests > 0 ? Math.round((passingTests / totalTests) * 100) : 0}%

## Test Status
${failingTests === 0 ? '✅ **ALL TESTS PASSING**' : `❌ **${failingTests} TESTS FAILING**`}

${failingTests > 0 ? `
## Failing Test Analysis

${errors.map((error, index) => `
### Failure ${index + 1}
\`\`\`
${error}
\`\`\`
`).join('\n')}

## Next Steps
- Review failing test errors above
- Identify root causes of failures
- Proceed to ITERATE phase to fix issues
- Re-run tests after fixes applied
` : `
## Next Steps
- All tests are passing ✅
- Proceed to LINT phase for code quality verification
- Continue with workflow as planned
`}

## Validation Checklist
- [${totalTests > 0 ? 'x' : ' '}] Test suite executed
- [${totalTests > 0 ? 'x' : ' '}] Results documented
- [${errors.length > 0 ? 'x' : failingTests === 0 ? 'x' : ' '}] Error messages captured
- [x] Output files created

---
*Generated during TEST phase - Iteration ${iterationCount}*`;
}