import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { ValidationResult, ValidationCriteria, Phase } from '../types';
import { isModificationAction } from '../utils/helpers';

export function createValidationTools(): Tool[] {
  return [
    {
      name: 'validate_action',
      description: 'Check if an action follows critical safety rules',
      inputSchema: {
        type: 'object',
        properties: {
          action: {
            type: 'string',
            description: 'The action you want to take'
          },
          targetFile: {
            type: 'string',
            description: 'The file you want to act on'
          }
        },
        required: ['action', 'targetFile']
      }
    },
    {
      name: 'validate_phase_completion',
      description: 'Validate that current phase meets all completion requirements before allowing progression',
      inputSchema: {
        type: 'object',
        properties: {
          phase: {
            type: 'string',
            enum: ['SETUP', 'AUDIT_INVENTORY', 'COMPARE_ANALYZE', 'QUESTION_DETERMINE', 'WRITE_OR_REFACTOR', 'TEST', 'LINT', 'ITERATE', 'PRESENT'],
            description: 'The phase to validate'
          },
          completedWork: {
            type: 'object',
            description: 'Description of work completed in this phase',
            additionalProperties: true
          },
          createdFiles: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of files created during this phase'
          }
        },
        required: ['phase', 'completedWork']
      }
    }
  ];
}

export async function handleValidateAction(
  params: { action: string; targetFile: string },
  sessionManager: SessionManager
): Promise<ValidationResult> {
  const session = sessionManager.getSession();
  const fileHistory = sessionManager.getFileHistory(params.targetFile);
  
  // Only enforce the critical "read before write" rule
  if (isModificationAction(params.action) && !fileHistory.hasBeenRead) {
    return {
      allowed: false,
      error: 'SAFETY VIOLATION: Cannot modify a file before reading it',
      reason: 'This prevents accidental data loss and ensures informed changes',
      resolution: `First read the file "${params.targetFile}" using any file reading tool, then you can modify it`
    };
  }
  
  // Track file reads and modifications
  if (params.action.toLowerCase().includes('read')) {
    sessionManager.recordFileRead(params.targetFile);
  } else if (isModificationAction(params.action)) {
    sessionManager.recordFileModification(params.targetFile);
  }
  
  // All other actions are allowed
  return {
    allowed: true,
    currentPhase: session?.currentPhase,
    reminder: session 
      ? `You're in ${session.currentPhase} phase. Check ${session.currentPhase.toLowerCase()}_guidance for recommendations.`
      : 'No active session. Consider starting with plan_workflow or build_custom_workflow.'
  };
}

export async function handleValidatePhaseCompletion(
  params: {
    phase: Phase;
    completedWork: any;
    createdFiles?: string[];
  },
  sessionManager: SessionManager
) {
  const session = sessionManager.getSession();
  
  if (!session) {
    return {
      isValid: false,
      error: 'No active session. Use build_custom_workflow first.',
      blockers: ['No active workflow session']
    };
  }

  // Get current validation state for this phase
  let validationState = sessionManager.getValidationState(params.phase);
  if (!validationState) {
    validationState = {
      isComplete: false,
      completedRequirements: [],
      failedRequirements: [],
      lastValidatedAt: Date.now(),
      attempts: 0
    };
  }

  // Increment validation attempts
  validationState.attempts++;
  validationState.lastValidatedAt = Date.now();

  // Get phase-specific validation criteria
  const criteria = getValidationCriteriaForPhase(params.phase, session.workflowConfig?.outputPreferences.outputDirectory || 'workflow-output');
  
  // Perform validation checks
  const validationResults = performPhaseValidation(params.phase, params.completedWork, params.createdFiles || [], criteria);

  // Update validation state
  validationState.completedRequirements = validationResults.passed;
  validationState.failedRequirements = validationResults.failed;
  validationState.isComplete = validationResults.isComplete;

  // Store updated validation state
  sessionManager.setValidationState(params.phase, validationState);

  // Check for escalation conditions
  const escalationContext = sessionManager.shouldEscalateToUserInput(params.phase);
  
  if (escalationContext) {
    return {
      isValid: false,
      escalationRequired: true,
      escalationContext,
      message: '⚠️ ESCALATION REQUIRED: Validation issues require user input',
      validationAttempts: validationState.attempts,
      failedRequirements: validationResults.failed,
      recommendation: 'Use user_input_required_guidance to escalate to user'
    };
  }

  if (!validationResults.isComplete) {
    return {
      isValid: false,
      message: '⛔ VALIDATION FAILED: Phase completion requirements not met',
      validationAttempts: validationState.attempts,
      passedRequirements: validationResults.passed,
      failedRequirements: validationResults.failed,
      blockingMessages: validationResults.blockingMessages,
      nextSteps: validationResults.nextSteps,
      selfCheckQuestions: criteria.selfCheckQuestions
    };
  }

  return {
    isValid: true,
    message: '✅ VALIDATION PASSED: Phase completion requirements met',
    validationAttempts: validationState.attempts,
    completedRequirements: validationResults.passed,
    nextPhase: getNextPhaseRecommendation(params.phase, session),
    canProceed: true
  };
}

