import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { executeWorkflow } from '../workflows/WorkflowHandler';

export function createTddWorkflowTool(): Tool {
  return {
    name: 'tdd_workflow',
    description: 'Start a Test-Driven Development workflow with Red-Green-Refactor cycles',
    inputSchema: {
      type: 'object',
      properties: {
        task: {
          type: 'string',
          description: 'Description of the feature to develop using TDD'
        },
        context: {
          type: 'object',
          description: 'Additional context (optional)',
          properties: {
            targetFiles: { 
              type: 'array', 
              items: { type: 'string' },
              description: 'Files where tests and implementation will be added'
            },
            testFirst: { 
              type: 'boolean',
              default: true,
              description: 'Always write the test first (TDD principle)'
            },
            acceptanceCriteria: { 
              type: 'array', 
              items: { type: 'string' },
              description: 'Clear acceptance criteria for the feature'
            },
            testFramework: { 
              type: 'string',
              description: 'Testing framework to use'
            }
          }
        }
      },
      required: ['task']
    }
  };
}

export async function handleTddWorkflow(
  params: { task: string; context?: any },
  sessionManager: SessionManager
) {
  return executeWorkflow(
    {
      task: params.task,
      workflowType: 'tdd',
      context: params.context
    },
    sessionManager
  );
}