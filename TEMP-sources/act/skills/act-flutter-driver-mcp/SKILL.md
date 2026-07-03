---
name: act-flutter-driver-mcp
description: Set up Flutter Driver for Dart MCP server interaction with running Flutter apps. Use when Dart MCP, DTD, widget inspector, or driver commands cannot connect, tap, inspect, scroll, enter text, or interact with a Flutter app.
argument-hint: "[setup|verify|troubleshoot]"
tools: [Read, Write, Edit, Bash, Glob, Grep]
---

# Flutter Driver MCP

Set up a Flutter app so Dart MCP runtime tools can connect to and interact with it through Flutter Driver.

## Use This Skill When

- Dart MCP connects to a Flutter app but driver commands fail.
- Widget inspector, tap, scroll, enter text, or get text actions do not work through MCP.
- A Flutter app needs to be launched with the Flutter Driver extension enabled.
- The user asks to set up MCP interaction for a running Flutter app.

## Default Workflow

1. Determine which side is failing:
   - MCP server/client setup: Dart MCP tools are missing, roots are missing, or the client cannot start `dart mcp-server`.
   - Flutter Driver app setup: Dart MCP tools exist, but running-app interactions such as tap, scroll, text entry, widget tree, or widget waits fail.
2. For MCP server/client setup, read `references/dart-mcp-setup.md`.
3. For Flutter Driver app setup, read `references/flutter-driver-setup.md`.
4. If both are unknown, verify MCP server/client setup first, then verify Flutter Driver app setup.
5. Apply only the missing setup.
6. Run bounded static verification yourself, such as `flutter pub get` if `pubspec.yaml` changed and `flutter analyze` when appropriate.
7. Do not run the app by default. Show the user the exact driver launch command or IDE launch config, wait for confirmation that the app is running, then connect through Dart MCP.
8. If the user explicitly asks for end-to-end verification, the agent may launch the app, but must first confirm the device/flavor/entrypoint and explain that `flutter run` is a long-running process.

## References

- `references/dart-mcp-setup.md` - MCP client configuration for the Dart and Flutter MCP server.
- `references/flutter-driver-setup.md` - Flutter app entrypoint setup for driver-based MCP interaction.

If the user passes `setup`, print the relevant setup instructions before making changes unless they explicitly asked you to edit the project. If no side is specified, include both the MCP client setup and Flutter Driver app setup summaries.

## Key Rule

Running the normal Flutter entrypoint is not enough for driver-based MCP interaction. The app must be launched through an entrypoint that calls `enableFlutterDriverExtension()` before the real application `main()`.

## Guardrails

- Do not add Flutter Driver to non-Flutter Dart projects.
- Do not run `flutter run`, `flutter attach`, or other long-lived app processes unless the user explicitly asks. The user controls app launch by default; the agent connects to the already-running app.
- Do not replace the app's real `main()` implementation.
- Do not modify app behavior beyond adding a dedicated driver entrypoint.
- Do not enable the Flutter Driver extension in production `lib/main.dart` unless the user explicitly asks and accepts the risk.
- When creating a driver entrypoint, pass `enableTextEntryEmulation: false` and include the reference comment explaining the manual keyboard vs driver `enterText` tradeoff.
- Prefer a separate `test_driver/app.dart` wrapper so normal app launches remain unchanged.
- If the app uses flavors or multiple main files, mirror the chosen entrypoint and import the correct application `main()`.
- If package imports use a non-obvious package name, read `pubspec.yaml` and use its `name` value.