function getValidationCriteriaForPhase(phase: Phase, outputDir: string): ValidationCriteria {
  const phaseValidationMap: Record<Phase, ValidationCriteria> = {
    SETUP: {
      minimumRequirements: {
        workingDirectoryConfirmed: true,
        outputPatternAcknowledged: true,
        toolsListed: true,
        patternUnderstood: true,
        outputFilesCreated: 1
      },
      blockingMessages: [
        '⛔ Working directory not confirmed',
        '⛔ Output pattern not acknowledged',
        '⛔ Available tools not listed',
        '⛔ Required setup file not created'
      ],
      expectedFiles: [
        'structured-workflow/{task-name}/00-setup-confirmation.md'
      ],
      selfCheckQuestions: [
        'Have I confirmed the working directory?',
        'Have I acknowledged the output pattern?',
        'Have I listed available tools?',
        'Have I created the setup confirmation file?'
      ],
      completionCriteria: [
        'Working directory verified',
        'Output pattern understood',
        'Setup confirmation documented'
      ],
      cannotProceedUntil: [
        'Setup confirmation file created with all requirements'
      ]
    },
    AUDIT_INVENTORY: {
      minimumRequirements: {
        // Audit requirements
        responsibilitiesIdentified: true,
        architecturalPrinciplesAnalyzed: true,
        dependenciesMapped: true,
        targetFileRead: true,
        // Inventory requirements
        changesIdentified: 10,
        categoriesAssigned: true,
        // Combined output files
        outputFilesCreated: 2
      },
      blockingMessages: [
        '⛔ Target file has not been read completely',
        '⛔ Audit analysis incomplete',
        '⛔ Insufficient changes cataloged (minimum 10)',
        '⛔ Required output files not created'
      ],
      expectedFiles: [
        'structured-workflow/{task-name}/01-audit-analysis.md',
        'structured-workflow/{task-name}/01-inventory-changes.json'
      ],
      selfCheckQuestions: [
        'Have I read the target file completely?',
        'Have I documented all distinct responsibilities and concerns?',
        'Have I analyzed architectural principles?',
        'Have I included dependency mapping in the audit?',
        'Have I cataloged at least 10 specific changes?',
        'Have I categorized changes as must-have or nice-to-have?',
        'Have I created both required output files?'
      ],
      completionCriteria: [
        'Target file read and understood',
        'Comprehensive audit analysis documented',
        'Minimum 10 changes cataloged with categories',
        'Both output files generated with required content'
      ],
      cannotProceedUntil: [
        'All validation criteria met',
        'Required files created',
        'Self-check questions answered positively'
      ]
    },

    WRITE_OR_REFACTOR: {
      minimumRequirements: {
        filesModified: true,
        changesDocumented: true,
        planFollowed: true,
        safetyRuleObserved: true,
        outputFilesCreated: 2
      },
      blockingMessages: [
        '⛔ Files not read before modification (SAFETY VIOLATION)',
        '⛔ Changes not documented comprehensively',
        '⛔ Implementation plan not followed',
        '⛔ Required documentation not created'
      ],
      expectedFiles: [
        `${outputDir}/03-write-progress.md`,
        `${outputDir}/03-write-changes.json`
      ],
      selfCheckQuestions: [
        'Have I read all files before modifying them?',
        'Have I implemented the planned changes?',
        'Have I documented all modifications?',
        'Have I created required output files?'
      ],
      completionCriteria: [
        'All planned changes implemented',
        'Safety rules followed',
        'Changes documented',
        'Output files created'
      ],
      cannotProceedUntil: [
        'Implementation complete',
        'Safety compliance verified',
        'Documentation complete'
      ]
    },

    TEST: {
      minimumRequirements: {
        testsExecuted: true,
        resultsDocumented: true,
        commandsRecorded: true,
        outputFilesCreated: 2
      },
      blockingMessages: [
        '⛔ Test suite not executed',
        '⛔ Test results not documented',
        '⛔ Test commands not recorded',
        '⛔ Required output files missing'
      ],
      expectedFiles: [
        `${outputDir}/04-test-results.md`,
        `${outputDir}/04-test-metrics.json`
      ],
      selfCheckQuestions: [
        'Have I executed the complete test suite?',
        'Have I documented all test results?',
        'Have I recorded test execution commands?',
        'Have I created required output files?'
      ],
      completionCriteria: [
        'Test suite executed',
        'Results documented',
        'Commands recorded',
        'Output files created'
      ],
      cannotProceedUntil: [
        'Tests completed',
        'Documentation complete',
        'Files created'
      ]
    },

    LINT: {
      minimumRequirements: {
        lintersExecuted: true,
        resultsDocumented: true,
        errorsAnalyzed: true,
        outputFilesCreated: 1
      },
      blockingMessages: [
        '⛔ Linters not executed',
        '⛔ Results not documented',
        '⛔ Errors not analyzed',
        '⛔ Required output file missing'
      ],
      expectedFiles: [
        `${outputDir}/05-lint-results.md`
      ],
      selfCheckQuestions: [
        'Have I run all relevant linters?',
        'Have I documented all results?',
        'Have I analyzed errors and warnings?',
        'Have I created the output file?'
      ],
      completionCriteria: [
        'Linters executed',
        'Results documented',
        'Analysis complete',
        'Output file created'
      ],
      cannotProceedUntil: [
        'Quality checks complete',
        'Documentation complete'
      ]
    },

    // Default criteria for other phases
    COMPARE_ANALYZE: getDefaultValidationCriteria(outputDir),
    QUESTION_DETERMINE: getDefaultValidationCriteria(outputDir),
    ITERATE: getDefaultValidationCriteria(outputDir),
    PRESENT: getDefaultValidationCriteria(outputDir),
    PLANNING: getDefaultValidationCriteria(outputDir),
    USER_INPUT_REQUIRED: getDefaultValidationCriteria(outputDir)
  };

  return phaseValidationMap[phase] || getDefaultValidationCriteria(outputDir);
}

