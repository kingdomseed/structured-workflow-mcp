# Dart Breaking Changes

This document lists frequently encountered breaking changes in Dart.

Write modern Dart code by following the conventions below.

## Wildcard Variables in Dart 3.7

Since Dart 3.7, the `_` character is a wildcard variable.

This means that:

- You can use it more than once in your code (e.g. inside parameter lists), without causing name collisions.
- You can't use it as an actual variable (it's only a placeholder).

### Example

Before Dart 3.7:

```dart
SliverAnimatedGrid(
  itemBuilder: (_, __, ___) {
    ...
  }
)
```

Since Dart 3.7:

```dart
SliverAnimatedGrid(
  itemBuilder: (_, _, _) {
    ...
  }
)
```

To opt-in, set SDK >= 3.7.0 in `pubspec.yaml`:

```yaml
environment:
  sdk: ^3.7.0
```
