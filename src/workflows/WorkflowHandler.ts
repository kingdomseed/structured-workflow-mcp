import { SessionManager } from '../session/SessionManager';
import { Phase } from '../types';
import { WorkflowType, getWorkflowPreset } from './WorkflowPresets';

export interface WorkflowExecutionParams {
  task: string;
  workflowType: WorkflowType;
  context?: {
    targetFiles?: string[];
    scope?: 'file' | 'directory' | 'project';
    constraints?: string[];
  };
  customPhases?: Phase[];  // Allow override of preset phases
  customIterationLimits?: {
    TEST?: number;
    LINT?: number;
    ITERATE?: number;
  };
}

export async function executeWorkflow(
  params: WorkflowExecutionParams,
  sessionManager: SessionManager
) {
  // Get workflow preset
  const preset = getWorkflowPreset(params.workflowType);
  
  // Use custom phases if provided, otherwise use preset
  const phases = params.customPhases || preset.phases;
  
  // Merge custom iteration limits with preset
  const iterationLimits = {
    ...preset.iterationLimits,
    ...params.customIterationLimits
  };
  
  // Start a new session with workflow type
  const session = sessionManager.startSession(params.task, undefined, params.workflowType);
  
  // Build phase details based on workflow type
  const phaseDetails = buildPhaseDetails(phases, params.workflowType);
  
  return {
    sessionId: session.id,
    task: params.task,
    workflowType: params.workflowType,
    workflowName: preset.name,
    context: params.context || {},
    startedAt: new Date(session.startedAt).toISOString(),
    workflowOverview: {
      totalPhases: phases.length,
      estimatedTotalTime: preset.estimatedDuration,
      philosophy: preset.philosophy,
      corePhilosophy: 'Guide, Don\'t Gate - All your tools remain available throughout the workflow'
    },
    phases: phaseDetails,
    keyBenefits: preset.keyBenefits,
    iterationLimits,
    criticalGuidance: getCriticalGuidance(params.workflowType),
    howToBegin: getHowToBegin(phases[0], params.workflowType),
    availableTools: {
      workflowTools: getWorkflowTools(phases),
      yourTools: 'All your standard tools for file operations, searching, editing, terminal commands, etc. remain fully available'
    },
    reminder: `This is the ${preset.name} - optimized for ${preset.description.toLowerCase()}`
  };
}

function buildPhaseDetails(phases: Phase[], workflowType: WorkflowType) {
  const phaseConfigs = getPhaseConfigurations(workflowType);
  
  return phases.map((phase, index) => {
    const config = phaseConfigs[phase] || getDefaultPhaseConfig(phase);
    const isRepeatedPhase = phases.slice(0, index).includes(phase);
    const suffix = isRepeatedPhase ? ` (Round ${phases.slice(0, index + 1).filter(p => p === phase).length})` : '';
    
    return {
      phase,
      purpose: config.purpose + suffix,
      keyActions: config.keyActions,
      expectedOutput: config.expectedOutput,
      estimatedDuration: config.estimatedDuration,
      guidanceTool: config.guidanceTool
    };
  });
}

