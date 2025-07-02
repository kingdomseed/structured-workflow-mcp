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
    purpose: 'This MCP server provides structured workflow guidance tools for various programming tasks',
    corePhilosophy: 'Guide, Don\'t Gate - All your existing tools remain available while we add helpful workflow guidance',
    
    workflowTypes: {
      title: '🚀 WORKFLOW ENTRY POINTS',
      description: 'Choose the workflow that best matches your task:',
      workflows: [
        {
          name: 'refactor_workflow',
          purpose: 'Systematic code improvement without changing functionality',
          whenToUse: 'Refactoring, code cleanup, applying patterns, removing code smells',
          example: 'refactor_workflow({ task: "Extract authentication into a separate service" })',
          phases: 'AUDIT_INVENTORY → COMPARE_ANALYZE → QUESTION_DETERMINE → WRITE_REFACTOR → LINT → ITERATE → PRESENT',
          keyBenefit: 'Deep understanding before changes'
        },
        {
          name: 'create_feature_workflow',
          purpose: 'Add new functionality with integrated testing',
          whenToUse: 'New features, API endpoints, UI components, modules',
          example: 'create_feature_workflow({ task: "Add user profile management" })',
          phases: 'PLANNING → QUESTION_DETERMINE → WRITE_REFACTOR → TEST → LINT → ITERATE → PRESENT',
          keyBenefit: 'Built-in quality assurance'
        },
        {
          name: 'test_workflow',
          purpose: 'Focused workflow for writing or improving tests',
          whenToUse: 'Adding test coverage, writing integration tests, test improvements',
          example: 'test_workflow({ task: "Add unit tests for payment processing" })',
          phases: 'AUDIT_INVENTORY → QUESTION_DETERMINE → WRITE_TEST → RUN_TEST → ITERATE → PRESENT',
          keyBenefit: 'Systematic test development'
        },
        {
          name: 'tdd_workflow',
          purpose: 'Test-Driven Development with Red-Green-Refactor cycles',
          whenToUse: 'Building features test-first, critical business logic',
          example: 'tdd_workflow({ task: "Implement shopping cart with TDD" })',
          phases: 'PLANNING → WRITE_TEST → RUN_TEST → WRITE_CODE → RUN_TEST → REFACTOR → LINT → PRESENT',
          keyBenefit: 'Tests drive the design'
        },
        {
          name: 'build_custom_workflow',
          purpose: 'Create a custom workflow with your own phase selection',
          whenToUse: 'When predefined workflows don\'t match your needs',
          example: 'build_custom_workflow({ task: "Custom task", selectedPhases: [...] })',
          keyBenefit: 'Full control and flexibility'
        }
      ]
    },
    
    phaseGuidanceTools: {
      title: '📋 PHASE GUIDANCE TOOLS',
      description: 'Tools that guide you through each workflow phase:',
      tools: [
        {
          name: 'audit_inventory_guidance',
          purpose: 'Analyze code and catalog all needed changes',
          phase: 'AUDIT_INVENTORY'
        },
        {
          name: 'compare_analyze_guidance',
          purpose: 'Evaluate different implementation approaches',
          phase: 'COMPARE_ANALYZE'
        },
        {
          name: 'question_determine_guidance',
          purpose: 'Clarify requirements and finalize your plan',
          phase: 'QUESTION_DETERMINE'
        },
        {
          name: 'refactor_guidance',
          purpose: 'Implement changes or write code',
          phase: 'WRITE_REFACTOR'
        },
        {
          name: 'test_guidance',
          purpose: 'Run and verify tests',
          phase: 'TEST'
        },
        {
          name: 'lint_guidance',
          purpose: 'Check code quality and style',
          phase: 'LINT'
        },
        {
          name: 'iterate_guidance',
          purpose: 'Fix issues found in testing or linting',
          phase: 'ITERATE'
        },
        {
          name: 'present_guidance',
          purpose: 'Summarize your work',
          phase: 'PRESENT'
        }
      ]
    },
    
    managementTools: {
      title: '🔧 WORKFLOW MANAGEMENT TOOLS',
      description: 'Tools for tracking and managing your workflow:',
      tools: [
        {
          name: 'workflow_status',
          purpose: 'Check current progress and session state',
          whenToUse: 'Any time you want to see where you are'
        },
        {
          name: 'phase_output',
          purpose: 'Record results when completing a phase',
          whenToUse: 'At the end of each phase'
        },
        {
          name: 'validate_action',
          purpose: 'Ensure actions follow safety rules',
          whenToUse: 'Automatically called for file modifications'
        },
        {
          name: 'validate_phase_completion',
          purpose: 'Check if phase requirements are met',
          whenToUse: 'Before moving to next phase'
        },
        {
          name: 'user_input_required_guidance',
          purpose: 'Handle escalations when limits are reached',
          whenToUse: 'When iteration limits or issues require user input'
        },
        {
          name: 'discover_workflow_tools',
          purpose: 'See this comprehensive tool list',
          whenToUse: 'When you need guidance on available tools'
        }
      ]
    },
    
    quickStart: {
      title: '🎯 QUICK START GUIDE',
      steps: [
        '1. Choose a workflow based on your task type',
        '2. Call the workflow tool with your task description',
        '3. Follow the phase guidance provided',
        '4. Use phase_output to record your progress',
        '5. Check workflow_status anytime to see where you are'
      ],
      example: 'refactor_workflow({ task: "Refactor user authentication to use dependency injection" })'
    },
    
    bestPractices: [
      'Choose the right workflow for your task type',
      'Follow phase guidance but adapt to your specific situation',
      'Record phase outputs to maintain clear documentation',
      'Use workflow_status to track progress',
      'Let the workflow guide you while keeping all your tools available'
    ],
    
    safetyRule: {
      rule: 'Files must be read before they can be modified',
      enforcement: 'The validate_action tool enforces this automatically',
      reason: 'Prevents accidental data loss and ensures informed changes'
    }
  };
}