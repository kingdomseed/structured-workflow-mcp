---
name: patrol-tests-architecture
description: Rules for writing Patrol E2E tests with LeanCode's recommended architecture (modules, system, api clients)
---

# Order of actions when writing new tests

## Critical precedence

Project and mission guidance overrides this generic LeanCode-style architecture skill. Use Modules/System/ApiClients when the project already follows that structure or the user asks for it. If a project uses helper-based Patrol files instead, extend those helpers consistently.

If a project bans Patrol MCP, requires shell `patrol test -t ... -d <device>`, uses semantics or typed finders as stable test surfaces, or requires repo gates such as `flutter test`, follow the project. Never run `patrol_test/*` with `flutter test`, but do not skip unrelated unit/widget test gates.

Patrol actions already wait for visibility and settle after the action. Do not add waits or pumps to fix a missed tap. A missed visible target is a target-selection, hit-test, alignment, coverage, or finder problem until proven otherwise. Extra frame pumping is allowed only after a successful action has hit the intended control and the exact async/animation/route transition being advanced is named. If a visible target is missed, instrument once, fix the target choice first, try at most one targeted fallback, then stop with evidence instead of cycling finder variants.

1. Read the key files directly (modules aggregator, test wrapper, main keys.dart, and the specific app feature files for the scenario). These are known paths — don't search for them, open them directly
2. Inspect existing modules for functions that can be reused
3. Also think if one of existing functions can be adjusted to match its existing usage and new test
4. Assign test keys to required elements if they are not assigned yet
5. Start writing test: reuse existing modules/functions + put new test steps in new test file
6. Write patrol actions directly in the test file, do not create new methods in modules
7. Run the test frequently during development — don't wait until the full test is written. Run after completing each logical group of steps to catch failures early
8. After full test passes, reorganize new code into existing/new modules. This is mandatory — the test file must only call module methods, not use Patrol APIs directly
9. Rerun the test after reorganizing to confirm it still passes

# Patrol MCP Usage

When working with Patrol tests:

- Use `patrol-run({ "testFile": "patrol_test/your_test.dart" })` to run tests and wait for completion
- If no session running: starts new session with specified test file
- If session already running: automatically restarts current tests
- Use `patrol-screenshot({ "platform": "android" })` or `patrol-screenshot({ "platform": "ios" })` to capture screenshots for debugging test failures
- Use `patrol-quit({})` to quit the session gracefully
- Use `patrol-status({})` to check current status and recent output
- Use `patrol-native-tree({})` to fetch the current native UI tree hierarchy for writing native interactions and interactions with apps other than the app under test.

# Patrol Test Architecture

## Structure

- Use custom `testApp` wrapper for all tests
- Each test file should contain only ONE test
- Organize tests using `Modules`, `System`, and `ApiClients` pattern
- Each module represents a feature from user perspective (eg. Auth, Home screen, Downloads, Player)
- System is a class for native interactions, specifically for actions that we need to perform by using $.platform that are not part of our app, eg. enabling airplane mode to test offline mode. Do not put methods here unless they don't fit any module of the app
- ApiClients - a class aggregating api clients for api communication. There will be separate clients for different apis we need to communicate with - eg. email server for testing, our test backend, or some third-party services

## Method organization in modules

- Do not write comments in all methods, use descriptive names instead
- Split long methods in modules when the method is hard to read and navigate due to its length and it represents multiple logical steps that can be descriptively named
- If there is a series of steps which is reused in many tests as a whole (e.g., long onboarding flow) create a wrapper method in the module which will call private methods for each step

# Patrol Tests Rules

## Patrol API

- Any file that directly uses Patrol APIs (`$()`, `.scrollTo()`, `.tap()`, `.enterText()`, `.waitUntilVisible()`, etc.) should `import 'package:patrol/patrol.dart';`
- ALWAYS inspect Patrol API before implementing test actions:
  - Search codebase for existing Patrol API usage patterns
  - Check $.platform APIs for the specific action
  - If method not found in codebase, check: https://patrol.leancode.co/
  - Only implement after confirming the correct API method
- ALWAYS inspect `$.platform` methods before implementing test actions
- Prefer Patrol APIs for E2E actions. `flutter_test` finders, `expect`, or `WidgetTester` access are acceptable when Patrol exposes them or the project has established helper/module patterns.
- Run Patrol E2E with the project-approved runner. If the project mandates shell `patrol test -t patrol_test/<file>_test.dart -d <device>`, use that instead of Patrol MCP. Never run `patrol_test/*` with `flutter test`; repo unit/widget gates may still require `flutter test`.
- Do not write patrolSetUp and patrolTearDown methods on your own

## Action Rules