function getPhaseConfigurations(workflowType: WorkflowType): Record<string, any> {
  const baseConfigs = {
    SETUP: {
      purpose: 'Initialize workflow environment and establish file organization patterns',
      keyActions: [
        'Verify current working directory',
        'Understand project structure and context',
        'Confirm output directory pattern: structured-workflow/{task-name}/',
        'Acknowledge numbered file naming convention'
      ],
      expectedOutput: {
        workingDirectory: 'Current working directory path',
        projectContext: 'Brief description of the project',
        outputPattern: 'Confirmation of file organization pattern',
        toolsAvailable: 'List of available analysis tools'
      },
      estimatedDuration: '5 minutes',
      guidanceTool: 'setup_guidance'
    },
    PLANNING: {
      purpose: 'Create a comprehensive plan for the task',
      keyActions: [
        'Define clear objectives and success criteria',
        'Identify key components and dependencies',
        'Outline high-level approach'
      ],
      expectedOutput: {
        objectives: 'Clear task objectives',
        approach: 'High-level implementation strategy',
        risks: 'Potential challenges identified'
      },
      estimatedDuration: '5-10 minutes',
      guidanceTool: 'planning_guidance'
    },
    AUDIT_INVENTORY: {
      purpose: 'Thoroughly analyze existing code AND catalog all required changes',
      keyActions: [
        'AUDIT: Use file reading and search tools to examine all relevant code',
        'AUDIT: Map dependencies, understand current implementation, identify issues',
        'INVENTORY: List every file that needs modification',
        'INVENTORY: Specify exact changes needed for each file',
        'INVENTORY: Assess impact, risks, and create priority order'
      ],
      expectedOutput: {
        filesAnalyzed: 'Complete list of files examined',
        dependencies: 'Map of imports and relationships',
        currentImplementation: 'How the code currently works',
        issues: 'Any problems or code smells identified',
        changesList: 'Detailed catalog of all modifications needed',
        impactAnalysis: 'What each change affects',
        risks: 'Potential issues to watch for',
        priorityOrder: 'Suggested implementation sequence'
      },
      estimatedDuration: '10-15 minutes',
      guidanceTool: 'audit_inventory_guidance'
    },
    COMPARE_ANALYZE: {
      purpose: 'Evaluate different implementation approaches',
      keyActions: [
        'Consider multiple implementation strategies',
        'Compare pros and cons of each approach',
        'Select the best approach with justification'
      ],
      expectedOutput: {
        approaches: 'Different ways to implement the task',
        comparison: 'Pros and cons of each approach',
        recommendation: 'Selected approach with reasoning'
      },
      estimatedDuration: '5-10 minutes',
      guidanceTool: 'compare_analyze_guidance'
    },
    QUESTION_DETERMINE: {
      purpose: 'Clarify any ambiguities AND determine final implementation plan',
      keyActions: [
        'QUESTION: Identify unclear requirements or assumptions',
        'QUESTION: Formulate specific questions if needed',
        'QUESTION: Document assumptions being made',
        'DETERMINE: Create step-by-step implementation plan',
        'DETERMINE: Define success criteria and validation points',
        'DETERMINE: Finalize the strategy with all clarifications'
      ],
      expectedOutput: {
        questions: 'Any clarifications needed (if applicable)',
        assumptions: 'What we are assuming if not clarified',
        implementationSteps: 'Ordered list of changes to make',
        successCriteria: 'How to know when done',
        validationPoints: 'When to test and verify'
      },
      estimatedDuration: '5-10 minutes',
      guidanceTool: 'question_determine_guidance'
    },
    WRITE_OR_REFACTOR: (() => {
      if (workflowType === 'test') {
        return {
          purpose: 'Write comprehensive tests',
          keyActions: [
            'Write test cases based on requirements',
            'Cover edge cases and error scenarios',
            'Ensure good test structure and naming'
          ],
          expectedOutput: {
            testsWritten: 'List of test files created/modified',
            testCoverage: 'What functionality is covered',
            testTypes: 'Unit, integration, or e2e tests written'
          },
          estimatedDuration: '15-30 minutes',
          guidanceTool: 'refactor_guidance'
        };
      } else {
        return {
          purpose: 'Implement the planned changes',
          keyActions: [
            'Use your file editing tools to modify code',
            'Follow the implementation plan',
            'Test changes incrementally when possible'
          ],
          expectedOutput: {
            filesModified: 'Complete list of changed files',
            changesDescription: 'What was changed in each file',
            testsRun: 'Any tests executed during implementation'
          },
          estimatedDuration: '10-30 minutes',
          guidanceTool: 'refactor_guidance'
        };
      }
    })(),
    TEST: {
      purpose: 'Run tests to verify functionality',
      keyActions: [
        'Execute all relevant test suites',
        'Document test results and failures',
        'Identify which tests need fixes'
      ],
      expectedOutput: {
        testResults: 'Complete test execution results',
        passingTests: 'Tests that succeeded',
        failingTests: 'Tests that need attention',
        testCoverage: 'Coverage metrics if available'
      },
      estimatedDuration: '5-10 minutes',
      guidanceTool: 'test_guidance'
    },
    LINT: {
      purpose: 'Verify code quality and correctness',
      keyActions: [
        'Run all relevant linters and type checkers',
        'Check code style and formatting',
        'Document any issues found'
      ],
      expectedOutput: {
        lintResults: 'Output from linters and type checkers',
        codeQualityIssues: 'Style and quality problems',
        errors: 'Must-fix issues',
        warnings: 'Should-fix issues'
      },
      estimatedDuration: '5 minutes',
      guidanceTool: 'lint_guidance'
    },
    ITERATE: {
      purpose: 'Fix issues from previous phases',
      keyActions: [
        'Address test failures first',
        'Fix linting errors and warnings',
        'Re-run verification after fixes',
        'Document what was fixed'
      ],
      expectedOutput: {
        fixesApplied: 'How each issue was resolved',
        verificationStatus: 'Results after fixes',
        remainingIssues: 'Any issues that could not be fixed'
      },
      estimatedDuration: '5-15 minutes',
      guidanceTool: 'iterate_guidance'
    },
    PRESENT: {
      purpose: 'Summarize the work completed',
      keyActions: [
        'Create comprehensive summary of changes',
        'Document lessons learned',
        'Suggest future improvements'
      ],
      expectedOutput: {
        summary: 'Overview of all changes made',
        metrics: 'Before/after comparisons',
        recommendations: 'Suggestions for future work'
      },
      estimatedDuration: '5 minutes',
      guidanceTool: 'present_guidance'
    }
  };

  // Customize for TDD workflow
  if (workflowType === 'tdd') {
    baseConfigs.WRITE_OR_REFACTOR = {
      purpose: 'Write failing test / Write implementation / Refactor',
      keyActions: [
        'First pass: Write a failing test',
        'Second pass: Write minimal implementation to pass',
        'Third pass: Refactor for quality (optional)'
      ],
      expectedOutput: {
        filesModified: 'Test and implementation files modified',
        changesDescription: 'TDD cycle changes (test → code → refactor)',
        testsRun: 'Red/Green status of test runs'
      },
      estimatedDuration: '10-20 minutes per cycle',
      guidanceTool: 'refactor_guidance'
    };
  }

  return baseConfigs;
}

