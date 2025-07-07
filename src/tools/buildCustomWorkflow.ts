import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { WorkflowConfiguration, Phase, OutputFileInstruction } from '../types';
import { WorkflowType, getWorkflowPreset, detectWorkflowType } from '../workflows/WorkflowPresets';
import { 
  generateNumberedFileName,
  sanitizeTaskName,
  resolveOutputDirectory,
  validateDirectoryAccess
} from '../utils/fileSystem';
import { getDefaultOutputDirectory } from '../index';

export function createBuildCustomWorkflowTool(): Tool {
  return {
    name: 'build_custom_workflow',
    description: 'Build a custom workflow with full control over phases and configuration. Use specific workflow tools (refactor_workflow, create_feature_workflow, etc.) for optimized presets.',
    inputSchema: {
      type: 'object',
      properties: {
        task: {
          type: 'string',
          description: 'Description of the programming task'
        },
        workflowType: {
          type: 'string',
          enum: ['refactor', 'feature', 'test', 'tdd', 'custom'],
          description: 'Use a predefined workflow type or custom for full control',
          default: 'custom'
        },
        selectedPhases: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['SETUP', 'AUDIT_INVENTORY', 'COMPARE_ANALYZE', 'QUESTION_DETERMINE', 'WRITE_OR_REFACTOR', 'TEST', 'LINT', 'ITERATE', 'PRESENT']
          },
          description: 'Select which phases to include in your workflow',
          default: ['SETUP', 'AUDIT_INVENTORY', 'WRITE_OR_REFACTOR', 'TEST', 'LINT', 'PRESENT']
        },
        iterationLimits: {
          type: 'object',
          properties: {
            TEST: { type: 'number', default: 5, description: 'Max test failure cycles before user input' },
            LINT: { type: 'number', default: 10, description: 'Max lint/fix cycles before user input' },
            ITERATE: { type: 'number', default: 15, description: 'Max overall iterations before user input' }
          },
          description: 'Set iteration limits before escalation to user input'
        },
        outputPreferences: {
          type: 'object',
          properties: {
            formats: {
              type: 'array',
              items: { type: 'string', enum: ['markdown', 'json'] },
              default: ['markdown'],
              description: 'Output formats for documentation'
            },
            realTimeUpdates: { type: 'boolean', default: true },
            generateDiagrams: { type: 'boolean', default: true },
            includeCodeSnippets: { type: 'boolean', default: true },
            outputDirectory: { type: 'string', default: 'workflow-output' }
          }
        },
        userCheckpoints: {
          type: 'object',
          properties: {
            beforeMajorChanges: { type: 'boolean', default: true },
            afterFailedIterations: { type: 'boolean', default: true },
            beforeFinalPresentation: { type: 'boolean', default: false }
          }
        }
      },
      required: ['task']
    }
  };
}

export async function handleBuildCustomWorkflow(
  params: {
    task: string;
    workflowType?: WorkflowType | 'custom';
    selectedPhases?: Phase[];
    iterationLimits?: any;
    outputPreferences?: any;
    userCheckpoints?: any;
  },
  sessionManager: SessionManager
) {
  // Detect workflow type if not specified
  const detectedType = params.workflowType === 'custom' ? null : params.workflowType || detectWorkflowType(params.task);
  
  // If a workflow type is detected, suggest using the specific tool
  if (detectedType && !params.workflowType) {
    const workflowTools = {
      refactor: 'refactor_workflow',
      feature: 'create_feature_workflow',
      test: 'test_workflow',
      tdd: 'tdd_workflow'
    };
    
    return {
      suggestion: `Based on your task description, consider using ${workflowTools[detectedType]} for an optimized ${detectedType} workflow`,
      detectedType,
      alternativeCommand: `${workflowTools[detectedType]}({ task: "${params.task}" })`,
      proceedingWithCustom: 'Proceeding with custom workflow configuration...',
      customWorkflow: await buildCustomWorkflowImplementation(params, sessionManager)
    };
  }
  
  // Use preset if workflow type is specified
  if (params.workflowType && params.workflowType !== 'custom') {
    const preset = getWorkflowPreset(params.workflowType);
    params.selectedPhases = params.selectedPhases || preset.phases;
    params.iterationLimits = { ...preset.iterationLimits, ...params.iterationLimits };
  }
  
  return buildCustomWorkflowImplementation(params, sessionManager);
}

