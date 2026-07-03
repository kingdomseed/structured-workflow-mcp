# Flutter Driver Setup Reference

Use this reference when a Flutter app needs to expose the Flutter Driver extension so Dart MCP tools can interact with the running app.

## Why This Is Needed

The Dart MCP server can discover and connect to Dart and Flutter runtimes through DTD and VM service plumbing, but Flutter Driver commands require the running app to expose the Flutter Driver extension.

For MCP actions such as tapping, scrolling, entering text, reading widget text, or waiting for widgets, launch the app through a driver entrypoint that calls `enableFlutterDriverExtension()` before starting the app.

## Required Setup

### 1. Add Flutter Driver

Add `flutter_driver` under `dev_dependencies` in `pubspec.yaml`:

```yaml
dev_dependencies:
  flutter_driver:
    sdk: flutter
```

Then run:

```bash
flutter pub get
```

### 2. Add A Driver Entrypoint

Create `test_driver/app.dart`:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'package:your_package_name/main.dart' as app;

void main() {
  enableFlutterDriverExtension(
    /*
     * Keep real browser/OS keyboard input enabled for manual testing.
     * Flutter Driver text entry emulation mocks SystemChannels.textInput;
     * when it is enabled, focusing a text field will not use the real
     * keyboard path. The tradeoff is that FlutterDriver.enterText and
     * MCP enter_text require text entry emulation to be enabled again.
     * See: https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html
     */
    enableTextEntryEmulation: false,
  );
  app.main();
}
```

Replace `your_package_name` with the `name` from `pubspec.yaml`.

If the app does not use `lib/main.dart`, import the correct entrypoint instead.

### 3. VSCode Launch Configuration (Optional)

For VS Code, add or update `.vscode/launch.json` with a configuration that points at `test_driver/app.dart`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Flutter",
      "request": "launch",
      "type": "dart"
    },
    {
      "name": "Flutter Driver Extension",
      "request": "launch",
      "type": "dart",
      "program": "test_driver/app.dart"
    }
  ]
}
```

### 4. User Launches The Driver Entrypoint

Ask the user to launch the driver entrypoint explicitly:

```bash
flutter run -t test_driver/app.dart
```

Use this driver launch when Dart MCP needs to interact with the app. Use the normal launch when MCP interaction is not needed.

The agent should not run this command by default. Instead, show the command to the user, wait for confirmation that the app is running, then connect to the already-running app through Dart MCP.

If the user explicitly asks the agent to verify the full setup end to end, the agent may run `flutter run -t test_driver/app.dart`, but must first confirm the target device, flavor, and entrypoint because `flutter run` is a long-running process.

## Verification

After the user confirms the app is running from `test_driver/app.dart`, the agent should:

1. Use the Dart MCP tooling to list available DTD URIs.
2. Connect to the relevant DTD URI.
3. List connected apps.
4. Try a lightweight interaction, such as health check, widget tree inspection, or waiting for a visible widget.

If the app is already running from `lib/main.dart`, ask the user to stop it and relaunch with `test_driver/app.dart`.

## Troubleshooting

### MCP Can See The App But Cannot Tap Or Scroll

Most likely the app was launched from `lib/main.dart`. Ask the user to stop the current app and relaunch with:

```bash
flutter run -t test_driver/app.dart
```

### Manual Keyboard Input Does Not Work In Text Fields

Flutter Driver changes text input behavior. By default, `enableFlutterDriverExtension()` enables text entry emulation, which mocks `SystemChannels.textInput`. This lets `FlutterDriver.enterText` and MCP `enter_text` inject text, but it prevents the real browser or OS keyboard path from being used when a text field is focused.

The generated driver entrypoint should pass:

```dart
enableFlutterDriverExtension(
  enableTextEntryEmulation: false,
);
```

With this setting, manual keyboard input works, but driver-based text entry will fail unless text entry emulation is enabled again at runtime.

For manual typing:

- Keep text entry emulation disabled.
- Tap or click the text field, then type using the real keyboard.

For MCP-entered text:

- Enable text entry emulation with the Dart MCP `set_text_entry_emulation` command.
- Tap or focus the target field.
- Use MCP `enter_text`.
- Disable text entry emulation again if the user needs manual keyboard input afterward.

### Import Fails In `test_driver/app.dart`

Check the package name in `pubspec.yaml`:

```yaml
name: your_package_name
```

Then use:

```dart
import 'package:your_package_name/main.dart' as app;
```

### The Project Has Multiple Entrypoints Or Flavors

Create a driver wrapper for the same entrypoint the user wants to run. Examples:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'package:your_package_name/main_staging.dart' as app;

void main() {
  enableFlutterDriverExtension(
    /*
     * Keep real browser/OS keyboard input enabled for manual testing.
     * Flutter Driver text entry emulation mocks SystemChannels.textInput;
     * when it is enabled, focusing a text field will not use the real
     * keyboard path. The tradeoff is that FlutterDriver.enterText and
     * MCP enter_text require text entry emulation to be enabled again.
     */
    enableTextEntryEmulation: false,
  );
  app.main();
}
```

Name flavor-specific wrappers clearly, such as `test_driver/app_staging.dart`.

### The App Uses Async Initialization

Keep the wrapper minimal. Call the app's existing `main()` after enabling the driver extension:

```dart
void main() {
  enableFlutterDriverExtension(
    /*
     * Keep real browser/OS keyboard input enabled for manual testing.
     * Flutter Driver text entry emulation mocks SystemChannels.textInput;
     * when it is enabled, focusing a text field will not use the real
     * keyboard path. The tradeoff is that FlutterDriver.enterText and
     * MCP enter_text require text entry emulation to be enabled again.
     */
    enableTextEntryEmulation: false,
  );
  app.main();
}
```

Do not duplicate initialization logic in the driver wrapper.

### Driver Commands Still Fail

Check these in order:

- The app was launched with `test_driver/app.dart`.
- `enableFlutterDriverExtension()` runs before `app.main()`.
- `flutter pub get` completed after adding `flutter_driver`.
- The Dart MCP connection is attached to the same running app instance.
- The target widget is present and visible before issuing tap, text, or scroll commands.

## Do Not

- Do not add `enableFlutterDriverExtension()` directly to production `lib/main.dart` by default.
- Do not create a second copy of app initialization logic in `test_driver/app.dart`.
- Do not run `flutter run`, `flutter attach`, or other long-lived app processes unless the user explicitly asks for agent-driven end-to-end verification.
- Do not use this setup as a replacement for permanent widget or integration tests.
- Do not assume Flutter Driver is present just because DTD or VM service discovery works.
