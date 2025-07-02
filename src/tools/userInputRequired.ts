import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { PhaseGuidance, OutputFileInstruction } from '../types';

export function createUserInputRequiredTool(): Tool {
  return {
    name: 'user_input_required_guidance',
    description: 'Handle escalation to user input when iteration limits reached or checkpoints triggered',
    inputSchema: {
      type: 'object',
      properties: {
        trigger: {
          type: 'string',
          enum: ['iteration_limit', 'user_checkpoint', 'validation_failure', 'time_limit'],
          description: 'What triggered the escalation'
        },
        context: {
          type: 'object',
          description: 'Additional context about the escalation',
          properties: {
            failedPhase: { type: 'string' },
            attemptCount: { type: 'number' },
            lastError: { type: 'string' },
            specificIssues: { type: 'array', items: { type: 'string' } }
          }
        }
      },
      required: ['trigger']
    }
  };
}

export async function handleUserInputRequired(
  params: {
    trigger: 'iteration_limit' | 'user_checkpoint' | 'validation_failure' | 'time_limit';
    context?: any;
  },
  sessionManager: SessionManager
): Promise<PhaseGuidance> {
  const session = sessionManager.getSession();
  
  if (!session) {
    throw new Error('No active session. Use build_custom_workflow first.');
  }

  // Update to USER_INPUT_REQUIRED phase
  sessionManager.updatePhase('USER_INPUT_REQUIRED');
  
  const config = session.workflowConfig;
  const outputDir = config?.outputPreferences.outputDirectory || 'workflow-output';
  const escalationContext = params.context || {};

  // Generate escalation report file
  const userInputFile: OutputFileInstruction = {
    path: `${outputDir}/user-input-needed.md`,
    description: 'User input escalation report with options and context',
    required: true,
    format: 'markdown',
    template: generateUserInputTemplate(params.trigger, escalationContext, session),
    validationRules: [
      'Must explain escalation trigger clearly',
      'Must provide specific user options',
      'Must include current workflow context'
    ]
  };

  // Define escalation-specific guidance based on trigger
  let escalationGuidance: PhaseGuidance;

  switch (params.trigger) {
    case 'iteration_limit':
      escalationGuidance = {
        phase: 'USER_INPUT_REQUIRED',
        objective: '⚠️ ITERATION LIMIT REACHED - User guidance needed to proceed',
        
        directiveInstructions: [
          '🛑 STOP ALL WORKFLOW ACTIVITY: You have reached the configured iteration limit',
          '📋 MANDATORY: You MUST create user input escalation report',
          '⏳ WAIT: You MUST pause workflow until user provides direction',
          '📞 ESCALATE: Present clear options for user to choose from'
        ],

        instructions: [
          'Document exactly why the iteration limit was reached',
          'Summarize the current state and what has been attempted',
          'Present clear, actionable options for the user',
          'Create comprehensive escalation report',
          'Pause all further workflow activity'
        ],

        expectedOutput: {
          escalationReason: `Iteration limit reached for ${escalationContext.failedPhase || 'unknown'} phase`,
          attemptsSummary: `${escalationContext.attemptCount || 'Unknown'} attempts made`,
          currentStatus: 'Summary of what has been accomplished and what failed',
          userOptions: 'Clear options for how to proceed',
          escalationReport: 'User input escalation document created'
        },

        requiredOutputFiles: [userInputFile],

        blockingMessages: [
          '⛔ WORKFLOW PAUSED: Iteration limit exceeded',
          '⛔ USER INPUT REQUIRED: Cannot proceed without user guidance',
          '⛔ NO FURTHER ACTIONS: All workflow activity must stop until user responds'
        ],

        nextPhase: 'Workflow paused - awaiting user input and direction'
      };
      break;

    case 'validation_failure':
      escalationGuidance = {
        phase: 'USER_INPUT_REQUIRED',
        objective: '⚠️ VALIDATION FAILURES - User review needed for quality issues',
        
        directiveInstructions: [
          '🛑 VALIDATION BLOCKED: Multiple validation attempts have failed',
          '📋 MANDATORY: You MUST document specific validation failures',
          '🔍 REQUIRED: You MUST provide detailed failure analysis',
          '📞 ESCALATE: Request user review of validation criteria'
        ],

        instructions: [
          'Document all validation failures encountered',
          'Analyze patterns in validation issues',
          'Suggest potential solutions or criteria adjustments',
          'Request user review of validation requirements'
        ],

        expectedOutput: {
          validationFailures: 'Specific validation issues encountered',
          failurePatterns: 'Common themes in validation problems',
          suggestedSolutions: 'Potential ways to resolve issues',
          criteriaReview: 'Validation criteria that may need adjustment'
        },

        requiredOutputFiles: [userInputFile]
      };
      break;

    case 'user_checkpoint':
      escalationGuidance = {
        phase: 'USER_INPUT_REQUIRED',
        objective: '📋 USER CHECKPOINT - Scheduled user review point',
        
        directiveInstructions: [
          '⏸️ CHECKPOINT REACHED: User review configured for this point',
          '📊 MANDATORY: You MUST provide comprehensive progress summary',
          '🎯 REQUIRED: You MUST highlight key decisions and changes',
          '📞 PRESENT: Show user current state and next planned actions'
        ],

        instructions: [
          'Summarize progress made since last checkpoint',
          'Highlight significant decisions and changes',
          'Present current state and upcoming plans',
          'Request user confirmation to proceed'
        ],

        expectedOutput: {
          progressSummary: 'What has been accomplished since last checkpoint',
          keyDecisions: 'Important decisions made during workflow',
          currentState: 'Current status of refactoring',
          upcomingActions: 'Next planned phases and activities'
        },

        requiredOutputFiles: [userInputFile]
      };
      break;

    default:
      escalationGuidance = {
        phase: 'USER_INPUT_REQUIRED',
        objective: '⚠️ ESCALATION TRIGGERED - User input needed',
        
        instructions: [
          'Document the escalation trigger',
          'Provide current workflow context',
          'Request user guidance on how to proceed'
        ],

        expectedOutput: {
          escalationContext: 'Why escalation was triggered',
          workflowState: 'Current status of refactoring workflow'
        },

        requiredOutputFiles: [userInputFile]
      };
  }

  return escalationGuidance;
}

