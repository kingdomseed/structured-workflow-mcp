# Dart MCP Setup Reference

Use this reference when the Dart and Flutter MCP server itself is missing, misconfigured, or cannot expose Dart and Flutter tools to the agent client.

Source: https://docs.flutter.dev/ai/mcp-server

Last checked: 2026-05-27

## What The Dart MCP Server Provides

The Dart and Flutter MCP server exposes Dart and Flutter development tools to compatible MCP clients. It can help agents analyze code, resolve symbols, inspect and interact with running apps, search pub.dev, manage dependencies, run tests, and format code.

The server is experimental and currently requires Dart 3.9 or later.

## Client Requirements

The MCP client must support stdio MCP servers.

For the best experience, the client should support:

- Tools, so the agent can call Dart and Flutter actions.
- Resources, so the agent can read exposed contextual data.
- Roots, so the server knows which project directories are in scope.

If a client claims to support roots but does not actually provide them, start the server with `--force-roots-fallback` so tools can manage roots explicitly.

## Base Command

The Dart MCP server is started with:

```bash
dart mcp-server
```

Most MCP client configuration shapes are just wrappers around this command.

## OpenCode

Use this toolkit's current OpenCode config shape rather than copying older path or field names from external examples.

Global config usually lives at:

```text
~/.config/opencode/opencode.json
```

Project config can live in:

```text
opencode.json
opencode.jsonc
.opencode/opencode.json
```

Add the Dart MCP server:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "dart-mcp-server": {
      "type": "local",
      "command": [
        "dart",
        "mcp-server"
      ],
      "enabled": true,
      "env": {}
    }
  }
}
```

If roots are not being provided correctly by the client, add the fallback flag:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "dart-mcp-server": {
      "type": "local",
      "command": [
        "dart",
        "mcp-server",
        "--force-roots-fallback"
      ],
      "enabled": true,
      "env": {}
    }
  }
}
```

Restart OpenCode after changing MCP config.

## Claude Code

Configure the Dart MCP server for the current project with:

```bash
claude mcp add --transport stdio dart -- dart mcp-server
```

## Codex CLI

Configure the Dart MCP server for the current project with:

```bash
codex mcp add dart -- dart mcp-server --force-roots-fallback
```

The official Flutter docs include `--force-roots-fallback` for Codex CLI.

## Cursor

Cursor can add the Dart MCP server through its MCP UI, or manually through `.cursor/mcp.json` for a project or `~/.cursor/mcp.json` globally:

```json
{
  "mcpServers": {
    "dart": {
      "command": "dart",
      "args": [
        "mcp-server"
      ]
    }
  }
}
```

## Gemini CLI

Add a Dart entry to the `mcpServers` section of `.gemini/settings.json` for a project or `~/.gemini/settings.json` globally:

```json
{
  "mcpServers": {
    "dart": {
      "command": "dart",
      "args": [
        "mcp-server"
      ]
    }
  }
}
```

## GitHub Copilot In VS Code

The Dart Code extension can register the Dart and Flutter MCP server through VS Code MCP APIs.

Requirements and settings from the Flutter docs:

- Dart Code extension v3.116 or later.
- Set `dart.mcpServer` to `true` in user or workspace VS Code settings if explicit enablement is needed.

```json
"dart.mcpServer": true
```

## Verification

After configuring the MCP server:

1. Restart the MCP client if it does not hot-reload MCP config.
2. Confirm Dart 3.9 or later is on PATH for the client process.
3. Confirm the client lists Dart MCP tools or resources.
4. Confirm the project root is registered with the MCP server.
5. For running app interaction, launch the app with the Flutter Driver entrypoint from `flutter-driver-setup.md`.

## Troubleshooting

### No Dart MCP Tools Appear

- Restart the client after changing MCP config.
- Confirm `dart mcp-server` works in the same shell environment as the client.
- Confirm Dart 3.9 or later is installed.
- Check that the MCP config uses the client's expected shape.

### Tools Appear But Project Context Is Missing

- Check whether the client supports MCP roots.
- Use `--force-roots-fallback` if roots are missing or unreliable.
- Confirm the correct workspace or project folder is open in the client.

### Running App Interaction Fails

- First confirm the Dart MCP server is configured and connected.
- Then confirm the Flutter app was launched through a driver entrypoint that enables `enableFlutterDriverExtension()`.
- Use `flutter-driver-setup.md` for the app-side setup.
