# Switch Expressions with Pattern Matching

Dart 3 introduced a new pattern matching syntax for switch expressions, which are a more concise way to write switch statements.

### Example

Rather than writing this:

```dart
  String _errorMessage(DioException e) {
    switch (e.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return 'Request timed out. Please check your internet connection and try again.';

      case DioExceptionType.badResponse:
        final statusCode = e.response?.statusCode;
        switch (statusCode) {
          case 401:
            return 'Authentication failed. Please check your API key.';
          case 413:
            return 'File is too large. Maximum size is 25MB.';
          case 429:
            return 'Rate limit exceeded. Please try again later.';
          case 500:
          case 502:
          case 503:
          case 504:
            return 'OpenAI server error ($statusCode). Please try again later.';
          default:
            return 'API error ($statusCode): ${e.response?.data ?? e.message}';
        }

      case DioExceptionType.cancel:
        return 'Request was cancelled.';

      case DioExceptionType.unknown:
        if (e.error is SocketException) {
          return 'Network error. Please check your internet connection.';
        }
        return 'Unknown error: ${e.message}';

      default:
        return 'Request failed: ${e.message}';
    }
  }
```

Write this:

```dart
  static String _handleDioError(DioException e) => switch (e.type) {
        DioExceptionType.connectionTimeout ||
        DioExceptionType.sendTimeout ||
        DioExceptionType.receiveTimeout =>
          'Request timed out. Please check your internet connection and try again.',
        DioExceptionType.badResponse => switch (e.response?.statusCode) {
            401 => 'Authentication failed. Please check your API key.',
            413 => 'File is too large. Maximum size is 25MB.',
            429 => 'Rate limit exceeded. Please try again later.',
            500 || 502 || 503 || 504 =>
              'OpenAI server error (${e.response?.statusCode}). Please try again later.',
            final statusCode =>
              'API error ($statusCode): ${e.response?.data ?? e.message}',
          },
        DioExceptionType.cancel => 'Request was cancelled.',
        DioExceptionType.unknown when e.error is SocketException =>
          'Network error. Please check your internet connection.',
        DioExceptionType.unknown => 'Unknown error: ${e.message}',
        _ => 'Request failed: ${e.message}',
      };
```

Key improvements:

1. Expression-based: The function now uses => with a switch expression instead of a statement-based switch
2. Logical OR patterns: Multiple timeout cases are combined with || operator
3. Nested switch expression: The badResponse case uses a nested switch on status codes
4. Guard clauses: The when keyword handles the SocketException check for unknown errors
5. Pattern matching: Uses final statusCode to capture and use the status code in the default case
6. Wildcard pattern: Uses _ for the default case at the outer level
