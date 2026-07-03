---
name: act-flutter-screenshot
description: Capture screenshots from running Flutter apps on iOS/Android simulators and devices. Use for visual verification loops to check if UI matches expectations.
argument-hint: "[output_path] [--device <device_id>]"
tools: [Bash, Read]
---

# Flutter Screenshot

Capture screenshots from running Flutter apps for visual verification.

## Purpose

This skill enables Claude to:
- Capture screenshots of running Flutter apps
- Visually verify UI implementations match expectations
- Debug layout and styling issues
- Create verification loops during development

## Arguments

- `output_path` (optional): Where to save the screenshot. Defaults to `/tmp/flutter-screenshots/YYYYMMDD-HHMMSS-screenshot.png`
- `--device, -d <device_id>` (optional): Target a specific device by ID or name prefix
- `--list-devices, -ld` (optional): List available device identifiers

## Prerequisites

A Flutter app must be running on a connected device or simulator. Check available devices:

```bash
flutter devices
```

## Execution

**Important:** If code changes were made since the last reload, prompt the user to hot reload (or hot restart) before capturing. Do NOT attempt to run `flutter attach` — it is unreliable and often hangs. The user controls the running app and can reload instantly.

Run the ACT-owned script through the shared helper so it resolves correctly from any caller working directory:

```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-flutter-screenshot/scripts/flutter-screenshot.sh [output_path] [--device <device_id>]
```

## Example Usage

**List available devices:**
```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-flutter-screenshot/scripts/flutter-screenshot.sh --list-devices
```

**Take a screenshot (default location):**
```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-flutter-screenshot/scripts/flutter-screenshot.sh
```

**Save to specific path:**
```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-flutter-screenshot/scripts/flutter-screenshot.sh ./screenshots/home-screen.png
```

**Target a specific device:**
```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-flutter-screenshot/scripts/flutter-screenshot.sh --device device-id
```

**Both custom path and device:**
```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-flutter-screenshot/scripts/flutter-screenshot.sh ./screenshots/android-test.png --device device-id
```

## Verification Loop Workflow

Use this skill in a verification loop to validate UI changes:

1. **Make code changes** — Implement the UI modification
2. **Prompt user to hot reload** — Ask the user to reload the app (do NOT use `flutter attach`)
3. **Capture screenshot** — Run this skill to capture current state
4. **Analyze** — Claude reads the screenshot and verifies it matches expectations
5. **Iterate** — If issues found, make corrections and repeat

### Example Verification Prompt

After making UI changes:

```
Take a screenshot of the app and verify:
- The header shows "Settings"
- There are 3 list items visible
- The primary color is blue (#2196F3)
```

## What the Script Does

1. Validates Flutter is installed and a device is available
2. Captures screenshot using `flutter screenshot`
3. Reports the file path so Claude can read and analyze it

## Output

The script outputs the path to the saved screenshot. Claude can then use the Read tool to view and analyze the image.

## Troubleshooting

**No connected devices:**
```bash
flutter devices  # List available devices
flutter emulators --launch <emulator_name>  # Launch an emulator
```

**Screenshot fails:**
- Ensure the app is running and visible on screen
- Check the device is unlocked
- Try specifying the device explicitly with `--device`

## Notes

- Screenshots capture the entire screen including status bar
- For Flutter-only content (no status bar), use Skia mode with VM service URL
- Screenshots are PNG format by default
