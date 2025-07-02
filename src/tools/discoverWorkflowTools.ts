import { Tool } from '@modelcontextprotocol/sdk/types.js';

export function createDiscoverWorkflowToolsTool(): Tool {
  return {
    name: 'discover_workflow_tools',
    description: 'List the workflow guidance tools provided by this MCP server',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  };
}

export async function handleDiscoverWorkflowTools() {
  return {
    purpose: 'This MCP server provides workflow guidance tools for structured refactoring',
    corePhilosophy: 'Guide, Don\'t Gate - All your existing tools remain available while we add helpful workflow guidance',
    availableWorkflowTools: [
      {
        name: 'plan_workflow',
        purpose: 'Create a comprehensive refactoring plan',
        whenToUse: 'Start here for any refactoring task',
        example: 'plan_workflow({ task: "Refactor authentication to use JWT" })'
      },
      {
        name: 'audit_guidance',
        purpose: 'Get guidance for the AUDIT phase',
        whenToUse: 'When you need to understand code without modifying it',
        followsPhase: 'PLANNING'
      },
      {
        name: 'inventory_guidance',
        purpose: 'Get guidance for cataloging all needed changes',
        whenToUse: 'After auditing, to list all modifications needed',
        followsPhase: 'AUDIT'
      },
      {
        name: 'compare_analyze_guidance',
        purpose: 'Get help evaluating different approaches',
        whenToUse: 'When considering multiple implementation strategies',
        followsPhase: 'INVENTORY'
      },
      {
        name: 'question_guidance',
        purpose: 'Get guidance for clarifying ambiguities',
        whenToUse: 'Any time you need clarification (optional phase)',
        followsPhase: 'Can be used at any point'
      },
      {
        name: 'determine_plan_guidance',
        purpose: 'Get help finalizing your implementation strategy',
        whenToUse: 'After choosing an approach, to create detailed steps',
        followsPhase: 'COMPARE_ANALYZE'
      },
      {
        name: 'refactor_guidance',
        purpose: 'Get guidance for implementing changes',
        whenToUse: 'When ready to modify code',
        followsPhase: 'DETERMINE_PLAN'
      },
      {
        name: 'lint_guidance',
        purpose: 'Get instructions for verifying code quality',
        whenToUse: 'After making changes, to check for issues',
        followsPhase: 'WRITE_REFACTOR'
      },
      {
        name: 'iterate_guidance',
        purpose: 'Get help fixing issues found during linting',
        whenToUse: 'When lint phase finds problems',
        followsPhase: 'LINT'
      },
      {
        name: 'present_guidance',
        purpose: 'Get help summarizing your refactoring work',
        whenToUse: 'At the end, to create a comprehensive summary',
        followsPhase: 'ITERATE or LINT (if no issues)'
      },
      {
        name: 'workflow_status',
        purpose: 'Check your current progress',
        whenToUse: 'Any time you want to see session state and metrics'
      },
      {
        name: 'phase_output',
        purpose: 'Record results when completing a phase',
        whenToUse: 'At the end of each phase to track your outputs'
      },
      {
        name: 'validate_action',
        purpose: 'Check if an action follows safety rules',
        whenToUse: 'Automatically called when you try to modify files'
      },
      {
        name: 'discover_workflow_tools',
        purpose: 'See this list of available workflow tools',
        whenToUse: 'When you need a reminder of available tools'
      }
    ],
    guidance: {
      builtInTools: 'You already have access to all your standard tools for file operations, searching, terminal commands, etc.',
      howToUse: 'Use your built-in tools based on our phase guidance. For example, when audit_guidance suggests "read files", use your standard file reading tools.',
      bestPractices: [
        'Start with plan_workflow to understand the full scope',
        'Follow phase guidance but adapt to your specific situation',
        'Combine your built-in tools with our guidance for best results',
        'Use workflow_status to track progress',
        'Record phase outputs to maintain a clear trail of your work'
      ]
    },
    safetyRule: {
      rule: 'Files must be read before they can be modified',
      enforcement: 'The validate_action tool enforces this automatically',
      reason: 'Prevents accidental data loss and ensures informed changes'
    }
  };
}