function getDefaultPhaseConfig(phase: Phase) {
  return {
    purpose: `Complete the ${phase} phase`,
    keyActions: [`Follow standard ${phase} procedures`],
    expectedOutput: { completed: `${phase} phase completed` },
    estimatedDuration: '5-10 minutes',
    guidanceTool: `${phase.toLowerCase()}_guidance`
  };
}

function getCriticalGuidance(workflowType: WorkflowType): string[] {
  const common = [
    'IMPORTANT: You must read files before modifying them (enforced for safety)',
    'All your existing tools remain available - use them based on phase guidance',
    'Use workflow_status to check progress at any time',
    'Each phase builds on previous phases - follow the sequence for best results'
  ];

  const specific: Record<WorkflowType, string[]> = {
    refactor: [
      'Focus on understanding before changing - the audit phase is critical',
      'Preserve existing functionality while improving code structure'
    ],
    feature: [
      'Ensure new functionality integrates well with existing code',
      'Write tests for all new features'
    ],
    test: [
      'Aim for comprehensive coverage of critical paths',
      'Consider edge cases and error scenarios'
    ],
    tdd: [
      'Always write the test first - it should fail initially',
      'Write minimal code to make the test pass',
      'Refactor only after tests are green'
    ]
  };

  return [...common, ...specific[workflowType]];
}

function getHowToBegin(firstPhase: Phase, workflowType: WorkflowType): string[] {
  const phaseGuidance = `${firstPhase.toLowerCase()}_guidance`;
  
  return [
    `1. Review this ${workflowType} workflow plan`,
    `2. Call ${phaseGuidance} to start the ${firstPhase} phase`,
    '3. Use your file reading and search tools as directed by the guidance',
    '4. Call phase_output when you complete each phase to record results'
  ];
}

function getWorkflowTools(phases: Phase[]): string[] {
  const tools: string[] = [];
  const addedTools = new Set<string>();
  
  phases.forEach(phase => {
    const guidanceTool = `${phase.toLowerCase()}_guidance`;
    if (!addedTools.has(guidanceTool)) {
      tools.push(`${guidanceTool} - Guidance for ${phase} phase`);
      addedTools.add(guidanceTool);
    }
  });
  
  // Add common workflow management tools
  tools.push(
    'workflow_status - Check current progress',
    'phase_output - Record phase completion',
    'validate_action - Ensure safety rules'
  );
  
  return tools;
}