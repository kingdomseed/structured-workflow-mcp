# Keep It Simple (YAGNI/KISS)

Only build what is necessary to deliver current value. Avoid premature abstractions, unused features, and over-engineered solutions.

## Why Keep It Simple?

- Less code = fewer bugs, easier maintenance, faster development
- Simpler code is more flexible and easier to refactor
- Solve actual problems, not hypothetical future ones

## Anti-Pattern: Premature Abstraction

```dart
// ❌ AVOID - Creating abstraction for single use case
abstract class DataFormatter {
  String format(dynamic data);
}

class JsonFormatter implements DataFormatter {
  String format(dynamic data) => jsonEncode(data);
}

class XmlFormatter implements DataFormatter {
  String format(dynamic data) => throw UnimplementedError(); // Never used
}

class DataExporter {
  DataExporter(this.formatter);
  final DataFormatter formatter;
  String export(Map<String, dynamic> data) => formatter.format(data);
}
```

**Problem:** Complex abstraction with unused XML implementation, unnecessary indirection.

```dart
// ✅ GOOD - Direct solution
class DataExporter {
  String export(Map<String, dynamic> data) => jsonEncode(data);
}
// Add XML later if actually needed (YAGNI)
```

## Anti-Pattern: Unused Helper Functions

```dart
// ❌ AVOID - Creating helpers "just in case"
extension StringHelpers on String {
  String capitalize() => isEmpty ? this : this[0].toUpperCase() + substring(1);
  String reverse() => split('').reversed.join();
  String removeWhitespace() => replaceAll(RegExp(r'\s+'), '');
  bool isEmail() => contains('@') && contains('.');
  // ... 10 more methods, but only capitalize() is ever used
}
```

**Problem:** Nine unused methods adding complexity and maintenance burden.

```dart
// ✅ GOOD - Only create what you use
extension StringHelpers on String {
  String capitalize() => isEmpty ? this : this[0].toUpperCase() + substring(1);
}
// Add other methods when actually needed
```

## Anti-Pattern: Over-Engineered Configuration

```dart
// ❌ AVOID - Complex configuration for simple on/off toggles
class FeatureConfig {
  const FeatureConfig({
    required this.enabled,
    this.variant = 'default',
    this.rolloutPercentage = 100,
    this.allowedUserIds = const [],
    this.excludedUserIds = const [],
    this.enabledPlatforms = const ['ios', 'android', 'web'],
  });

  final bool enabled;
  final String variant;
  final int rolloutPercentage;
  final List<String> allowedUserIds;
  final List<String> excludedUserIds;
  final List<String> enabledPlatforms;
}

class FeatureFlags {
  bool isEnabled(String feature, String userId, String platform) {
    final config = _flags[feature];
    // ... complex unused logic for rollout, user filtering, platforms
    return config?.enabled ?? false;
  }
}
```

**Problem:** Complex feature flag system for simple toggles, unused rollout logic.

```dart
// ✅ GOOD - Simple flags for actual requirements
class FeatureFlags {
  static const bool newDashboard = true;
  static const bool darkMode = true;
}
// Add complexity later if actually needed
```

## Rule: Single Runtime Implementation

```dart
// ❌ AVOID - Interface only used by one runtime implementation
abstract class PaymentService {
  Future<void> charge();
}

class StripePaymentService implements PaymentService {
  @override
  Future<void> charge() async {}
}
```

**Problem:** Indirection without real runtime flexibility.

```dart
// ✅ GOOD - Start concrete, abstract only when needed
class PaymentService {
  Future<void> charge() async {}
}
```

**Guideline:** Do not add interface/abstract layers until you have 2+ real runtime implementations. Test seams alone do not justify abstraction.

## Rule: Keep Result Modeling Compact

```dart
// ❌ AVOID - Sealed hierarchy for simple statuses
sealed class SaveResult {}
class SaveSuccess extends SaveResult {}
class SaveCancelled extends SaveResult {}
class SaveError extends SaveResult {
  SaveError(this.message);
  final String message;
}
```

```dart
// ✅ GOOD - Enum + payload for simple outcomes
enum SaveStatus { success, cancelled, error }

class SaveResult {
  const SaveResult({required this.status, this.message});
  final SaveStatus status;
  final String? message;
}
```

**Guideline:** For small finite outcomes with similar shape, prefer enum + payload. Use sealed classes when cases require genuinely different data/behavior.

See also: [result-modeling-enum-vs-sealed](../patterns/result-modeling-enum-vs-sealed.md).

## Rule: Platform Split with Shared Contracts

When using conditional imports/exports, keep shared result models/contracts in one common file.

```dart
// ✅ GOOD - shared contract + platform-specific adapters
export 'file_service_stub.dart'
    if (dart.library.io) 'file_service_native.dart'
    if (dart.library.html) 'file_service_web.dart';
```

**Guideline:** Platform files should only implement platform APIs and map errors to shared models. Do not duplicate type systems per platform.

See also: [platform-split-shared-contracts](../patterns/platform-split-shared-contracts.md).

## When Abstraction Is Justified

Abstractions are good when they solve actual, current problems:

```dart
// ✅ GOOD - Multiple implementations actually needed together
abstract class Shape {
  double area();
}

class Square implements Shape {
  Square(this.side);
  final double side;
  double area() => side * side;
}

class Circle implements Shape {
  Circle(this.radius);
  final double radius;
  double area() => pi * radius * radius;
}

// Used together in practice
class AreaCalculator extends StatelessWidget {
  const AreaCalculator({required this.shapes});
  final List<Shape> shapes;

  Widget build(BuildContext context) {
    final total = shapes.fold(0.0, (sum, s) => sum + s.area());
    return Text('Total: ${total.toStringAsFixed(2)}');
  }
}
```

**When it's good:** You genuinely need multiple implementations working together, not hypothetical flexibility.

## Rule of Three

```dart
// ✅ GOOD - Wait for three similar cases before abstracting

// First occurrence - just write it
Future<User> loadUserData() async {
  try {
    return await api.fetchUser();
  } catch (e, st) {
    await Sentry.captureException(e, stackTrace: st);
    log(e.toString(), error: e, stackTrace: st);
  }
}

// Second occurrence - notice duplication but don't abstract yet
Future<Products> loadProducts() async {
  try {
    return await api.fetchProducts();
  } catch (e, st) {
    await Sentry.captureException(e, stackTrace: st);
    log(e.toString(), error: e, stackTrace: st);
  }
}

// Third occurrence - now abstract with confidence
class ErrorLogger {
  Future<void> logException(Object e, StackTrace? st) async {
    await Sentry.captureException(e, stackTrace: st);
    log(e.toString(), error: e, stackTrace: st);
  }
}

// Refactor to use the helper
Future<User> loadUserData() async {
  try {
    return await api.fetchUser();
  } catch (e, st) {
    await errorLogger.logException(e, st);
  }
}
```

**Key insight:** Three similar lines is better than a premature abstraction. Abstract based on real patterns, not speculation.

## Quick Decision Checklist

Before adding new abstractions, ask:

1. Do I have 2+ real runtime implementations today?
2. Are these result cases truly different in shape/behavior?
3. If this is cross-platform, are contracts centralized and shared?
4. Am I simplifying current code, or speculating about future needs?