- Do not add waits/pumps to make a missed tap work. Patrol handles ordinary visibility and post-action settling. Extra frame pumping is only for a named transition after a confirmed successful action.
- Prefer stable keys, but project patterns may use semantics labels, typed/scoped finders, or documented geometry taps for custom widgets. Follow the local test surface contract.
- Don't write try catch blocks unless absolutely necessary
- After writing test check if it works by running it with the project-approved Patrol runner, fix genuine test or product failures, and stop on infrastructure blockers with evidence.
- If test fails because element was not found, check if it need to be scrolled to in the app code and adjust the test if needed

## Assertion Rules

- Prefer final user-outcome assertions, but assertions after important state transitions are allowed when they make failures deterministic and match project helper patterns.
- Prefer using `waitUntilVisible` as assertion at the end of the test
- Use `expect()` for assertions only when `waitUntilVisible` is not enough

## Native Dialog Handling

- ALWAYS handle native dialogs that appear during the flow:
  - Handle dialogs immediately after the action that triggers them
  - For native permissions prefer `$.platform.mobile.grantPermissionWhenInUse` over `$.platform.mobile.tap`

# Test Keys

- Assign a key ONLY to widgets involved in testing
- ONLY add the `key` parameter to existing widgets
- Create new keys.dart files if needed
- Always have a maximum of one keys.dart file per feature directory, but the file can contain multiple classes
- Add imports for keys.dart files
- Update main keys.dart aggregator
- NEVER change widget signatures
- NEVER refactor existing code structure
- NEVER hardcode keys in the app, you must use keys from the keys.dart file
- NEVER create new widgets in the app
- NEVER create a key that is not assigned to a widget
- Always make sure that each key value is unique
- ALWAYS create keys.dart to store keys for the feature/widget they belong to, NOT in the main lib directory
- ALWAYS sort keys alphabetically
- The main `Keys` class in `lib/keys.dart` should only import and aggregate keys from feature-specific keys.dart files
- ALWAYS assign keys using this exact pattern: `key: keys.feature.widgetName` (unless you are using parameterized keys)
- Add keys as first parameter to the widget constructor
- Group related keys in a class named after the screen (e.g. `HomeKeys`). Use a private subclass of `ValueKey<String>` to prefix all key values with the page or widget name
- For common widgets store them in WidgetKeys class. File containing this class should be placed in the directory that the common widget is defined
- For widgets located in separate package (e.g. widgetbook) follow this pattern: in `widgetbook` directory create `keys.dart` file with `WidgetKeys` class. Those keys are assigned with `widgetKeys.tile`. Then, in keys.dart lib/ add it to the list of pages with `final widgetKeys = ds.widgetKeys;` (ds being the imported package, e.g. `import 'package:common_ui/widgets/keys.dart' as ds;`)

- If widget is not unique (for example generated from a list) use a parameterized key

  - ALWAYS prefer using enums or DTOs as the parameter if they already exist
  - Use existing widget properties for parameterized keys
  - NEVER assign a parameterized key in the app and then use fixed values for it in the keys file (and vice versa)
  - NEVER create helper methods, use parameterized keys instead
  - When widgets are generated from existing enums or DTOs, always use parameterized keys with the those enum/DTO values as the parameter

  Use individual keys when:

  - Widgets are hardcoded and known at compile time
  - Widgets have distinct, meaningful names

  Use parameterized keys when:

  - Widgets are generated from dynamic data
  - Widgets are generated from a DTO or enums
  - Number of widgets is variable or large
  - Widgets are generated in loops or from lists

**Steps to assign a key to a widget:**

1. Identify widget that is needed for testing
2. Create key assignment: `key: keys.feature.widgetName`
3. Define key in keys.dart file
4. Verify key is assigned to widget

**File Structure Examples:**

Feature-specific keys:

```
lib/features/home/keys.dart
lib/features/profile/keys.dart
lib/features/auth/keys.dart
lib/common/widgets/keys.dart
```

Main keys aggregator:

```
lib/keys.dart (imports and aggregates all feature keys)
```

**Examples**

Feature-specific keys.dart:

```dart
// lib/features/home/keys.dart
import 'package:flutter/widgets.dart';

class _HomeKey extends ValueKey<String> {
  const _HomeKey(String value) : super('home_$value');
}
class HomeKeys {
  final menuIconButton = const _HomeKey('menuIconButton');
  _HomeKey navbarItem(String label) => _HomeKey('navbarItem_$label');
}
```

Main keys aggregator:

```dart
// lib/keys.dart
import 'common/widgets/keys.dart';
import 'features/home/keys.dart';
import 'features/profile/keys.dart';

final keys = Keys();

class Keys {
   final home = HomeKeys();
   final profile = ProfileKeys();
   final widgets = WidgetKeys();
}
```

Grouping keys:
/lib/features/product/keys.dart

```dart
import 'package:flutter/widgets.dart';

class _ProductPageKey extends ValueKey<String> {
  const _ProductPageKey(String value) : super('productPage_$value');
}
class ProductPageKeys {
  final menuIconButton = const _ProductPageKey('menuIconButton');
  final productImage = const _ProductPageKey('productImage');
  final productName = const _ProductPageKey('productName');
}
class _ProductConnectingPageKey extends ValueKey<String> {
  const _ProductConnectingPageKey(String value)
    : super('productConnectingPage_$value');
}
class ProductConnectingPageKeys {
  final productImage = const _ProductConnectingPageKey('productImage');
  final productName = const _ProductConnectingPageKey('productName');
}
```

