# Riverpod Breaking Changes

This document lists frequently encountered breaking changes in Riverpod.

Write modern Riverpod code by following the conventions below.

## Riverpod 3.0

### valueOrNull is now value

- `.valueOrNull` is now `.value`

### Reading notifiers

Given this notifier:

```dart
part 'user_prefs_notifier.g.dart';

@riverpod
class UserPrefsNotifier extends _$UserPrefsNotifier {
  ...

  void method()
}
```

In Riverpod 2.x, it can be accessed like this:

```dart
ref.read(userPrefsNotifierProvider)
ref.watch(userPrefsNotifierProvider)
ref.read(userPrefsNotifierProvider.notifier).method()
```

But in Riverpod 3.0, `Notifier` should be omitted from the provider name:

```dart
ref.read(userPrefsProvider)
ref.watch(userPrefsProvider)
ref.read(userPrefsProvider.notifier).method()
```

### Deprecated legacy providers

- `ChangeNotifierProvider`, `StateProvider` and `StateNotifierProvider` have been moved to `package:flutter_riverpod/legacy.dart`

## Riverpod 2.6

### Deprecated all Ref subclasses. Instead, use Ref itself.

Before, a prefix was added to the type of `Ref` inside a provider. Example:

```dart
@riverpod
Future<List<ChartDataPoint>> chartData(ChartDataRef ref) async {
  ...
}
```

Since Riverpod 2.6, this is simply called `Ref`:

```dart
@riverpod
Future<List<ChartDataPoint>> chartData(Ref ref) async {
  ...
}
```