import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { PhaseGuidance } from '../types';

export function createPhaseGuidanceTools(): Tool[] {
  const phaseTools: Tool[] = [
    {
      name: 'audit_guidance',
      description: 'Get guidance for the AUDIT phase - what to do and how to approach it',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'inventory_guidance',
      description: 'Get guidance for the INVENTORY phase - cataloging all needed changes',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'compare_analyze_guidance',
      description: 'Get guidance for the COMPARE/ANALYZE phase - evaluating approaches',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'question_guidance',
      description: 'Get guidance for the QUESTION phase - clarifying ambiguities',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'determine_plan_guidance',
      description: 'Get guidance for the DETERMINE/PLAN phase - finalizing strategy',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'refactor_guidance',
      description: 'Get guidance for the WRITE/REFACTOR phase - implementing changes',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'lint_guidance',
      description: 'Get guidance for the LINT phase - verifying code quality',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'iterate_guidance',
      description: 'Get guidance for the ITERATE phase - fixing issues',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'present_guidance',
      description: 'Get guidance for the PRESENT phase - summarizing work',
      inputSchema: { type: 'object', properties: {} }
    }
  ];

  return phaseTools;
}

export async function handlePhaseGuidance(
  phaseName: string,
  sessionManager: SessionManager
): Promise<PhaseGuidance> {
  const session = sessionManager.getSession();
  
  const phaseGuidanceMap: Record<string, PhaseGuidance> = {
    audit_guidance: {
      phase: 'AUDIT',
      objective: 'Understand the codebase without making changes',
      instructions: [
        'Use your file reading tools to examine all relevant code',
        'Use your search tools to find patterns, dependencies, and references',
        'Use any code analysis tools you have available',
        'Document your findings for use in later phases',
        'DO NOT modify any files during this phase'
      ],
      suggestedApproach: [
        'Start by reading the main files mentioned in the task',
        'Search for all references to key functions or classes',
        'Trace the flow of data through the system',
        'Identify dependencies and potential impact areas',
        'Note any code quality issues or improvement opportunities'
      ],
      importantNotes: [
        'Focus on understanding, not fixing',
        'The better your audit, the smoother the refactoring',
        'Take notes - you\'ll need them in the INVENTORY phase'
      ],
      expectedOutput: {
        filesAnalyzed: 'List of all files you examined',
        dependencies: 'Map of dependencies and imports',
        currentFlow: 'How the current implementation works',
        issues: 'Any problems or code smells identified',
        insights: 'Key observations about the code structure'
      },
      nextPhase: 'After completing your audit, use inventory_guidance'
    },
    
    inventory_guidance: {
      phase: 'INVENTORY',
      objective: 'Create a comprehensive list of all changes needed',
      instructions: [
        'Review your findings from the AUDIT phase',
        'List every file that needs to be modified',
        'For each file, specify exactly what changes are needed',
        'Identify the order in which changes should be made',
        'Consider dependencies between changes'
      ],
      suggestedApproach: [
        'Group related changes together',
        'Start with changes that have no dependencies',
        'Identify changes that might have cascading effects',
        'Consider what could break and plan accordingly',
        'Think about how to validate each change'
      ],
      expectedOutput: {
        changesList: 'Detailed list of all modifications needed',
        fileToChangesMap: 'Map of files to specific changes',
        dependencies: 'Which changes depend on others',
        risks: 'Potential issues or breaking changes',
        priority: 'Suggested order of implementation'
      },
      nextPhase: 'Use compare_analyze_guidance to evaluate approaches'
    },
    
    compare_analyze_guidance: {
      phase: 'COMPARE_ANALYZE',
      objective: 'Evaluate different ways to implement the refactoring',
      instructions: [
        'Consider at least 2-3 different approaches',
        'Think about trade-offs for each approach',
        'Consider factors like complexity, risk, and maintainability',
        'Choose the approach that best fits the requirements',
        'Document why you chose your approach'
      ],
      suggestedApproach: [
        'Start with the simplest approach that could work',
        'Consider a more comprehensive approach',
        'Think about edge cases and error handling',
        'Evaluate performance implications if relevant',
        'Consider future extensibility'
      ],
      expectedOutput: {
        approaches: 'Description of each approach considered',
        prosAndCons: 'Advantages and disadvantages of each',
        recommendation: 'Your chosen approach',
        justification: 'Why this approach is best',
        alternativesIfNeeded: 'Fallback options if issues arise'
      },
      nextPhase: 'Use determine_plan_guidance to finalize your strategy'
    },
    
    question_guidance: {
      phase: 'QUESTION',
      objective: 'Identify and document any clarifications needed',
      instructions: [
        'Review your understanding so far',
        'Identify any ambiguous requirements',
        'Formulate specific, answerable questions',
        'Consider what assumptions you\'re making',
        'Document questions even if you can\'t get answers immediately'
      ],
      suggestedApproach: [
        'Be specific - vague questions get vague answers',
        'Prioritize questions that block progress',
        'Think about edge cases that need clarification',
        'Consider business logic that might not be obvious',
        'Document your assumptions clearly'
      ],
      expectedOutput: {
        questions: 'List of specific questions',
        assumptions: 'What you\'re assuming if not clarified',
        impact: 'How answers would affect your approach',
        priority: 'Which questions are most critical'
      },
      nextPhase: 'Return to your previous phase or continue to determine_plan_guidance'
    },
    
    determine_plan_guidance: {
      phase: 'DETERMINE_PLAN',
      objective: 'Create a detailed, step-by-step implementation plan',
      instructions: [
        'Break down your chosen approach into specific steps',
        'Order the steps logically based on dependencies',
        'Define clear success criteria for each step',
        'Plan validation points throughout the implementation',
        'Consider rollback strategies if needed'
      ],
      suggestedApproach: [
        'Start with the foundation changes',
        'Build up incrementally',
        'Plan to test after each major change',
        'Keep steps small and focused',
        'Include verification in your plan'
      ],
      expectedOutput: {
        steps: 'Numbered list of implementation steps',
        dependencies: 'Which steps depend on others',
        validation: 'How to verify each step',
        successCriteria: 'Definition of completion',
        rollbackPlan: 'How to undo changes if needed'
      },
      nextPhase: 'Use refactor_guidance to begin implementation'
    },
    
    refactor_guidance: {
      phase: 'WRITE_REFACTOR',
      objective: 'Implement the planned changes',
      instructions: [
        'Follow your implementation plan from DETERMINE_PLAN',
        'Use your file editing tools to make changes',
        'Remember: you must read files before modifying them',
        'Make changes incrementally',
        'Test frequently if possible',
        'Keep track of what you\'ve changed'
      ],
      suggestedApproach: [
        'Start with one logical unit of change',
        'Verify it works before moving on',
        'Make related changes together',
        'Use version control effectively',
        'Comment on any non-obvious changes'
      ],
      importantNotes: [
        'If you haven\'t read a file yet, read it first',
        'Don\'t try to change everything at once',
        'Keep a list of files you\'ve modified'
      ],
      expectedOutput: {
        filesModified: 'Complete list of changed files',
        changesPerFile: 'Summary of changes in each file',
        testsRun: 'Any tests executed during refactoring',
        issues: 'Any problems encountered',
        deviations: 'Any changes from the original plan'
      },
      nextPhase: 'Use lint_guidance to verify your changes',
      prerequisites: {
        completed: ['AUDIT', 'DETERMINE_PLAN'],
        warning: session && !session.completedPhases.includes('AUDIT') 
          ? 'Consider completing AUDIT phase first to avoid unexpected issues' 
          : null
      }
    },
    
    lint_guidance: {
      phase: 'LINT',
      objective: 'Verify code quality and catch any issues',
      instructions: [
        'Run all relevant linters for your language/framework',
        'Run type checkers if using a typed language',
        'Execute any available test suites',
        'Check for common issues like unused imports',
        'Document all issues found'
      ],
      suggestedApproach: [
        'Start with syntax and type checking',
        'Then run style/formatting linters',
        'Run tests if available',
        'Check for security issues if relevant',
        'Prioritize errors over warnings'
      ],
      expectedOutput: {
        lintResults: 'Output from all linters run',
        errors: 'List of errors that must be fixed',
        warnings: 'List of warnings to consider',
        testResults: 'Results from any tests run',
        metrics: 'Code quality metrics if available'
      },
      nextPhase: 'If issues found, use iterate_guidance. Otherwise, use present_guidance'
    },
    
    iterate_guidance: {
      phase: 'ITERATE',
      objective: 'Fix issues discovered during the LINT phase',
      instructions: [
        'Address errors first, then warnings',
        'Fix one issue at a time',
        'Re-run linters after each fix',
        'Don\'t introduce new issues while fixing',
        'Document what you changed and why'
      ],
      suggestedApproach: [
        'Start with syntax/type errors',
        'Then fix logical errors',
        'Address style issues last',
        'Test after each significant fix',
        'Consider if the fix reveals a design issue'
      ],
      expectedOutput: {
        fixesApplied: 'List of all fixes made',
        fixDescription: 'What each fix addressed',
        remainingIssues: 'Any issues you couldn\'t fix',
        verificationStatus: 'Results after fixes',
        lessonsLearned: 'Insights from the issues found'
      },
      nextPhase: 'Re-run lint_guidance or proceed to present_guidance when clean'
    },
    
    present_guidance: {
      phase: 'PRESENT',
      objective: 'Create a comprehensive summary of your refactoring work',
      instructions: [
        'Summarize what was refactored and why',
        'List all files that were modified',
        'Highlight key improvements made',
        'Document any remaining issues or future work',
        'Provide metrics on the refactoring'
      ],
      suggestedApproach: [
        'Start with a high-level summary',
        'Then provide specific details',
        'Include before/after comparisons if relevant',
        'Mention any challenges overcome',
        'Suggest next steps or future improvements'
      ],
      expectedOutput: {
        executiveSummary: 'Brief overview of the refactoring',
        detailedChanges: 'Comprehensive list of modifications',
        improvements: 'Benefits achieved by the refactoring',
        metrics: 'Quantifiable improvements (if any)',
        recommendations: 'Suggestions for future work'
      },
      nextPhase: 'Workflow complete! Use workflow_status to see final metrics'
    }
  };

  const guidance = phaseGuidanceMap[phaseName];
  if (!guidance) {
    throw new Error(`Unknown phase guidance: ${phaseName}`);
  }

  // Update session phase if we have an active session
  if (session && phaseName !== 'question_guidance') {
    sessionManager.updatePhase(guidance.phase);
  }

  return guidance;
}