import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { generateNextStepSuggestions, formatDuration } from '../utils/helpers';

export function createWorkflowStatusTool(): Tool {
  return {
    name: 'workflow_status',
    description: 'Check current workflow progress and session state',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  };
}

export async function handleWorkflowStatus(sessionManager: SessionManager) {
  const session = sessionManager.getSession();
  
  if (!session) {
    return {
      status: 'No active session',
      message: 'Start a new workflow with plan_workflow tool',
      hint: 'Example: plan_workflow({ task: "Refactor authentication system" })'
    };
  }
  
  const phaseOutputs: Record<string, any> = {};
  session.phaseOutputs.forEach((output, phase) => {
    phaseOutputs[phase] = {
      completedAt: new Date(output.completedAt).toISOString(),
      duration: formatDuration(output.duration),
      output: output.output
    };
  });
  
  const timeElapsed = Date.now() - session.startedAt;
  
  return {
    sessionId: session.id,
    task: session.taskDescription,
    startedAt: new Date(session.startedAt).toISOString(),
    timeElapsed: formatDuration(timeElapsed),
    currentPhase: session.currentPhase,
    completedPhases: session.completedPhases,
    phaseOutputs,
    metrics: {
      filesAnalyzed: session.metrics.filesAnalyzed,
      filesModified: session.metrics.filesModified,
      lintIssuesFound: session.metrics.lintIssuesFound,
      lintIssuesFixed: session.metrics.lintIssuesFixed,
      phasesCompleted: session.completedPhases.length,
      totalPhases: 9 // Total phases in the workflow
    },
    fileOperations: {
      totalFilesTracked: session.fileHistory.size,
      filesRead: Array.from(session.fileHistory.entries())
        .filter(([_, history]) => history.hasBeenRead)
        .map(([file, _]) => file),
      filesModified: Array.from(session.fileHistory.entries())
        .filter(([_, history]) => history.hasBeenModified)
        .map(([file, _]) => file)
    },
    nextSteps: generateNextStepSuggestions(session.completedPhases, session.currentPhase),
    reminder: 'This session data is temporary and will be lost when the MCP connection ends'
  };
}