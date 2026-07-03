# Flutter Breaking Changes

This document lists frequently encountered breaking changes in Flutter.

Write modern Flutter code by following the conventions below.

## Color API Deprecations in Flutter 3.27

To support the latest wide gamut color spaces, Flutter 3.27 has deprecated some properties and methods in the `Color` class.

### Example

Before Flutter 3.27:

```dart
// These are all deprecated
color.withOpacity(0.5);
color.opacity; // 0.0 to 1.0
color.alpha; // 0 to 255
color.red; // 0 to 255
color.green; // 0 to 255
color.blue; // 0 to 255
```

Since Flutter 3.27:

```dart
// These are all new
color.withValues(alpha: 0.5);
color.a; // 0.0 to 1.0
color.r; // 0.0 to 1.0
color.g; // 0.0 to 1.0
color.b; // 0.0 to 1.0
```