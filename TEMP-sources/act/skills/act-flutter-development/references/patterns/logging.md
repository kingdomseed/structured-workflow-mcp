# Structured Logging with dart:developer

Use `log()` from `dart:developer` instead of `print()` for structured logging that integrates with Dart DevTools.

Note: if the project already uses another logging package, disregard this pattern.

## Why Use log()?

- Structured logging with levels and metadata
- Integration with DevTools for filtering and searching
- Stack traces for errors
- Can be stripped from release builds
- Categorization with named loggers

## Basic Usage

```dart
import 'dart:developer';

log('Fetching user data');
```

## Named Loggers

Categorize logs by feature:

```dart
log('GET /api/users', name: 'myapp.network');
log('User authenticated', name: 'myapp.auth');
log('Query executed', name: 'myapp.database');
```

## Error Logging with Stack Traces

```dart
try {
  await riskyOperation();
} catch (e, stackTrace) {
  log(
    'Operation failed',
    name: 'myapp.error',
    error: e,
    stackTrace: stackTrace,
  );
}
```

## Complete Example

```dart
import 'dart:developer';

class ApiClient {
  Future<User> fetchUser(String id) async {
    log('Fetching user', name: 'myapp.api');

    try {
      final response = await http.get('/users/$id');
      log('User fetched', name: 'myapp.api');
      return User.fromJson(response.data);
    } catch (e, stackTrace) {
      log(
        'Failed to fetch user',
        name: 'myapp.api',
        error: e,
        stackTrace: stackTrace,
      );
      rethrow;
    }
  }
}
```

## Best Practices

1. Use named loggers to group logs by feature/module
2. Include relevant context in messages
3. Log errors with stack traces
4. Avoid logging sensitive data (passwords, tokens)
