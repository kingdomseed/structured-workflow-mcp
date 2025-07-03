import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { Phase } from '../types';

export function createPhaseOutputTool(): Tool {
  return {
    name: 'phase_output',
    description: 'Record the output/results when completing a workflow phase - REQUIRES ACTUAL OUTPUT ARTIFACTS (files OR structured JSON)',
    inputSchema: {
      type: 'object',
      properties: {
        phase: {
          type: 'string',
          enum: ['AUDIT_INVENTORY', 'COMPARE_ANALYZE', 'QUESTION_DETERMINE', 
                 'WRITE_OR_REFACTOR', 'TEST', 'LINT', 'ITERATE', 'PRESENT'],
          description: 'The phase you are completing'
        },
        output: {
          type: 'object',
          description: 'The results/findings from this phase',
          additionalProperties: true
        },
        outputArtifacts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'File path if written to disk, OR descriptive identifier for JSON output provided in response'
              },
              format: {
                type: 'string',
                enum: ['markdown', 'json', 'text'],
                description: 'Format of the output'
              },
              description: {
                type: 'string',
                description: 'Brief description of what this artifact contains'
              },
              content: {
                type: 'string',
                description: 'REQUIRED: The actual content/JSON of your output (for validation)'
              }
            },
            required: ['path', 'format', 'description', 'content']
          },
          description: 'MANDATORY: List of actual output artifacts (files OR structured JSON) you created for this phase',
          minItems: 1
        }
      },
      required: ['phase', 'output', 'outputArtifacts']
    }
  };
}

export async function handlePhaseOutput(
  params: { 
    phase: Phase; 
    output: any;
    outputArtifacts: {
      path: string;
      format: 'markdown' | 'json' | 'text';
      description: string;
      content: string;
    }[];
  },
  sessionManager: SessionManager
) {
  const session = sessionManager.getSession();
  
  if (!session) {
    return {
      error: 'No active session',
      message: 'Start a workflow with build_custom_workflow first'
    };
  }
  
  // ENFORCEMENT: Validate output artifacts are provided
  if (!params.outputArtifacts || params.outputArtifacts.length === 0) {
    return {
      error: 'VALIDATION FAILED: No output artifacts provided',
      message: '⛔ Cannot complete phase without providing actual output artifacts',
      resolution: [
        'You must create actual documentation OR provide structured JSON output',
        'Option 1 - File: { path: "/path/to/plan.md", format: "markdown", description: "My plan", content: "# Plan\\n..." }',
        'Option 2 - JSON Response: { path: "audit-analysis", format: "json", description: "Analysis results", content: "{...}" }'
      ],
      hint: 'The phase_output tool now requires actual artifacts, not just recording that work was done'
    };
  }
  
  // ENFORCEMENT: Validate each artifact
  const validationErrors: string[] = [];
  
  for (const artifact of params.outputArtifacts) {
    // Check content is not empty
    if (!artifact.content || artifact.content.trim().length < 10) {
      validationErrors.push(`Artifact "${artifact.path}": Content too short or empty (minimum 10 characters)`);
    }
    
    // Validate JSON format if specified
    if (artifact.format === 'json') {
      try {
        JSON.parse(artifact.content);
      } catch (e) {
        validationErrors.push(`Artifact "${artifact.path}": Invalid JSON format`);
      }
    }
    
    // Check for meaningful content based on phase
    if (!validatePhaseSpecificContent(params.phase, artifact)) {
      validationErrors.push(`Artifact "${artifact.path}": Does not contain expected ${params.phase} content`);
    }
  }
  
  if (validationErrors.length > 0) {
    return {
      error: 'VALIDATION FAILED: Output artifacts do not meet requirements',
      validationErrors,
      message: '⛔ Cannot complete phase with invalid artifacts',
      resolution: [
        'Fix the validation errors listed above',
        'Ensure your artifacts contain meaningful, structured content',
        'For JSON artifacts, ensure valid JSON syntax',
        'For markdown artifacts, ensure proper structure and detail',
        'Path can be a file path OR descriptive identifier for structured output'
      ]
    };
  }
  
  // Record the phase output with artifacts
  const enrichedOutput = {
    ...params.output,
    artifacts: params.outputArtifacts,
    validatedAt: new Date().toISOString()
  };
  
  sessionManager.recordPhaseOutput(params.phase, enrichedOutput);
  
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
    artifactsValidated: params.outputArtifacts.length,
    artifacts: params.outputArtifacts.map(a => ({ path: a.path, format: a.format, description: a.description })),
    timestamp: new Date().toISOString(),
    message: `✅ Successfully recorded output for ${params.phase} phase with ${params.outputArtifacts.length} validated artifact(s)`,
    hint: 'Use workflow_status to see overall progress, or validate_phase_completion to verify requirements'
  };
}

function validatePhaseSpecificContent(
  phase: Phase, 
  artifact: { path: string; format: string; description: string; content: string }
): boolean {
  const content = artifact.content.toLowerCase();
  
  switch (phase) {
    case 'AUDIT_INVENTORY':
      // For audit/inventory, expect analysis and changes
      return (
        (content.includes('audit') || content.includes('analysis') || content.includes('dependencies')) ||
        (content.includes('inventory') || content.includes('changes') || content.includes('modifications')) ||
        (artifact.format === 'json' && (content.includes('changes') || content.includes('files')))
      );
      
    case 'COMPARE_ANALYZE':
      // For compare/analyze, expect approaches and comparisons
      return (
        content.includes('approach') || content.includes('option') || 
        content.includes('comparison') || content.includes('pros') || content.includes('cons') ||
        content.includes('recommend')
      );
      
    case 'QUESTION_DETERMINE':
      // For question/determine, expect questions and implementation plans
      return (
        content.includes('question') || content.includes('assumption') ||
        content.includes('plan') || content.includes('step') || content.includes('implement')
      );
      
    case 'WRITE_OR_REFACTOR':
      // For write/refactor, expect implementation details
      return (
        content.includes('implement') || content.includes('change') || content.includes('modify') ||
        content.includes('file') || content.includes('code') || content.includes('refactor') ||
        content.includes('write') || content.includes('create')
      );
      
    case 'TEST':
      // For test, expect test results and metrics
      return (
        content.includes('test') || content.includes('pass') || content.includes('fail') ||
        content.includes('result') || content.includes('coverage') || content.includes('metric')
      );
      
    case 'LINT':
      // For lint, expect quality checks and errors
      return (
        content.includes('lint') || content.includes('error') || content.includes('warning') ||
        content.includes('quality') || content.includes('issue') || content.includes('fix')
      );
      
    case 'ITERATE':
      // For iterate, expect fixes and improvements
      return (
        content.includes('fix') || content.includes('resolve') || content.includes('improve') ||
        content.includes('issue') || content.includes('iteration') || content.includes('update')
      );
      
    case 'PRESENT':
      // For present, expect summary and recommendations
      return (
        content.includes('summary') || content.includes('complete') || content.includes('result') ||
        content.includes('recommend') || content.includes('future') || content.includes('overview')
      );
      
    default:
      return true; // Allow unknown phases to pass basic validation
  }
}