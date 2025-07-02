import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { executeWorkflow } from '../workflows/WorkflowHandler';

export function createFeatureWorkflowTool(): Tool {
  return {
    name: 'create_feature_workflow',
    description: 'Start a structured workflow for adding new functionality with integrated testing',
    inputSchema: {
      type: 'object',
      properties: {
        task: {
          type: 'string',
          description: 'Description of the feature to create'
        },
        context: {
          type: 'object',
          description: 'Additional context (optional)',
          properties: {
            targetFiles: { 
              type: 'array', 
              items: { type: 'string' },
              description: 'Files where the feature will be added'
            },
            scope: { 
              type: 'string', 
              enum: ['file', 'directory', 'project'],
              description: 'The scope of the feature'
            },
            requirements: { 
              type: 'array', 
              items: { type: 'string' },
              description: 'Feature requirements and acceptance criteria'
            }
          }
        }
      },
      required: ['task']
    }
  };
}

export async function handleCreateFeatureWorkflow(
  params: { task: string; context?: any },
  sessionManager: SessionManager
) {
  return executeWorkflow(
    {
      task: params.task,
      workflowType: 'feature',
      context: params.context
    },
    sessionManager
  );
}