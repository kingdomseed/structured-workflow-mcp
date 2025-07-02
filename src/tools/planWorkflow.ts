import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { Phase } from '../types';

export function createPlanWorkflowTool(): Tool {
  return {
    name: 'plan_workflow',
    description: 'Create a comprehensive plan for your refactoring task using the structured workflow phases',
    inputSchema: {
      type: 'object',
      properties: {
        task: {
          type: 'string',
          description: 'Description of the refactoring task'
        },
        context: {
          type: 'object',
          description: 'Additional context (optional)',
          properties: {
            targetFiles: { 
              type: 'array', 
              items: { type: 'string' },
              description: 'Specific files to be refactored'
            },
            scope: { 
              type: 'string', 
              enum: ['file', 'directory', 'project'],
              description: 'The scope of the refactoring'
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
  
  const phases: Array<{
    phase: Phase;
    purpose: string;
    keyActions: string[];
    expectedOutput: Record<string, string>;
    estimatedDuration: string;
    guidanceTool: string;
  }> = [
    {
      phase: 'AUDIT',
      purpose: 'Read and analyze code without modifications',
      keyActions: [
        'Use your file reading tools to examine all relevant code',
        'Use your search tools to find patterns and dependencies',
        'Document findings without making any changes'
      ],
      expectedOutput: {
        filesAnalyzed: 'List of all files examined',
        dependencies: 'Map of imports and relationships',
        currentImplementation: 'How the code currently works',
        issues: 'Any problems or code smells identified'
      },
      estimatedDuration: '5-10 minutes',
      guidanceTool: 'audit_guidance'
    },
    {
      phase: 'INVENTORY',
      purpose: 'Catalog all changes needed',
      keyActions: [
        'List every file that needs modification',
        'Identify specific changes for each file',
        'Assess impact and risks'
      ],
      expectedOutput: {
        changesList: 'Detailed list of all modifications',
        impactAnalysis: 'What each change affects',
        risks: 'Potential issues to watch for',
        priorityOrder: 'Suggested implementation sequence'
      },
      estimatedDuration: '5 minutes',
      guidanceTool: 'inventory_guidance'
    },
    {
      phase: 'COMPARE_ANALYZE',
      purpose: 'Evaluate different refactoring approaches',
      keyActions: [
        'Consider multiple implementation strategies',
        'Compare pros and cons of each approach',
        'Select the best approach with justification'
      ],
      expectedOutput: {
        approaches: 'Different ways to implement the refactoring',
        comparison: 'Pros and cons of each approach',
        recommendation: 'Selected approach with reasoning'
      },
      estimatedDuration: '5-10 minutes',
      guidanceTool: 'compare_analyze_guidance'
    },
    {
      phase: 'DETERMINE_PLAN',
      purpose: 'Finalize implementation strategy',
      keyActions: [
        'Create step-by-step implementation plan',
        'Define success criteria',
        'Identify checkpoints and validation steps'
      ],
      expectedOutput: {
        implementationSteps: 'Ordered list of changes to make',
        successCriteria: 'How to know when done',
        validationPoints: 'When to test and verify'
      },
      estimatedDuration: '5 minutes',
      guidanceTool: 'determine_plan_guidance'
    },
    {
      phase: 'WRITE_REFACTOR',
      purpose: 'Implement the planned changes',
      keyActions: [
        'Use your file editing tools to modify code',
        'Follow the implementation plan',
        'Test changes incrementally'
      ],
      expectedOutput: {
        filesModified: 'Complete list of changed files',
        changesDescription: 'What was changed in each file',
        testsRun: 'Any tests executed during refactoring'
      },
      estimatedDuration: '10-30 minutes',
      guidanceTool: 'refactor_guidance'
    },
    {
      phase: 'LINT',
      purpose: 'Verify code quality and correctness',
      keyActions: [
        'Run all relevant linters and type checkers',
        'Execute test suites if available',
        'Document any issues found'
      ],
      expectedOutput: {
        lintResults: 'Output from linters and type checkers',
        testResults: 'Test execution results',
        issuesFound: 'List of problems to fix'
      },
      estimatedDuration: '5 minutes',
      guidanceTool: 'lint_guidance'
    },
    {
      phase: 'ITERATE',
      purpose: 'Fix issues from LINT phase',
      keyActions: [
        'Address each issue systematically',
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
      purpose: 'Summarize the refactoring work',
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

  const optionalPhase = {
    phase: 'QUESTION' as Phase,
    purpose: 'Clarify ambiguities when needed',
    keyActions: [
      'Identify unclear requirements',
      'Formulate specific questions',
      'Document assumptions if answers unavailable'
    ],
    expectedOutput: {
      questions: 'Specific clarifications needed',
      assumptions: 'What we are assuming if not clarified'
    },
    estimatedDuration: '2-5 minutes',
    guidanceTool: 'question_guidance',
    note: 'This phase can be inserted at any point when clarification is needed'
  };

  return {
    sessionId: session.id,
    task: params.task,
    context: params.context || {},
    startedAt: new Date(session.startedAt).toISOString(),
    workflowOverview: {
      totalPhases: phases.length,
      estimatedTotalTime: '45-90 minutes',
      corePhilosophy: 'Guide, Don\'t Gate - All your tools remain available throughout the workflow'
    },
    phases,
    optionalPhase,
    criticalGuidance: [
      'IMPORTANT: You must read files before modifying them (enforced for safety)',
      'All your existing tools remain available - use them based on phase guidance',
      'Start with audit_guidance after this planning phase',
      'Use workflow_status to check progress at any time',
      'Each phase builds on previous phases - follow the sequence for best results'
    ],
    howToBegin: [
      '1. Review this plan to understand the full workflow',
      '2. Call audit_guidance to start the AUDIT phase',
      '3. Use your file reading and search tools as directed by the guidance',
      '4. Call phase_output when you complete each phase to record results'
    ],
    availableTools: {
      workflowTools: [
        'audit_guidance - Guidance for code analysis phase',
        'inventory_guidance - Help cataloging changes',
        'compare_analyze_guidance - Assistance evaluating approaches',
        'question_guidance - When clarification is needed',
        'determine_plan_guidance - Finalize your strategy',
        'refactor_guidance - Implementation guidance',
        'lint_guidance - Verification instructions',
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