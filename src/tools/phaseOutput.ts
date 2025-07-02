import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { Phase } from '../types';

export function createPhaseOutputTool(): Tool {
  return {
    name: 'phase_output',
    description: 'Record the output/results when completing a workflow phase',
    inputSchema: {
      type: 'object',
      properties: {
        phase: {
          type: 'string',
          enum: ['AUDIT', 'INVENTORY', 'COMPARE_ANALYZE', 'QUESTION', 
                 'DETERMINE_PLAN', 'WRITE_REFACTOR', 'LINT', 'ITERATE', 'PRESENT'],
          description: 'The phase you are completing'
        },
        output: {
          type: 'object',
          description: 'The results/findings from this phase',
          additionalProperties: true
        }
      },
      required: ['phase', 'output']
    }
  };
}

export async function handlePhaseOutput(
  params: { phase: Phase; output: any },
  sessionManager: SessionManager
) {
  const session = sessionManager.getSession();
  
  if (!session) {
    return {
      error: 'No active session',
      message: 'Start a workflow with plan_workflow first'
    };
  }
  
  // Record the phase output
  sessionManager.recordPhaseOutput(params.phase, params.output);
  
  // Mark phase as completed if not already
  if (!session.completedPhases.includes(params.phase)) {
    session.completedPhases.push(params.phase);
  }
  
  // Update metrics based on phase output
  if (params.phase === 'LINT' && params.output.errors) {
    sessionManager.updateMetrics({
      lintIssuesFound: params.output.errors.length || 0
    });
  }
  
  if (params.phase === 'ITERATE' && params.output.fixesApplied) {
    sessionManager.updateMetrics({
      lintIssuesFixed: params.output.fixesApplied.length || 0
    });
  }
  
  return {
    recorded: true,
    phase: params.phase,
    timestamp: new Date().toISOString(),
    message: `Successfully recorded output for ${params.phase} phase`,
    hint: `Use workflow_status to see overall progress`
  };
}