function generateUserInputTemplate(
  trigger: string,
  context: any,
  session: any
): string {
  const timestamp = new Date().toISOString();
  const failedPhase = context.failedPhase || 'Unknown';
  const attemptCount = context.attemptCount || 0;
  const lastError = context.lastError || 'Not specified';

  return `# User Input Required - Workflow Escalation

## Escalation Details
- **Timestamp**: ${timestamp}
- **Trigger**: ${trigger.toUpperCase().replace('_', ' ')}
- **Session ID**: ${session.id}
- **Failed Phase**: ${failedPhase}
- **Attempt Count**: ${attemptCount}

## Current Situation
${generateSituationDescription(trigger, context)}

## Last Error/Issue
\`\`\`
${lastError}
\`\`\`

## User Options

${generateUserOptions(trigger, context)}

## Current Workflow Status
- **Total Phases Completed**: ${session.completedPhases.length}
- **Current Phase**: ${session.currentPhase}
- **Time Elapsed**: ${Math.round((Date.now() - session.startedAt) / 1000 / 60)} minutes
- **Files Modified**: ${session.metrics.filesModified}

## Workflow Configuration
- **Selected Phases**: ${session.workflowConfig?.selectedPhases.join(', ') || 'Default'}
- **Iteration Limits**: TEST=${session.workflowConfig?.iterationLimits.TEST}, LINT=${session.workflowConfig?.iterationLimits.LINT}, ITERATE=${session.workflowConfig?.iterationLimits.ITERATE}

## Recommendations

${generateRecommendations(trigger, context)}

## How to Proceed

1. **Review the situation** described above
2. **Choose one of the user options** listed
3. **Modify workflow configuration** if needed
4. **Resume workflow** with updated guidance
5. **Or request human intervention** if issues are complex

---

**⚠️ WORKFLOW PAUSED**: No further automatic actions will be taken until user input is provided.

*Generated by USER_INPUT_REQUIRED phase at ${timestamp}*`;
}

