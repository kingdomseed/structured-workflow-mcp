# Eager provider initialization pattern (example)

This is an example of how to use eager initialization to access shared preferences in a provider/notifier.

## Shared preferences provider

```dart
// lib/src/utils/shared_preferences_provider.dart
import 'package:riverpod/riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'shared_preferences.g.dart';

@Riverpod(keepAlive: true)
Future<SharedPreferences> sharedPreferences(Ref ref) {
  return SharedPreferences.getInstance();
}
```

## Eager initialization in main

```dart
// main.dart
void main() async {
  final container = ProviderContainer();
  // Eagerly initialize shared preferences
  await container.read(sharedPreferencesProvider.future);

  // run the app
  runApp(
    UncontrolledProviderScope(
      container: container,
      child: MainApp(),
    ),
  );
```

## Usage in provider/notifier

```dart
// Inside any provider/notifier that needs access to shared preferences
SharedPreferences get _sharedPreferences =>
      ref.watch(sharedPreferencesProvider).requireValue;
```