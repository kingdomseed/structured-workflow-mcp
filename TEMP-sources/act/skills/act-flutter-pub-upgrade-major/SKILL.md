---
name: act-flutter-pub-upgrade-major
description: Upgrade all Flutter package dependencies to the latest compatible major versions. Use after act-flutter-create or when the user wants to update all dependencies.
tools: [Bash]
---

# Flutter Pub Upgrade Major

Upgrade all Flutter package dependencies to their latest compatible major versions, then verify the project still builds and passes tests.

## Execution

Run the ACT-owned script through the shared helper so it resolves correctly from any caller working directory:

```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-flutter-pub-upgrade-major/scripts/flutter-pub-upgrade-major.sh
```

The script:

1. **Upgrades dependencies** - Runs `flutter pub upgrade --major-versions`
2. **Runs static analysis** - Executes `flutter analyze` to catch breaking changes
3. **Runs tests** - Executes `flutter test` to verify functionality
4. **Reminds about platform testing** - Prompts user to test on all supported platforms

## What the Script Does

- Upgrades all dependencies to latest compatible major versions
- Reports any errors from the upgrade process
- Runs `flutter analyze` to detect breaking API changes
- Runs `flutter test` to catch regressions
- Displays a reminder to manually test on all supported platforms

## Post-Upgrade

After a successful upgrade:

1. Review the changes in `pubspec.yaml` and `pubspec.lock`
2. Run the app on all supported platforms (iOS, Android, Web, macOS, Windows, Linux)
3. Test any platform-specific functionality
4. Commit the changes using conventional commits format: `chore: upgrade dependencies to latest major versions`