async function buildCustomWorkflowImplementation(
  params: {
    task: string;
    workflowType?: WorkflowType | 'custom';
    selectedPhases?: Phase[];
    iterationLimits?: any;
    outputPreferences?: any;
    userCheckpoints?: any;
  },
  sessionManager: SessionManager
) {
  // Set defaults for optional parameters
  const selectedPhases = params.selectedPhases || ['SETUP', 'AUDIT_INVENTORY', 'WRITE_OR_REFACTOR', 'TEST', 'LINT', 'PRESENT'];
  const iterationLimits = {
    TEST: 5,
    LINT: 10,
    ITERATE: 15,
    ...params.iterationLimits
  };
  // Resolve output directory: if the incoming value is relative, make it absolute relative to working directory (CWD).
  const resolvedOutputDir = resolveOutputDirectory(
    params.outputPreferences?.outputDirectory || getDefaultOutputDirectory(),
    process.cwd()
  );

  const outputPreferences = {
    formats: ['markdown'],
    realTimeUpdates: true,
    generateDiagrams: true,
    includeCodeSnippets: true,
    createProgressReport: true,
    createPhaseArtifacts: true,
    ...params.outputPreferences,
    outputDirectory: resolvedOutputDir
  };
  const userCheckpoints = {
    beforeMajorChanges: true,
    afterFailedIterations: true,
    beforeFinalPresentation: false,
    ...params.userCheckpoints
  };

  // Create workflow configuration
  const workflowConfig: WorkflowConfiguration = {
    selectedPhases: selectedPhases as Phase[],
    iterationLimits,
    outputPreferences,
    userCheckpoints,
    escalationTriggers: {
      enableUserInput: true,
      escalateOnIterationLimit: true,
      escalateOnErrors: true,
      escalateOnTime: false
    }
  };
  // Start session with configuration
  const session = sessionManager.startSession(params.task, workflowConfig);

  // Validate directory access (read-only check)
  const dirValidation = validateDirectoryAccess(resolvedOutputDir);
  
  // Get the sanitized task name for subdirectory
  const sanitizedTaskName = sanitizeTaskName(params.task);
  
  // Construct the target directory path (no actual creation happens)
  const suggestedDirectory = resolvedOutputDir && sanitizedTaskName ? 
    `${resolvedOutputDir}/${sanitizedTaskName}` :
    resolvedOutputDir;
    
  // Report validation issues but continue with the workflow
  const directoryWarning = !dirValidation.isValid ? {
    warning: 'DIRECTORY ACCESS ISSUE',
    message: `⚠️ Output directory may not be writable: ${dirValidation.error}`,
    impact: 'The AI agent will be instructed to create this directory. If it fails, artifacts will remain in-memory only.',
    resolution: [
      'Check directory permissions',
      'Ensure the specified directory is writable'
    ]
  } : null;

  // Generate numbered file names for initial files
  const planningFileName = generateNumberedFileName({
    phase: 'PLANNING',
    outputDirectory: suggestedDirectory,
    extension: 'md',
    includeDate: true
  });

  // Generate initial output file instructions with numbered naming
  const initialOutputFiles: OutputFileInstruction[] = [
    {
      path: `${suggestedDirectory}/${planningFileName}`,
      description: 'Initial workflow plan and configuration',
      required: true,
      format: 'markdown',
      template: generateWorkflowPlanTemplate(params.task, workflowConfig),
      validationRules: ['Must contain task description', 'Must list all selected phases', 'Must include iteration limits']
    },
    {
      path: `${suggestedDirectory}/workflow-status.json`,
      description: 'Machine-readable workflow progress',
      required: true,
      format: 'json',
      template: JSON.stringify(sessionManager.getWorkflowProgress(), null, 2)
    }
  ];

  return {
    success: true,
    sessionId: session.id,
    message: '🚀 CUSTOM WORKFLOW BUILT SUCCESSFULLY',
    workflowConfiguration: {
      task: params.task,
      selectedPhases,
      phaseCount: selectedPhases.length,
      iterationLimits,
      outputPreferences,
      userCheckpoints,
      escalationEnabled: true
    },
    ...(directoryWarning ? { directoryWarning } : {}),
    criticalInstructions: [
      '⚠️ DIRECTIVE WORKFLOW: This is not suggestive guidance - you MUST follow the structured approach',
      '📋 PHASE VALIDATION: Each phase has specific completion requirements that must be met',
      '📁 OUTPUT REQUIREMENTS: You are required to create documentation files as specified',
      '🛑 SAFETY RULE: Files must be read before modification (this is enforced)',
      '⏱️ ITERATION LIMITS: Automatic escalation to user input when limits are reached'
    ],
    directoryCreated: {
      baseDirectory: outputPreferences.outputDirectory,
      taskDirectory: suggestedDirectory,
      sanitizedTaskName: sanitizedTaskName,
      message: `ℹ️ Suggested output directory path: ${suggestedDirectory}`
    },
    requiredFirstActions: [
      {
        action: 'CREATE_OUTPUT_DIRECTORY',
        instruction: `ℹ️ Create output directory if needed: "${suggestedDirectory}"`,
        completed: false,
        blocking: true
      },
      {
        action: 'CREATE_INITIAL_FILES',
        instruction: 'You can now start creating phase output files using the numbered naming system',
        files: initialOutputFiles,
        blocking: false,
        note: 'Files will be automatically saved with numbered naming (01-audit-inventory-YYYY-MM-DD.md)'
      },
      {
        action: 'BEGIN_FIRST_PHASE',
        instruction: `Call "${selectedPhases[0].toLowerCase()}_guidance" to begin the workflow`,
        blocking: true
      }
    ],
    nextPhase: {
      phase: selectedPhases[0],
      tool: `${selectedPhases[0].toLowerCase()}_guidance`,
      description: `Begin with the ${selectedPhases[0]} phase`
    },
    validationRequirement: {
      message: '🔍 COMPLETION VALIDATION: You cannot proceed to the next phase until the current phase validation passes',
      enforcement: 'Use phase_output tool only after meeting all phase requirements'
    }
  };
}

