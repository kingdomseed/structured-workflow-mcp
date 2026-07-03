# Instance-Based Design vs Static-Based Design

When creating classes with dependencies, prefer instance-based design over static-based design.

## Good Example: Instance-Based Design

```dart
// Definition - dependencies injected via constructor
class AnalyticsService {
  AnalyticsService({
    required this.httpClient,
    required this.storage,
  });

  final HttpClient httpClient;
  final SecureStorage storage;

  Future<void> trackEvent(String eventName, Map<String, dynamic> data) async {
    final userId = await storage.getUserId();
    await httpClient.post('/events', {
      'event': eventName,
      'userId': userId,
      'data': data,
      'timestamp': DateTime.now().toIso8601String(),
    });
  }
}

// Creation - provide real implementations
final analyticsService = AnalyticsService(
  httpClient: HttpClient(),
  storage: SecureStorage(),
);

// Usage
await analyticsService.trackEvent('user_login', {'method': 'email'});

// Testing - provide mock implementations
final mockAnalyticsService = AnalyticsService(
  httpClient: MockHttpClient(),
  storage: MockSecureStorage(),
);
```

## Bad Example: Static-Based Design

```dart
// Definition - dependencies hidden inside static methods
class AnalyticsService {
  static Future<void> trackEvent(String eventName, Map<String, dynamic> data) async {
    // Hard-coded dependencies make testing impossible
    final httpClient = HttpClient();
    final storage = SecureStorage();

    final userId = await storage.getUserId();
    await httpClient.post('/events', {
      'event': eventName,
      'userId': userId,
      'data': data,
      'timestamp': DateTime.now().toIso8601String(),
    });
  }
}

// Usage - looks simple but hides problems
await AnalyticsService.trackEvent('user_login', {'method': 'email'});

// Testing - IMPOSSIBLE to mock dependencies
// You can't test this without making real network calls and storage access
```

## Why Instance-Based Design is Better

1. **Testability**: Dependencies can be mocked or stubbed in tests
2. **Flexibility**: Easy to swap implementations (e.g., different storage backends)
3. **Dependency Injection**: Dependencies are explicit and visible
4. **No Hidden State**: All dependencies are clear in the constructor
5. **Multiple Instances**: Can create different configurations when needed

## When to Use Static Design

Static methods are appropriate for:
- Pure utility functions with no dependencies
- Constants and configuration values
- Factory methods

```dart
// Good use of static - pure utility function
class MathUtils {
  static double calculatePercentage(double value, double total) {
    return (value / total) * 100;
  }
}
```