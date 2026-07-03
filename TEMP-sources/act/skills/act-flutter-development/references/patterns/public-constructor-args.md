# Public Constructor Arguments

For simple data-holding classes where dependencies don't need to be hidden, you can make constructor arguments public to reduce boilerplate.

## Concise Approach (Public Fields)

```dart
class CurrencyApiClient implements ApiClient {
  CurrencyApiClient({required this.dio, required this.apiKey});

  final Dio dio;
  final String apiKey;
}
```

## Encapsulated Approach (Private Fields)

```dart
class CurrencyApiClient implements ApiClient {
  CurrencyApiClient({required Dio dio, required String apiKey})
      : _dio = dio,
        _apiKey = apiKey;

  final Dio _dio;
  final String _apiKey;
}
```

## When to Use Each

**Use public fields when:**
- Dependencies are simple and unlikely to change
- The class is primarily a data holder or simple service
- You prefer conciseness over strict encapsulation
- Internal implementation is stable

**Use private fields when:**
- You need to control access to dependencies
- Implementation details may change
- You want to prevent external modification
- Following strict encapsulation principles

Both approaches are valid - choose based on your team's preferences and the specific use case.
