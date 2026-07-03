# Use Reactive State Management

Use reactive state management solutions instead of manual widget updates via global keys or callbacks. Let the UI automatically rebuild when state changes.

## Why Use Reactive State Management?

- Eliminates tight coupling to global keys or complex callback chains
- UI automatically rebuilds when state changes (UI = f(state))
- Single source of truth makes code easier to reason about
- Reduces boilerplate (no manual coordination)
- Simpler testing (state independent of widget tree)

## Keep build() Side-Effect Free

`build()` should describe UI for current state, not perform imperative work.

### What is a side effect?

Side effects:

- Navigation (`Navigator.push/pop`)
- Showing dialogs/snackbars
- Writing state via notifiers/providers
- Network/database/file I/O
- Logging/analytics/crash reporting
- Scheduling work (`addPostFrameCallback`, timers)

Not side effects:

- Reading state/providers
- Pure transforms and formatting
- Building widgets from current values

### Important nuance

Navigation/dialog side effects are acceptable when triggered from `ref.listen` callbacks declared in `build()`, because they run on state transitions rather than as direct build-time actions.

```dart
// ✅ GOOD - transition-driven side effect
@override
Widget build(BuildContext context, WidgetRef ref) {
  ref.listen<SaveState>(saveProvider, (previous, next) {
    if (previous == next) return;
    if (next == SaveState.success) {
      showDialog<void>(
        context: context,
        builder: (_) => const AlertDialog(title: Text('Saved')),
      );
    }
  });

  final state = ref.watch(saveProvider);
  return SaveScreenBody(state: state);
}
```

```dart
// ❌ AVOID - direct side effect in build body
@override
Widget build(BuildContext context) {
  if (isSaved) {
    showDialog<void>(
      context: context,
      builder: (_) => const AlertDialog(title: Text('Saved')),
    );
  }
  return const SaveScreenBody();
}
```

See also: [pure-build-side-effects](pure-build-side-effects.md).

## Anti-Pattern: Manual Widget Updates via Global Keys

```dart
// ❌ AVOID - Using global navigator key to manually update root widget
import 'package:flutter/material.dart';

final navigatorKey = GlobalKey<NavigatorState>();

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => MyAppState();
}

class MyAppState extends State<MyApp> {
  ThemeMode _themeMode = ThemeMode.light;

  void toggleTheme() {
    setState(() {
      _themeMode = _themeMode == ThemeMode.light
          ? ThemeMode.dark
          : ThemeMode.light;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      navigatorKey: navigatorKey,
      themeMode: _themeMode,
      home: HomePage(),
    );
  }
}

// Deep in the widget tree - must reach back to root
import 'package:flutter/material.dart';
import 'package:flutter_tips_and_tricks_app/src/main.dart';

class ThemeToggleButton extends StatelessWidget {
  const ThemeToggleButton({super.key});

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(Icons.brightness_6),
      onPressed: () {
        // Reaches through navigator key to find root widget
        final state = navigatorKey.currentState?.context
            .findAncestorStateOfType<MyAppState>();
        state?.toggleTheme();
      },
    );
  }
}
```

**Problems:** Tight coupling to navigator key, widget must reach up to find root state, fragile and hard to test.

## Solution: Reactive State with ValueListenableBuilder

```dart
// ✅ GOOD - Store theme in ValueNotifier, rebuild reactively
final themeMode = ValueNotifier<ThemeMode>(ThemeMode.light);

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<ThemeMode>(
      valueListenable: themeMode,
      builder: (context, mode, _) {
        return MaterialApp(
          themeMode: mode,
          home: SettingsScreen(),
        );
      },
    );
  }
}

// Deep in the widget tree - just update the ValueNotifier
class ThemeToggleButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(Icons.brightness_6),
      onPressed: () {
        themeMode.value = themeMode.value == ThemeMode.light
            ? ThemeMode.dark
            : ThemeMode.light;
      },
    );
  }
}
```

