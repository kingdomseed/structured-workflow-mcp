#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

import { SessionManager } from './session/SessionManager.js';
import { createPlanWorkflowTool, handlePlanWorkflow } from './tools/planWorkflow.js';
import { createPhaseGuidanceTools, handlePhaseGuidance } from './tools/phaseGuidance.js';
import { createValidationTool, handleValidateAction } from './tools/validation.js';
import { createWorkflowStatusTool, handleWorkflowStatus } from './tools/workflowStatus.js';
import { createPhaseOutputTool, handlePhaseOutput } from './tools/phaseOutput.js';
import { createDiscoverWorkflowToolsTool, handleDiscoverWorkflowTools } from './tools/discoverWorkflowTools.js';

// Server metadata
const SERVER_NAME = 'structured-workflow-mcp';
const SERVER_VERSION = '2.0.0';

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
    createPlanWorkflowTool(),
    ...createPhaseGuidanceTools(),
    createValidationTool(),
    createWorkflowStatusTool(),
    createPhaseOutputTool(),
    createDiscoverWorkflowToolsTool()
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

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'plan_workflow':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await handlePlanWorkflow(args as any, sessionManager), null, 2)
            }]
          };

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
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ error: errorMessage }, null, 2)
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
  };

  // Start server
  await server.connect(transport);
  console.error(`${SERVER_NAME} v${SERVER_VERSION} running on stdio`);
}

// Handle process errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the server
main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});