# Official Figma MCP Setup Reference

Use this reference when the user asks how to configure Figma access for Figma-to-Flutter work. This skill supports only Figma's official MCP capability.

## OpenCode

Use the official Figma Desktop MCP server.

Add the following to your `~/.config/opencode/opencode.json` file:

```json
{
  "mcp": {
    "figma": {
      "type": "remote",
      "url": "http://127.0.0.1:3845/mcp",
      "enabled": true
    }
  }
}
```

Figma Desktop steps:

1. Open the target design file in Figma Desktop.
2. Switch to Dev Mode (`SHIFT+D`).
3. In the Dev Mode inspect panel, find the layer name and click on the "Copy URL for the selected layer" button.
4. In the MCP server section right underneath it, click the settings icon and enable the MCP server.
5. Restart OpenCode after changing MCP config.

Operational notes:

- Figma Desktop must stay open.
- The target file must remain accessible.
- Dev Mode must be active.
- The desktop MCP server must be enabled.

## Codex

Use Figma's official remote MCP server or the official Codex Figma integration.

Preferred setup:

1. Install or open the Codex app.
2. Open Plugins.
3. Install Figma.
4. Complete Figma OAuth authentication.

Manual Codex CLI setup:

```bash
codex mcp add figma --url https://mcp.figma.com/mcp
```

When prompted, authenticate with Figma OAuth.

## Claude Code

Use the official Figma plugin or Figma's official remote MCP server.

Plugin setup:

```bash
claude plugin install figma@claude-plugins-official
```

Manual setup:

```bash
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

Then start a new Claude Code session, run `/mcp`, select `figma`, and authenticate through Figma OAuth.

## Cursor

Use Cursor's official Figma plugin or Figma's official remote MCP server.

Plugin setup:

```text
/add-plugin figma
```

Manual setup should add a Figma MCP server with this endpoint:

```text
https://mcp.figma.com/mcp
```

After adding the server, connect it and complete Figma OAuth authentication.

## Troubleshooting

- If no Figma tools appear, restart the agent client after changing MCP config.
- If remote MCP authentication is pending, open the client's MCP/server UI and complete Figma OAuth.
- If OpenCode cannot reach the desktop endpoint, confirm Figma Desktop is open, Dev Mode is active, and the desktop MCP server is enabled.
- If the target file is unavailable, open it in Figma Desktop or confirm the authenticated Figma account has access.