**Benefits:** No global keys, no manual widget updates, UI automatically rebuilds when theme changes, simple and testable.

## Anti-Pattern: Callback Chains for State Updates

```dart
// ❌ AVOID - Passing callbacks through widget tree
class HomePage extends StatefulWidget {
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          CounterDisplay(counter: _counter),
          // Pass callback down through multiple levels
          SettingsSection(onIncrement: _incrementCounter),
        ],
      ),
    );
  }
}

class SettingsSection extends StatelessWidget {
  const SettingsSection({required this.onIncrement});
  final VoidCallback onIncrement;

  @override
  Widget build(BuildContext context) {
    // Pass callback further down
    return SettingsButton(onIncrement: onIncrement);
  }
}

class SettingsButton extends StatelessWidget {
  const SettingsButton({required this.onIncrement});
  final VoidCallback onIncrement;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onIncrement,
      child: Text('Increment'),
    );
  }
}
```

**Problems:** Callback drilling through multiple widget levels, tight coupling between parent and children, hard to refactor.

## Solution: Reactive State with Riverpod

```dart
// ✅ GOOD - Store state in provider, access anywhere
@riverpod
class Counter extends _$Counter {
  @override
  int build() => 0;

  void increment() => state++;
}

class HomePage extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: Column(
        children: [
          CounterDisplay(),
          SettingsSection(),
        ],
      ),
    );
  }
}

class CounterDisplay extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final counter = ref.watch(counterProvider);
    return Text('Count: $counter');
  }
}

class SettingsSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SettingsButton();  // No callback drilling
  }
}

class SettingsButton extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ElevatedButton(
      onPressed: () => ref.read(counterProvider.notifier).increment(),
      child: Text('Increment'),
    );
  }
}
```

**Benefits:** No callback drilling, any widget can access state directly, loose coupling, easy to refactor and test.

## Anti-Pattern: FutureProvider for Stream-Based Data Sources

When the data source supports streams (e.g., Drift, Firestore), using `FutureProvider` breaks reactivity. The data is fetched once, and the UI won't rebuild when the underlying data changes unless something explicitly calls `ref.invalidate()`.

```dart
// ❌ AVOID - FutureProvider with a stream-capable data source
final snapshotDetailsProvider = FutureProvider<SnapshotWithDetails?>((ref) {
  final repository = ref.watch(snapshotRepositoryProvider);
  final snapshots = ref.watch(snapshotsProvider).value;
  if (snapshots == null || snapshots.isEmpty) return null;
  // Fetches once — won't update when database row changes
  return repository.getSnapshotWithDetails(snapshots.first.id);
});
```

**Problems:** UI only updates on explicit `ref.invalidate()`. Requires manual coordination to keep data fresh. Loses the reactivity that the data source already provides.

Using `Provider<AsyncValue<T>>` to wrap a `FutureProvider` is a related smell — it indicates the upstream provider should be a `StreamProvider` instead.

## Solution: StreamProvider for Stream-Based Data Sources

```dart
// ✅ GOOD - StreamProvider delegates to the repository's watch method
final snapshotDetailsProvider = StreamProvider<SnapshotWithDetails?>((ref) {
  final repository = ref.watch(snapshotRepositoryProvider);
  final snapshots = ref.watch(snapshotsProvider).value;
  if (snapshots == null || snapshots.isEmpty) return Stream.value(null);
  // Stream re-emits when the database row changes
  return repository.watchSnapshotWithDetails(snapshots.first.id);
});
```

**Benefits:** UI rebuilds automatically when data changes. No manual `ref.invalidate()` needed. Reactivity flows from database through provider to UI.

**Rule of thumb:** If the repository has both `get*()` and `watch*()` methods, prefer `watch*()` with `StreamProvider`. Reserve `FutureProvider` for one-shot operations where the data genuinely won't change (e.g., reading a config file at startup).
