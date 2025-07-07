import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { Phase } from '../types';
import * as path from 'path';
import {
  NumberedFileConfig,
  resolveOutputDirectory,
  generateNumberedFileName,
  sanitizeTaskName
} from '../utils/fileSystem';

export function createPhaseOutputTool(): Tool {
  return {
    name: 'phase_output',
    description: 'Record the output/results when completing a workflow phase - REQUIRES ACTUAL OUTPUT ARTIFACTS with numbered file naming',
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
          description: 'MANDATORY: List of actual output artifacts you created for this phase (use numbered file names)',
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
      } catch {
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

  const savedArtifacts: Array<{
    path: string;
    format: 'markdown' | 'json' | 'text';
    description: string;
    content: string;
    savedAt: string | null;
    saveError?: string;
  }> = [];

  // Resolve output directory (handles relative paths)
  const rawOutputDirectory = session.workflowConfig?.outputPreferences?.outputDirectory || 'structured-workflow';
  const outputDirectory = resolveOutputDirectory(rawOutputDirectory, process.cwd());
  
  for (const artifact of params.outputArtifacts) {
    // Build a numbered filename suggestion
    const fileConfig: NumberedFileConfig = {
      phase: params.phase,
      outputDirectory: outputDirectory,
      extension: getExtensionForFormat(artifact.format),
      includeDate: true
    };
    const suggestedFileName = generateNumberedFileName(fileConfig);

    const suggestedPath = path.join(outputDirectory, sanitizeTaskName(session.taskDescription), suggestedFileName);

    // Prepare array of artifact write instructions; no disk operation
    savedArtifacts.push({
      ...artifact,
      path: suggestedPath,
      savedAt: null // Nothing actually written
    });
  }
  
  // Record the phase output with artifacts (including saved paths)
  const enrichedOutput = {
    ...params.output,
    artifacts: savedArtifacts,
    validatedAt: new Date().toISOString(),
    outputDirectory: outputDirectory,
    taskDirectory: path.join(outputDirectory, sanitizeTaskName(session.taskDescription))
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
  
  // Count successfully saved artifacts
  const savedCount = savedArtifacts.filter(a => !a.saveError).length;
  const failedCount = savedArtifacts.length - savedCount;

  return {
    recorded: true,
    phase: params.phase,
    artifactsValidated: params.outputArtifacts.length,
    artifactsSaved: savedCount,
    artifactsFailed: failedCount,
    artifacts: savedArtifacts.map(a => ({ 
      path: a.path, 
      format: a.format, 
      description: a.description,
      savedAt: a.savedAt,
      saveError: a.saveError 
    })),
    outputDirectory: enrichedOutput.outputDirectory,
    taskDirectory: enrichedOutput.taskDirectory,
    timestamp: new Date().toISOString(),
    message: savedCount > 0 
      ? `✅ Successfully recorded and saved ${savedCount} artifact(s) for ${params.phase} phase` + 
        (failedCount > 0 ? ` (${failedCount} failed to save)` : '')
      : `✅ Successfully validated ${params.outputArtifacts.length} artifact(s) for ${params.phase} phase (file saving disabled)`,
    hint: 'Use workflow_status to see overall progress, or validate_phase_completion to verify requirements'
  };
}

/**
 * Maps artifact formats to file extensions
 */
function getExtensionForFormat(format: 'markdown' | 'json' | 'text'): string {
  switch (format) {
    case 'markdown':
      return 'md';
    case 'json':
      return 'json';
    case 'text':
      return 'txt';
    default:
      return 'txt';
  }
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