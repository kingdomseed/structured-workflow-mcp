#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

import { SessionManager } from './session/SessionManager.js';

// Import tool implementations
import { createBuildCustomWorkflowTool, handleBuildCustomWorkflow } from './tools/buildCustomWorkflow.js';
import { createTestGuidanceTool, handleTestGuidance } from './tools/testGuidance.js';
import { createUserInputRequiredTool, handleUserInputRequired } from './tools/userInputRequired.js';
import { createRefactorWorkflowTool, handleRefactorWorkflow } from './tools/refactorWorkflow.js';
import { createFeatureWorkflowTool, handleCreateFeatureWorkflow } from './tools/createFeatureWorkflow.js';
import { createTestWorkflowTool, handleTestWorkflow } from './tools/testWorkflow.js';
import { createTddWorkflowTool, handleTddWorkflow } from './tools/tddWorkflow.js';
import { createPhaseGuidanceTools, handlePhaseGuidance } from './tools/phaseGuidance.js';
import { createValidationTools, handleValidateAction, handleValidatePhaseCompletion } from './tools/validation.js';
import { createWorkflowStatusTool, handleWorkflowStatus } from './tools/workflowStatus.js';
import { createPhaseOutputTool, handlePhaseOutput } from './tools/phaseOutput.js';
import { createDiscoverWorkflowToolsTool, handleDiscoverWorkflowTools } from './tools/discoverWorkflowTools.js';

// Global server configuration
let globalServerConfig: ServerConfig = {};

// Function to get server configuration (for use by tools)
export function getServerConfig(): ServerConfig {
  return { ...globalServerConfig };
}

// Function to get default output directory
export function getDefaultOutputDirectory(): string {
  return globalServerConfig.outputDirectory || 'structured-workflow';
}

// Server metadata
const SERVER_NAME = 'structured-workflow-mcp';
const SERVER_VERSION = '0.2.1'; // First published open-source release

// Command-line argument parsing
interface ServerConfig {
  outputDirectory?: string;
  workingDirectory?: string;
}

export function parseArguments(argv: string[] = process.argv.slice(2)): ServerConfig {
  const config: ServerConfig = {};
  const args = argv;
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];
    
    switch (arg) {
      case '--output-dir':
      case '--outputDirectory':
        if (nextArg && !nextArg.startsWith('--')) {
          config.outputDirectory = nextArg;
          i++; // Skip next argument since we consumed it
        }
        break;
      case '--working-dir':
      case '--workingDirectory':
        if (nextArg && !nextArg.startsWith('--')) {
          config.workingDirectory = nextArg;
          i++; // Skip next argument since we consumed it
        }
        break;
      case '--help':
      case '-h':
        console.log(`
${SERVER_NAME} v${SERVER_VERSION}

Usage: structured-workflow-mcp [options]

Options:
  --output-dir <path>     Default output directory for workflow files (default: 'structured-workflow')
  --working-dir <path>    Working directory for the server (default: current directory)
  --help, -h              Show this help message

Examples:
  structured-workflow-mcp --output-dir ./docs/workflows
  structured-workflow-mcp --output-dir /tmp/workflow-outputs --working-dir /project/root
`);
        process.exit(0);
        break;
    }
  }
  
  return config;
}

async function main() {
  // Parse command-line arguments
  const serverConfig = parseArguments();
  
  // Set global configuration for tools to access
  globalServerConfig = serverConfig;
  
  // Set working directory if specified
  if (serverConfig.workingDirectory) {
    try {
      process.chdir(serverConfig.workingDirectory);
      console.error(`[Config] Working directory set to: ${serverConfig.workingDirectory}`);
    } catch (error) {
      console.error(`[Config Error] Failed to set working directory: ${error instanceof Error ? error.message : 'Unknown error'}`);
      process.exit(1);
    }
  }
  
  // Log configuration
  console.error(`[Config] Default output directory: ${getDefaultOutputDirectory()}`);
  if (serverConfig.outputDirectory) {
    console.error(`[Config] Output directory configured via command line`);
  }
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
    createRefactorWorkflowTool(),                 // Refactoring workflow
    createFeatureWorkflowTool(),                  // Feature creation workflow
    createTestWorkflowTool(),                     // Test writing workflow
    createTddWorkflowTool(),                      // TDD workflow
    createBuildCustomWorkflowTool(),              // Custom workflow builder
    
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
        case 'audit_inventory_guidance':
        case 'compare_analyze_guidance':
        case 'question_determine_guidance':
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

        // Workflow entry points
        case 'refactor_workflow':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handleRefactorWorkflow(args as any, sessionManager), null, 2)
            }]
          };
        
        case 'create_feature_workflow':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handleCreateFeatureWorkflow(args as any, sessionManager), null, 2)
            }]
          };
          
        case 'test_workflow':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handleTestWorkflow(args as any, sessionManager), null, 2)
            }]
          };
          
        case 'tdd_workflow':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handleTddWorkflow(args as any, sessionManager), null, 2)
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
  console.error('📋 Enhanced Features: Multiple workflow types (refactor, feature, test, TDD)');
  console.error('🔄 Smart Workflow Selection: Choose the right workflow for your task');
  console.error('🎯 Entry Points: refactor_workflow, create_feature_workflow, test_workflow, tdd_workflow, or build_custom_workflow');
}

// Helper function to provide contextual error suggestions
function getErrorSuggestion(toolName: string, errorMessage: string): string {
  if (errorMessage.includes('Unknown tool')) {
    return `Tool not found. Your platform may require a prefix (e.g., mcp7_${toolName} or mcp_${toolName}). Check how other MCP tools are named in your environment.`;
  }
  
  if (errorMessage.includes('No active session')) {
    return 'Start a new workflow using build_custom_workflow tool first (remember to use any required platform prefix)';
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

// Run the server only when this file is executed directly (not imported)
if (require.main === module) {
  main().catch((error) => {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  });
}