function generateSituationDescription(trigger: string, context: any): string {
  switch (trigger) {
    case 'iteration_limit':
      return `The ${context.failedPhase || 'current'} phase has reached its configured iteration limit of ${context.attemptCount || 'unknown'} attempts. The workflow has been automatically paused to prevent endless loops and request user guidance on how to proceed.`;
    
    case 'validation_failure':
      return `Multiple validation attempts have failed in the ${context.failedPhase || 'current'} phase. The validation criteria may be too strict, or there may be fundamental issues that require user review and adjustment.`;
    
    case 'user_checkpoint':
      return 'A user checkpoint has been reached as configured in the workflow settings. This is a scheduled pause point where user review and approval is requested before continuing with the refactoring process.';
    
    case 'time_limit':
      return 'The workflow has been running for an extended period and has reached a time-based checkpoint. User input is requested to confirm whether to continue or adjust the approach.';
    
    default:
      return 'An escalation condition has been triggered and user input is required to determine how to proceed with the workflow.';
  }
}

function generateUserOptions(trigger: string, context: any): string {
  switch (trigger) {
    case 'iteration_limit':
      return `
### Option 1: Increase Iteration Limit
- Continue with ${Math.ceil((context.attemptCount || 5) * 0.5)} more iterations
- Adjust iteration limits for this phase type
- Resume automated workflow with extended limits

### Option 2: Skip Phase
- Skip the ${context.failedPhase || 'current'} phase entirely
- Move to the next workflow phase
- Document why phase was skipped

### Option 3: Modify Requirements
- Adjust validation criteria for this phase
- Lower the completion requirements
- Resume with modified expectations

### Option 4: Manual Intervention
- Pause automated workflow completely
- Allow manual completion of problematic tasks
- Resume workflow after manual fixes`;

    case 'validation_failure':
      return `
### Option 1: Relax Validation
- Reduce validation strictness
- Accept current state as "good enough"
- Continue with lowered standards

### Option 2: Manual Review
- Review validation criteria manually
- Identify specific problems to address
- Resume with targeted fixes

### Option 3: Skip Validation
- Skip validation for this phase only
- Continue workflow without validation checks
- Document validation skip rationale

### Option 4: Reset and Retry
- Reset validation state completely
- Start phase validation from beginning
- Apply different validation approach`;

    case 'user_checkpoint':
      return `
### Option 1: Continue as Planned
- Approve current progress and approach
- Continue with next planned phases
- Maintain current configuration

### Option 2: Modify Workflow
- Adjust upcoming phases or configuration
- Change iteration limits or validation criteria
- Resume with updated settings

### Option 3: Change Direction
- Modify the refactoring approach significantly
- Skip or add phases based on current state
- Resume with new strategy

### Option 4: Complete Manual Review
- Pause automated workflow
- Perform manual review and changes
- Resume after manual completion`;

    default:
      return `
### Option 1: Continue
- Resume workflow with current settings
- No changes to configuration

### Option 2: Modify
- Adjust workflow configuration
- Change limits or criteria

### Option 3: Manual Intervention
- Switch to manual workflow completion
- Pause automation temporarily`;
  }
}

function generateRecommendations(trigger: string, context: any): string {
  switch (trigger) {
    case 'iteration_limit':
      return `
- **Recommended**: Increase iteration limit to ${(context.attemptCount || 5) + Math.ceil((context.attemptCount || 5) * 0.5)} and continue
- **Alternative**: Review specific errors to identify patterns
- **Consider**: Whether the task complexity exceeds automation capabilities`;

    case 'validation_failure':
      return `
- **Recommended**: Manual review of validation criteria
- **Alternative**: Relax validation temporarily to unblock workflow  
- **Consider**: Whether validation expectations are realistic`;

    case 'user_checkpoint':
      return `
- **Recommended**: Review progress and continue if satisfactory
- **Alternative**: Adjust upcoming phases based on current state
- **Consider**: Whether timeline and scope remain appropriate`;

    default:
      return `
- **Recommended**: Review current state and continue with adjustments
- **Alternative**: Seek expert guidance if issues are complex
- **Consider**: Whether workflow approach needs fundamental changes`;
  }
}