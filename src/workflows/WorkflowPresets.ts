import { Phase } from '../types';

export type WorkflowType = 'refactor' | 'feature' | 'test' | 'tdd';

export interface WorkflowPreset {
  name: string;
  description: string;
  type: WorkflowType;
  phases: Phase[];
  iterationLimits: {
    TEST: number;
    LINT: number;
    ITERATE: number;
  };
  estimatedDuration: string;
  philosophy: string;
  keyBenefits: string[];
  when_to_use: string[];
}

export const WORKFLOW_PRESETS: Record<WorkflowType, WorkflowPreset> = {
  refactor: {
    name: 'Refactoring Workflow',
    description: 'Systematic approach to improving existing code without changing functionality',
    type: 'refactor',
    phases: [
      'SETUP',
      'AUDIT_INVENTORY',
      'COMPARE_ANALYZE', 
      'QUESTION_DETERMINE',
      'WRITE_OR_REFACTOR',
      'LINT',
      'ITERATE',
      'PRESENT'
    ],
    iterationLimits: {
      TEST: 0,  // No test phase in refactor workflow
      LINT: 15, // Higher for fixing existing code issues
      ITERATE: 20
    },
    estimatedDuration: '45-75 minutes',
    philosophy: 'Understand deeply, change carefully, verify thoroughly',
    keyBenefits: [
      'Comprehensive code analysis before changes',
      'Multiple approach evaluation',
      'Focus on code quality and maintainability'
    ],
    when_to_use: [
      'Improving code structure or design',
      'Extracting reusable components',
      'Applying design patterns',
      'Removing code smells'
    ]
  },

  feature: {
    name: 'Feature Creation Workflow',
    description: 'Structured approach to adding new functionality with testing',
    type: 'feature',
    phases: [
      'SETUP',
      'PLANNING',
      'QUESTION_DETERMINE',
      'WRITE_OR_REFACTOR',
      'TEST',
      'LINT',
      'ITERATE',
      'PRESENT'
    ],
    iterationLimits: {
      TEST: 10,  // More test iterations for new features
      LINT: 10,
      ITERATE: 15
    },
    estimatedDuration: '60-90 minutes',
    philosophy: 'Plan thoroughly, implement cleanly, test completely',
    keyBenefits: [
      'Clear planning before implementation',
      'Integrated testing for new functionality',
      'Quality assurance built-in'
    ],
    when_to_use: [
      'Adding new functionality',
      'Implementing new API endpoints',
      'Creating new UI components',
      'Building new modules or services'
    ]
  },

  test: {
    name: 'Test Writing Workflow',
    description: 'Focused workflow for creating or improving test coverage',
    type: 'test',
    phases: [
      'SETUP',
      'AUDIT_INVENTORY',  // Understand what needs testing
      'QUESTION_DETERMINE',  // Plan test strategy
      'WRITE_OR_REFACTOR',  // Write tests (writing tests)
      'TEST',  // Run tests
      'ITERATE',  // Fix failing tests
      'PRESENT'
    ],
    iterationLimits: {
      TEST: 15,  // High test iterations for test development
      LINT: 5,   // Lower lint iterations for test code
      ITERATE: 20
    },
    estimatedDuration: '30-60 minutes',
    philosophy: 'Understand behavior, test thoroughly, iterate until green',
    keyBenefits: [
      'Focused on test coverage improvement',
      'Systematic test case development',
      'Emphasis on test quality and completeness'
    ],
    when_to_use: [
      'Adding missing test coverage',
      'Writing tests for legacy code',
      'Creating integration tests',
      'Improving test quality'
    ]
  },

  tdd: {
    name: 'Test-Driven Development Workflow',
    description: 'Red-Green-Refactor cycle for test-first development',
    type: 'tdd',
    phases: [
      'SETUP',
      'PLANNING',
      'WRITE_OR_REFACTOR',  // Write failing test
      'TEST',  // Verify test fails
      'WRITE_OR_REFACTOR',  // Write implementation
      'TEST',  // Verify test passes
      'WRITE_OR_REFACTOR',  // Refactor if needed
      'LINT',
      'PRESENT'
    ],
    iterationLimits: {
      TEST: 20,  // Many test cycles in TDD
      LINT: 10,
      ITERATE: 25  // Higher for red-green-refactor cycles
    },
    estimatedDuration: '60-120 minutes',
    philosophy: 'Test first, implement minimal, refactor for quality',
    keyBenefits: [
      'Tests drive the design',
      'Minimal implementation approach',
      'High confidence in code correctness',
      'Built-in regression protection'
    ],
    when_to_use: [
      'Creating new features from scratch',
      'Working with clear requirements',
      'Building critical business logic',
      'When high test coverage is required'
    ]
  }
};

export function getWorkflowPreset(type: WorkflowType): WorkflowPreset {
  const preset = WORKFLOW_PRESETS[type];
  if (!preset) {
    throw new Error(`Unknown workflow type: ${type}`);
  }
  return preset;
}

export function detectWorkflowType(task: string): WorkflowType | null {
  const taskLower = task.toLowerCase();
  
  // Explicit workflow type mentions
  if (taskLower.includes('refactor')) return 'refactor';
  if (taskLower.includes('tdd') || taskLower.includes('test-driven') || taskLower.includes('test driven')) return 'tdd';
  if (taskLower.includes('test') || taskLower.includes('spec') || taskLower.includes('coverage')) return 'test';
  if (taskLower.includes('feature') || taskLower.includes('add') || taskLower.includes('implement') || taskLower.includes('create')) return 'feature';
  
  // Default to null - let user choose
  return null;
}

export function getPhaseSequenceDescription(phases: Phase[]): string {
  return phases.join(' → ');
}