function getDefaultValidationCriteria(_outputDir: string): ValidationCriteria {
  return {
    minimumRequirements: {
      workCompleted: true,
      documented: true
    },
    blockingMessages: [
      '⛔ Phase work not completed',
      '⛔ Phase not documented'
    ],
    expectedFiles: [],
    selfCheckQuestions: [
      'Have I completed the required phase work?',
      'Have I documented the phase results?'
    ],
    completionCriteria: [
      'Phase work completed',
      'Results documented'
    ],
    cannotProceedUntil: [
      'All requirements met'
    ]
  };
}

function performPhaseValidation(
  _phase: Phase, 
  completedWork: any, 
  createdFiles: string[], 
  criteria: ValidationCriteria
): {
  isComplete: boolean;
  passed: string[];
  failed: string[];
  blockingMessages: string[];
  nextSteps: string[];
} {
  const passed: string[] = [];
  const failed: string[] = [];
  const blockingMessages: string[] = [];
  const nextSteps: string[] = [];

  // Check minimum requirements
  Object.entries(criteria.minimumRequirements).forEach(([requirement, expectedValue]) => {
    const actualValue = completedWork[requirement];
    
    if (typeof expectedValue === 'number') {
      if (actualValue >= expectedValue) {
        passed.push(`${requirement}: ${actualValue} (meets minimum ${expectedValue})`);
      } else {
        failed.push(`${requirement}: ${actualValue || 0} (need minimum ${expectedValue})`);
        blockingMessages.push(`⛔ ${requirement} insufficient: need ${expectedValue}, have ${actualValue || 0}`);
      }
    } else if (typeof expectedValue === 'boolean') {
      if (!!actualValue === expectedValue) {
        passed.push(`${requirement}: completed`);
      } else {
        failed.push(`${requirement}: not completed`);
        blockingMessages.push(`⛔ ${requirement} not completed`);
      }
    }
  });

  // Check expected files
  criteria.expectedFiles.forEach(expectedFile => {
    if (createdFiles.includes(expectedFile)) {
      passed.push(`File created: ${expectedFile}`);
    } else {
      failed.push(`Missing file: ${expectedFile}`);
      blockingMessages.push(`⛔ Required file not created: ${expectedFile}`);
      nextSteps.push(`Create file: ${expectedFile}`);
    }
  });

  // Add criteria-specific blocking messages if validation failed
  if (failed.length > 0) {
    blockingMessages.push(...criteria.blockingMessages);
    nextSteps.push('Review self-check questions');
    nextSteps.push('Complete failed requirements');
    nextSteps.push('Re-run validation');
  }

  return {
    isComplete: failed.length === 0,
    passed,
    failed,
    blockingMessages: [...new Set(blockingMessages)], // Remove duplicates
    nextSteps: [...new Set(nextSteps)] // Remove duplicates
  };
}

function getNextPhaseRecommendation(currentPhase: Phase, session: any): string {
  const config = session.workflowConfig;
  const selectedPhases = config?.selectedPhases || ['AUDIT_INVENTORY', 'WRITE_OR_REFACTOR', 'TEST', 'LINT', 'PRESENT'];
  
  const currentIndex = selectedPhases.indexOf(currentPhase);
  if (currentIndex === -1 || currentIndex === selectedPhases.length - 1) {
    return 'Workflow complete! Use present_guidance if not already done.';
  }
  
  const nextPhase = selectedPhases[currentIndex + 1];
  return `Use ${nextPhase.toLowerCase()}_guidance to proceed to ${nextPhase} phase`;
}

// Helper function for external validation checks
export function validateFileWasRead(filePath: string, sessionManager: SessionManager): boolean {
  const fileHistory = sessionManager.getFileHistory(filePath);
  return fileHistory.hasBeenRead;
}

// Helper function to check if phase can be skipped based on workflow config
export function canSkipPhase(phase: Phase, sessionManager: SessionManager): boolean {
  const session = sessionManager.getSession();
  if (!session?.workflowConfig) return false;
  
  const selectedPhases = session.workflowConfig.selectedPhases;
  return !selectedPhases.includes(phase);
}