function generateWorkflowPlanTemplate(task: string, config: WorkflowConfiguration): string {
  const timestamp = new Date().toISOString();
  
  return `# Structured Refactoring Workflow Plan

## Task Description
${task}

## Workflow Configuration
- **Generated**: ${timestamp}
- **Session ID**: Generated during workflow initialization
- **Total Phases**: ${config.selectedPhases.length}
- **Estimated Duration**: ${estimateWorkflowDuration(config.selectedPhases)} minutes

## Selected Phases
${config.selectedPhases.map((phase, index) => 
  `${index + 1}. **${phase}** - ${getPhaseDescription(phase)}`
).join('\n')}

## Iteration Limits & Escalation
- **TEST Phase**: Maximum ${config.iterationLimits.TEST} test failure cycles
- **LINT Phase**: Maximum ${config.iterationLimits.LINT} lint/fix cycles  
- **ITERATE Phase**: Maximum ${config.iterationLimits.ITERATE} overall iterations
- **Escalation**: Automatic user input request when limits reached

## Output Configuration
- **Formats**: ${config.outputPreferences.formats.join(', ')}
- **Real-time Updates**: ${config.outputPreferences.realTimeUpdates ? 'Enabled' : 'Disabled'}
- **Generate Diagrams**: ${config.outputPreferences.generateDiagrams ? 'Yes' : 'No'}
- **Include Code Snippets**: ${config.outputPreferences.includeCodeSnippets ? 'Yes' : 'No'}

## User Checkpoints
- **Before Major Changes**: ${config.userCheckpoints.beforeMajorChanges ? 'Enabled' : 'Disabled'}
- **After Failed Iterations**: ${config.userCheckpoints.afterFailedIterations ? 'Enabled' : 'Disabled'}
- **Before Final Presentation**: ${config.userCheckpoints.beforeFinalPresentation ? 'Enabled' : 'Disabled'}

## Critical Guidelines
1. **Directive Workflow**: Follow phase instructions exactly - this is not suggestive guidance
2. **Validation Required**: Each phase has completion criteria that must be met
3. **File Operations**: Always read files before modifying them
4. **Documentation**: Create required output files for each phase
5. **Escalation**: Respect iteration limits - user input will be requested when reached

## Progress Tracking
This plan will be updated throughout the workflow. Check \`workflow-status.json\` for real-time progress.

---
*Generated by Structured Workflow MCP Server v0.2.3*`;
}

function getPhaseDescription(phase: Phase): string {
  const descriptions: Record<Phase, string> = {
    PLANNING: 'Initial workflow setup and planning',
    SETUP: 'Initialize environment and establish file organization patterns',
    AUDIT_INVENTORY: 'Read, analyze code and catalog all required changes',
    COMPARE_ANALYZE: 'Evaluate different implementation approaches',
    QUESTION_DETERMINE: 'Clarify ambiguities and finalize implementation strategy',
    WRITE_OR_REFACTOR: 'Implement the planned changes',
    TEST: 'Execute tests and validate functionality',
    LINT: 'Verify code quality and standards',
    ITERATE: 'Fix issues found during testing and linting',
    PRESENT: 'Summarize programming work and results',
    USER_INPUT_REQUIRED: 'Escalation phase for user guidance'
  };
  
  return descriptions[phase] || 'Phase description not available';
}

function estimateWorkflowDuration(phases: Phase[]): number {
  const phaseEstimates: Record<Phase, number> = {
    PLANNING: 5,
    SETUP: 5,
    AUDIT_INVENTORY: 25,  // Combined time for audit + inventory
    COMPARE_ANALYZE: 10,
    QUESTION_DETERMINE: 15,  // Combined time for question + determine
    WRITE_OR_REFACTOR: 30,
    TEST: 15,
    LINT: 10,
    ITERATE: 20,
    PRESENT: 10,
    USER_INPUT_REQUIRED: 5
  };
  
  return phases.reduce((total, phase) => total + (phaseEstimates[phase] || 10), 0);
}