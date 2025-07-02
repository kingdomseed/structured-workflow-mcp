import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { ValidationResult } from '../types';
import { isModificationAction } from '../utils/helpers';

export function createValidationTool(): Tool {
  return {
    name: 'validate_action',
    description: 'Check if an action follows critical safety rules',
    inputSchema: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          description: 'The action you want to take'
        },
        targetFile: {
          type: 'string',
          description: 'The file you want to act on'
        }
      },
      required: ['action', 'targetFile']
    }
  };
}

export async function handleValidateAction(
  params: { action: string; targetFile: string },
  sessionManager: SessionManager
): Promise<ValidationResult> {
  const session = sessionManager.getSession();
  const fileHistory = sessionManager.getFileHistory(params.targetFile);
  
  // Only enforce the critical "read before write" rule
  if (isModificationAction(params.action) && !fileHistory.hasBeenRead) {
    return {
      allowed: false,
      error: 'SAFETY VIOLATION: Cannot modify a file before reading it',
      reason: 'This prevents accidental data loss and ensures informed changes',
      resolution: `First read the file "${params.targetFile}" using any file reading tool, then you can modify it`
    };
  }
  
  // Track file reads and modifications
  if (params.action.toLowerCase().includes('read')) {
    sessionManager.recordFileRead(params.targetFile);
  } else if (isModificationAction(params.action)) {
    sessionManager.recordFileModification(params.targetFile);
  }
  
  // All other actions are allowed
  return {
    allowed: true,
    currentPhase: session?.currentPhase,
    reminder: session 
      ? `You're in ${session.currentPhase} phase. Check ${session.currentPhase.toLowerCase()}_guidance for recommendations.`
      : 'No active session. Consider starting with plan_workflow.'
  };
}