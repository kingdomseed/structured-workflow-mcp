import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { executeWorkflow } from '../workflows/WorkflowHandler';

export function createRefactorWorkflowTool(): Tool {
  return {
    name: 'refactor_workflow',
    description: 'Start a structured refactoring workflow to improve existing code without changing functionality',
    inputSchema: {
      type: 'object',
      properties: {
        task: {
          type: 'string',
          description: 'Description of what you want to refactor'
        },
        context: {
          type: 'object',
          description: 'Additional context (optional)',
          properties: {
            targetFiles: { 
              type: 'array', 
              items: { type: 'string' },
              description: 'Specific files to refactor'
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

export async function handleRefactorWorkflow(
  params: { task: string; context?: any },
  sessionManager: SessionManager
) {
  return executeWorkflow(
    {
      task: params.task,
      workflowType: 'refactor',
      context: params.context
    },
    sessionManager
  );
}