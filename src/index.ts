#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

import { SessionManager } from './session/SessionManager.js';

// Import tool implementations
import { createBuildCustomWorkflowTool, handleBuildCustomWorkflow } from './tools/buildCustomWorkflow.js';
import { createTestGuidanceTool, handleTestGuidance } from './tools/testGuidance.js';
import { createUserInputRequiredTool, handleUserInputRequired } from './tools/userInputRequired.js';
import { createPlanWorkflowTool, handlePlanWorkflow } from './tools/planWorkflow.js';
import { createPhaseGuidanceTools, handlePhaseGuidance } from './tools/phaseGuidance.js';
import { createValidationTools, handleValidateAction, handleValidatePhaseCompletion } from './tools/validation.js';
import { createWorkflowStatusTool, handleWorkflowStatus } from './tools/workflowStatus.js';
import { createPhaseOutputTool, handlePhaseOutput } from './tools/phaseOutput.js';
import { createDiscoverWorkflowToolsTool, handleDiscoverWorkflowTools } from './tools/discoverWorkflowTools.js';

// Server metadata
const SERVER_NAME = 'structured-workflow-mcp';
const SERVER_VERSION = '2.1.1'; // Version with merged implementations

async function main() {
  const server = new Server(
    {
      name: SERVER_NAME,
      version: SERVER_VERSION,
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Create session manager
  const sessionManager = new SessionManager();

  // Error handling
  server.onerror = (error) => {
    console.error('[MCP Error]', error);
  };

  // Tool registration
  const tools = [
    // Workflow entry points
    createBuildCustomWorkflowTool(),              // Primary entry point with configuration
    createPlanWorkflowTool(),                     // Simple entry point
    
    // Phase guidance tools
    ...createPhaseGuidanceTools(),                // Handles both suggestive and directive modes
    createTestGuidanceTool(),                     // TEST phase guidance
    
    // Validation tools
    ...createValidationTools(),                   // Both validate_action and validate_phase_completion
    
    // Workflow management
    createUserInputRequiredTool(),                // Escalation handling
    createWorkflowStatusTool(),                   // Workflow status
    createPhaseOutputTool(),                      // Phase output recording
    createDiscoverWorkflowToolsTool()             // Tool discovery
  ];

  // Handle list tools request
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: tools.map(tool => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema
      }))
    };
  });

  // Handle tool calls - ENHANCED WITH NEW TOOLS
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        // NEW ENHANCED TOOLS (v2.1)
        case 'build_custom_workflow':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handleBuildCustomWorkflow(args as any, sessionManager), null, 2)
            }]
          };

        case 'test_guidance':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handleTestGuidance(sessionManager), null, 2)
            }]
          };

        case 'user_input_required_guidance':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handleUserInputRequired(args as any, sessionManager), null, 2)
            }]
          };

        case 'validate_phase_completion':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handleValidatePhaseCompletion(args as any, sessionManager), null, 2)
            }]
          };

        // Phase guidance tools (automatically route based on session configuration)
        case 'audit_guidance':
        case 'inventory_guidance':
        case 'compare_analyze_guidance':
        case 'question_guidance':
        case 'determine_plan_guidance':
        case 'refactor_guidance':
        case 'lint_guidance':
        case 'iterate_guidance':
        case 'present_guidance':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handlePhaseGuidance(name, sessionManager), null, 2)
            }]
          };

        // Other workflow tools
        case 'plan_workflow':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handlePlanWorkflow(args as any, sessionManager), null, 2)
            }]
          };

        case 'validate_action':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handleValidateAction(args as any, sessionManager), null, 2)
            }]
          };

        case 'workflow_status':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handleWorkflowStatus(sessionManager), null, 2)
            }]
          };

        case 'phase_output':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handlePhaseOutput(args as any, sessionManager), null, 2)
            }]
          };

        case 'discover_workflow_tools':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handleDiscoverWorkflowTools(), null, 2)
            }]
          };

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error(`[Tool Error] ${name}:`, error);
      
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ 
            error: errorMessage,
            tool: name,
            timestamp: new Date().toISOString(),
            suggestion: getErrorSuggestion(name, errorMessage)
          }, null, 2)
        }],
        isError: true
      };
    }
  });

  // Create transport
  const transport = new StdioServerTransport();
  
  // Handle connection lifecycle
  transport.onclose = () => {
    sessionManager.endSession();
    console.error('[Session] Session ended due to transport close');
  };

  // Start server
  await server.connect(transport);
  console.error(`🚀 ${SERVER_NAME} v${SERVER_VERSION} running on stdio`);
  console.error('📋 Enhanced Features: Directive guidance, iteration limits, real-time outputs, user escalation');
  console.error('🔄 Backward Compatible: Legacy tools still supported');
  console.error('🎯 Primary Entry Point: Use build_custom_workflow to start');
}

// Helper function to provide contextual error suggestions
function getErrorSuggestion(toolName: string, errorMessage: string): string {
  if (errorMessage.includes('No active session')) {
    return 'Start a new workflow using build_custom_workflow tool first';
  }
  
  if (toolName === 'build_custom_workflow' && errorMessage.includes('required')) {
    return 'Ensure you provide the required "task" parameter';
  }
  
  if (toolName.includes('_guidance') && errorMessage.includes('phase')) {
    return 'Use workflow_status to check current phase and session state';
  }
  
  if (errorMessage.includes('validation')) {
    return 'Use validate_phase_completion to check requirements before proceeding';
  }
  
  if (errorMessage.includes('iteration')) {
    return 'Consider using user_input_required_guidance to handle escalation';
  }
  
  return 'Check tool parameters and session state, or use discover_workflow_tools for help';
}

// Handle process errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.error('🛑 Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('🛑 Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Run the server
main().catch((error) => {
  console.error('💥 Failed to start server:', error);
  process.exit(1);
});