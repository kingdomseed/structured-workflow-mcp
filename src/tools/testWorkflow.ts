import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { executeWorkflow } from '../workflows/WorkflowHandler';

export function createTestWorkflowTool(): Tool {
  return {
    name: 'test_workflow',
    description: 'Start a focused workflow for writing or improving test coverage',
    inputSchema: {
      type: 'object',
      properties: {
        task: {
          type: 'string',
          description: 'Description of what to test or test coverage to add'
        },
        context: {
          type: 'object',
          description: 'Additional context (optional)',
          properties: {
            targetFiles: { 
              type: 'array', 
              items: { type: 'string' },
              description: 'Files that need test coverage'
            },
            testType: { 
              type: 'string', 
              enum: ['unit', 'integration', 'e2e', 'all'],
              description: 'Type of tests to write'
            },
            testFramework: { 
              type: 'string',
              description: 'Testing framework being used (e.g., jest, mocha, pytest)'
            },
            coverageGoals: { 
              type: 'array', 
              items: { type: 'string' },
              description: 'Specific coverage goals or scenarios to test'
            }
          }
        }
      },
      required: ['task']
    }
  };
}

export async function handleTestWorkflow(
  params: { task: string; context?: any },
  sessionManager: SessionManager
) {
  return executeWorkflow(
    {
      task: params.task,
      workflowType: 'test',
      context: params.context
    },
    sessionManager
  );
}