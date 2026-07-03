# Exception Handling

Use try-catch blocks for proper error handling and create custom exceptions for domain-specific errors.

## Key Principles

**Keep error handling simple:**
- Avoid nested try-catch blocks - they indicate too much logic in one place
- Extract complex operations into smaller functions with focused error handling

**Apply at the right layer:**
- Handle errors at the appropriate architectural layer
- Data layer: Transform 3rd-party exceptions to domain exceptions
- Business logic: Handle domain-specific errors
- UI layer: Present user-friendly error messages

**Preserve debugging context:**
- Always capture stack traces when logging errors
- When wrapping 3rd-party exceptions, include the original exception as the cause
- This ensures error monitoring tools (Sentry, Crashlytics) have full context

## Catching Specific Exceptions

```dart
try {
  final file = File('data.txt');
  final contents = await file.readAsString();
} on FileSystemException catch (e) {
  log('File error', error: e);
  showError('File not found');
} on FormatException catch (e) {
  log('Format error', error: e);
  showError('Invalid file format');
} catch (e) {
  log('Unknown error', error: e);
  showError('An error occurred');
}
```

## Stack Traces

```dart
try {
  await riskyOperation();
} catch (e, stackTrace) {
  log('Operation failed', error: e, stackTrace: stackTrace);
}
```

## Finally Block

```dart
try {
  final contents = await file.readAsString();
  process(contents);
} catch (e) {
  log('Error reading file', error: e);
} finally {
  await file.close(); // Always executes
}
```

## Custom Exceptions

```dart
// Define custom exception
class ValidationException implements Exception {
  ValidationException(this.message);
  final String message;

  @override
  String toString() => 'ValidationException: $message';
}

// Usage
void validateEmail(String email) {
  if (!email.contains('@')) {
    throw ValidationException('Invalid email format');
  }
}

// Catch
try {
  validateEmail(userInput);
} on ValidationException catch (e) {
  showError(e.message);
}
```

## Exception Hierarchy

```dart
abstract class AppException implements Exception {
  const AppException(this.message);
  final String message;
}

class NetworkException extends AppException {
  const NetworkException([super.message = 'Network error']);
}

class AuthException extends AppException {
  const AuthException([super.message = 'Auth failed']);
}

// Usage
try {
  await apiClient.fetchData();
} on NetworkException catch (e) {
  showError(e.message);
} on AuthException catch (e) {
  navigateToLogin();
}
```

## Rethrowing

```dart
Future<User> fetchUser(String id) async {
  try {
    final response = await http.get('/users/$id');
    return User.fromJson(response.data);
  } catch (e, stackTrace) {
    log('Failed to fetch user', error: e, stackTrace: stackTrace);
    rethrow; // Let caller handle
  }
}
```

## Using Error.throwWithStackTrace

```dart
// Example: Transform 3rd-party exceptions while preserving stack traces
enum APIException { unauthorized, notFound, connectionFailed, other }

class APIClient {
  const APIClient({required this.dio});
  final Dio dio;

  Future<String> fetchFromUrl(String url) async {
    try {
      final response = await dio.get(url);
      return response.data;
    } on DioException catch (e, st) {
      final response = e.response;
      if (response == null) {
        Error.throwWithStackTrace(APIException.connectionFailed, st);
      } else {
        final exception = switch (response.statusCode) {
          401 => APIException.unauthorized,
          404 => APIException.notFound,
          _ => APIException.other,
        };
        Error.throwWithStackTrace(exception, st);
      }
    }
  }
}
```

## Best Practices

1. Catch specific exceptions first, generic last
2. Always log errors with stack traces
3. Don't swallow exceptions - handle or rethrow
4. Use custom exceptions for domain errors
5. Clean up resources in finally blocks
