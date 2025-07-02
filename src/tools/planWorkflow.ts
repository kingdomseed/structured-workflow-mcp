import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { Phase } from '../types';

export function createPlanWorkflowTool(): Tool {
  return {
    name: 'plan_workflow',
    description: 'Create a comprehensive plan for your programming task using the structured workflow phases',
    inputSchema: {
      type: 'object',
      properties: {
        task: {
          type: 'string',
          description: 'Description of the programming task (refactoring, feature creation, bug fix, etc.)'
        },
        context: {
          type: 'object',
          description: 'Additional context (optional)',
          properties: {
            targetFiles: { 
              type: 'array', 
              items: { type: 'string' },
              description: 'Specific files to work with'
            },
            scope: { 
              type: 'string', 
              enum: ['file', 'directory', 'project'],
              description: 'The scope of the task'
            },
            constraints: { 
              type: 'array', 
              items: { type: 'string' },
              description: 'Any constraints or requirements'
            }
          }
        }
      },
      required: ['task']
    }
  };
}

export async function handlePlanWorkflow(
  params: { task: string; context?: any },
  sessionManager: SessionManager
) {
  // Start a new session
  const session = sessionManager.startSession(params.task);
  
  // Detect the type of programming task
  const taskType = detectTaskType(params.task);
  
  const phases: Array<{
    phase: Phase;
    purpose: string;
    keyActions: string[];
    expectedOutput: Record<string, string>;
    estimatedDuration: string;
    guidanceTool: string;
  }> = [
    {
      phase: 'AUDIT_INVENTORY',
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
    {
      phase: 'COMPARE_ANALYZE',
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
    {
      phase: 'QUESTION_DETERMINE',
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
    {
      phase: 'WRITE_REFACTOR',
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
    },
    {
      phase: 'TEST',
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
    {
      phase: 'LINT',
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
    {
      phase: 'ITERATE',
      purpose: 'Fix issues from TEST and LINT phases',
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
    {
      phase: 'PRESENT',
      purpose: 'Summarize the programming work completed',
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
  ];

  return {
    sessionId: session.id,
    task: params.task,
    taskType,
    context: params.context || {},
    startedAt: new Date(session.startedAt).toISOString(),
    workflowOverview: {
      totalPhases: phases.length,
      estimatedTotalTime: '45-90 minutes',
      corePhilosophy: 'Guide, Don\'t Gate - All your tools remain available throughout the workflow'
    },
    phases,
    criticalGuidance: [
      'IMPORTANT: You must read files before modifying them (enforced for safety)',
      'All your existing tools remain available - use them based on phase guidance',
      'Start with audit_inventory_guidance after this planning phase',
      'Use workflow_status to check progress at any time',
      'Each phase builds on previous phases - follow the sequence for best results'
    ],
    howToBegin: [
      '1. Review this plan to understand the full workflow',
      '2. Call audit_inventory_guidance to start the AUDIT_INVENTORY phase',
      '3. Use your file reading and search tools as directed by the guidance',
      '4. Call phase_output when you complete each phase to record results'
    ],
    availableTools: {
      workflowTools: [
        'audit_inventory_guidance - Guidance for analysis and cataloging phase',
        'compare_analyze_guidance - Assistance evaluating approaches',
        'question_determine_guidance - Clarify and finalize your plan',
        'refactor_guidance - Implementation guidance',
        'test_guidance - Testing phase guidance',
        'lint_guidance - Code quality verification',
        'iterate_guidance - Fix issues systematically',
        'present_guidance - Summarize your work',
        'workflow_status - Check current progress',
        'phase_output - Record phase completion',
        'validate_action - Ensure safety rules'
      ],
      yourTools: 'All your standard tools for file operations, searching, editing, terminal commands, etc. remain fully available'
    },
    reminder: 'This is a guidance system - it helps you work more effectively without restricting your capabilities'
  };
}

function detectTaskType(task: string): string {
  const taskLower = task.toLowerCase();
  if (taskLower.includes('refactor')) return 'Refactoring';
  if (taskLower.includes('feature') || taskLower.includes('add') || taskLower.includes('implement')) return 'Feature Creation';
  if (taskLower.includes('bug') || taskLower.includes('fix')) return 'Bug Fix';
  if (taskLower.includes('test')) return 'Test Writing';
  if (taskLower.includes('document') || taskLower.includes('docs')) return 'Documentation';
  if (taskLower.includes('optimize') || taskLower.includes('performance')) return 'Performance Optimization';
  if (taskLower.includes('create') && taskLower.includes('project')) return 'Project Creation';
  return 'General Programming Task';
}

