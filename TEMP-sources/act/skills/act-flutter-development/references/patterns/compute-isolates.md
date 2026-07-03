# Using compute() for Expensive Operations

Use `compute()` to run expensive calculations in a separate isolate to prevent blocking the UI thread.

## When to Use

Use for operations taking > 16ms:
- JSON parsing of large payloads (> 100KB)
- Image processing (resizing, filtering)
- Heavy computations (cryptography, compression)
- Large list transformations
- File parsing (CSV, XML)

Don't use for:
- Simple operations (< 10ms)
- Operations requiring platform channels
- Code accessing UI directly

## Basic Example

```dart
import 'package:flutter/foundation.dart';

// Must be top-level or static function
List<Product> parseProducts(String jsonString) {
  final jsonList = jsonDecode(jsonString) as List;
  return jsonList.map((json) => Product.fromJson(json)).toList();
}

Future<List<Product>> fetchProducts() async {
  final response = await http.get(apiUrl);

  // ❌ Bad - Blocks UI
  final products = parseProducts(response.body);

  // ✅ Good - Runs in isolate
  final products = await compute(parseProducts, response.body);

  return products;
}
```

## Requirements

The function must be:
1. Top-level or static (not a closure)
2. Have a single parameter (use records for multiple values)
3. Return a value (not void)

```dart
// ✅ Valid
int topLevelFunction(int data) => data * 2;

class MyClass {
  // ✅ Valid
  static int staticMethod(int data) => data * 2;

  // ❌ Invalid - instance method
  int instanceMethod(int data) => data * 2;

  // ❌ Invalid - closure
  void method() {
    compute((data) => data * 2, 10); // Error!
  }
}
```

## Multiple Parameters

Use records to pass multiple values:

```dart
({String text, int count}) processData(({String text, int count}) params) {
  return (text: params.text.toUpperCase(), count: params.count * 2);
}

final result = await compute(processData, (text: 'hello', count: 5));
```

## Performance Guidelines

- Use when operation takes > 16ms (one frame at 60 FPS)
- Don't overuse - isolate creation has overhead
- Profile first - measure before optimizing
- Consider caching results to avoid repeated computation
