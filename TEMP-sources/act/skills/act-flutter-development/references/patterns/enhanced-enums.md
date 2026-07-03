# Enhanced Enums in Dart 2.17

Since Dart 2.17, we can declare enums with members. 🚀

Here's an example:

```dart
enum AuthException {
  invalidEmail('Invalid email'),
  emailAlreadyInUse('Email already in use'),
  weakPassword('Password is too weak'),
  wrongPassword('Wrong password');

  const AuthException(this.message);
  final String message;
}

const exception = AuthException.wrongPassword;
print(exception.message); // Wrong password
```

What else can you do with this?

- Define multiple properties
- Add named or positional arguments to the constructor (as long as it's a const constructor)
- Define custom methods and getters

Here's another example:

```dart
enum StatusCode {
  badRequest(401, 'Bad request'),
  unauthorized(401, 'Unauthorized'),
  forbidden(403, 'Forbidden'),
  notFound(404, 'Not found'),
  internalServerError(500, 'Internal server error'),
  notImplemented(501, 'Not implemented');

  const StatusCode(this.code, this.description);
  final int code;
  final String description;

  @override
  String toString() => 'StatusCode($code, $description)';
}
```

This means that we no longer need a custom extension to "add" functionality to an enum, and this makes our code more clear and concise.

## Enum vs Sealed Class

Use enhanced enums for finite statuses that share the same shape.

```dart
// ✅ GOOD - compact status modeling
enum SyncStatus { success, cancelled, error }
```

Use sealed classes when cases need different required data or behavior.

```dart
// ✅ GOOD - heterogeneous cases
sealed class LoginResult {}

class LoginSuccess extends LoginResult {
  LoginSuccess(this.userId);
  final String userId;
}

class LoginRequiresMfa extends LoginResult {
  LoginRequiresMfa(this.challengeId);
  final String challengeId;
}

class LoginFailure extends LoginResult {
  LoginFailure(this.message);
  final String message;
}
```

If subclasses only represent status names and carry no distinct data, prefer enum + optional payload object.

See also: [result-modeling-enum-vs-sealed](result-modeling-enum-vs-sealed.md).