Common widgets:
/lib/common/widgets/keys.dart

```dart
import 'package:flutter/widgets.dart';

class _WidgetKey extends ValueKey<String> {
  const _WidgetKey(String value) : super('widget_$value');
}
class WidgetKeys {
  final addButton = const _WidgetKey('addButton');
  _WidgetKey assetRow(String coinTitle) => _WidgetKey('assetRow_$coinTitle');
  _WidgetKey assetSlider(SelectAssetType type) =>
      _WidgetKey('assetSlider_$type');
  final cancelButton = const _WidgetKey('cancelButton');
  final pickCurrencyButton = const _WidgetKey('pickCurrencyButton');
  final saveButton = const _WidgetKey('saveButton');
  final searchBar = const _WidgetKey('searchBar');
  final topBarHeaderMiddleText = const _WidgetKey('topBarHeaderMiddleText');
}

```

External packages:
widgetbook/keys.dart:

```dart
import 'package:flutter/widgets.dart';
final widgetKeys = WidgetBookKeys();
class _WidgetBookKey extends ValueKey<String> {
  const _WidgetBookKey(String value) : super('widgetBook_$value');
}
class WidgetBookKeys {
  final tile = const _WidgetBookKey('tile');
}

```

Importing keys from external packages to main lib/keys.dart:

```dart
import 'package:common_ui/widgets/keys.dart' as ds;
final keys = Keys();
class Keys {
  final widgetKeys = ds.widgetKeys;
}
```

Example of assigning a parameterized key to a widget:

```dart
enum SizeDTO {
  small,
  medium,
  large,
}

class PickSizeWidget extends StatelessWidget {
  Widget _sizeButton(SizeDTO size) {
    return _Button(
      key: keys.pickSize.sizeButton(size),
      value: size,
      currentValue: value,
      onPressed: onPressed,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _sizeButton(SizeDTO.small),
        _sizeButton(SizeDTO.medium),
        _sizeButton(SizeDTO.large),
      ].spaced(24),
    );
  }
}
```

keys.dart:

```dart
  _PickSizeKey sizeButton(SizeDTO size) => _PickSizeKey('sizeButton_${size.name}');
```

# Code Examples

## Module Structure

Feature module example

patrol_test/modules/home.dart

```dart
import 'package:patrol/patrol.dart';
import 'module.dart';

final class Home extends Module {
  Home(super.$);

  Future<void> navigateToSettings() async {
    await $(keys.home.settingsButton).scrollTo().tap();
  }

  Future<void> searchForItem(String searchPhrase) async {
    await $(keys.home.searchButton).scrollTo().tap();
    await $(keys.home.searchInput).enterText(searchPhrase);
    await $(keys.home.searchSubmitButton).tap();
  }
}
```

Modules aggregator

patrol_test/modules/modules.dart

```dart
final class Modules {
  Modules(this._$);
  final PatrolIntegrationTester _$;

  late final home = Home(_$);
  late final auth = Auth(_$);
}
```

## System Class

patrol_test/modules/system.dart

```dart
final class System extends PlatformAutomator {
  System({required super.config});

  Future<void> checkIfNativePlayerIsVisible() async {
    // Implementation
  }
}
```

## ApiClients Class

patrol_test/modules/api_clients.dart

```dart
final class ApiClients {
  final backend = BackendClient();
  final mailpitClient = MailpitClient();
}
```

## Complete Test Example

```dart
testApp('Download a chapter and play it offline', ($, modules, system, apiClients) async {
    await modules.auth.getAuthToken();
    await apiClients.backend.addFavourites();
    await openApp($);
    await modules.home.goToOldTestament();
    await modules.testament.expandBook(bookName: 'Book of Revelation');
    await modules.testament.chooseChapterOfBook(
      bookName: 'Book of Revelation',
      chapterIndex: 0,
    );
    await modules.player.expandChapters();
    await modules.player.downloadChapter(chapterIndex: 9);
    await modules.player.waitUntilDownloaded();
    // usage of a method from $.platform Equivalent of await $.platform.mobile.enableAirplaneMode();
    await system.enableAirplaneMode();
    await modules.player.rollDownChapters();
    await modules.player.closeChapterPlayer();
    await modules.testament.closeTestament();
    await modules.bottomNavigation.goToLibrary();
    await modules.library.goToDownloads();
    await modules.downloads.expandOldTestament();
    await modules.downloads.goToBook(bookName: 'Book of Revelation');
    await modules.player.checkIfChapterIsCorrect(chapterIndex: 0);
    await modules.player.playCurrentTrack();
    // usage of our method, which calls many methods from $.platform
    await system.checkIfNativePlayerIsVisible();
  });
```
