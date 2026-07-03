# Result Modeling: Enum vs Sealed Class

Choose the simplest result model that clearly expresses behavior.

## Rule of thumb

- Use `enum` (often with one payload object) for small, finite status sets
- Use `sealed class` when cases carry different data shapes or behaviors

## Prefer enum + payload for simple outcomes

```dart
// ✅ GOOD - simple statuses with optional metadata
enum SaveStatus { success, cancelled, error }

class SaveResult {
  const SaveResult({required this.status, this.message, this.path});
  final SaveStatus status;
  final String? message;
  final String? path;
}
```

Good fit:

- 2-4 statuses
- Mostly shared fields
- Minimal branching logic

## Use sealed classes for heterogeneous cases

```dart
// ✅ GOOD - cases have different shapes/behavior
sealed class AuthResult {}

class AuthSuccess extends AuthResult {
  AuthSuccess(this.userId);
  final String userId;
}

class AuthRequiresMfa extends AuthResult {
  AuthRequiresMfa(this.challengeId, this.maskedPhone);
  final String challengeId;
  final String maskedPhone;
}

class AuthFailure extends AuthResult {
  AuthFailure(this.code, this.message);
  final int code;
  final String message;
}
```

Good fit:

- Cases require different required fields
- Each case has distinct handling paths
- Exhaustive pattern matching adds clear value

## Avoid this smell

If you have `sealed class` with tiny subclasses that only encode status names and no unique data, use enum + payload instead.
