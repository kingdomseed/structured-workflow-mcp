# Use Strongly-Typed Model Classes

Parse network/API responses into strongly-typed model classes at the data layer boundary. Don't pass raw JSON (`Map<String, dynamic>`) to business logic or UI layers.

## Why Use Strongly-Typed Models?

- Type safety catches errors at compile time instead of runtime
- Auto-completion and IDE support improve developer experience
- Clear contracts between layers (data models as documentation)
- Easier testing (mock concrete types instead of arbitrary maps)
- Prevents null/type errors from spreading through the codebase

## Anti-Pattern: Using Raw JSON Throughout the App

```dart
// ❌ AVOID - Passing Map<String, dynamic> to UI layer
class CurrencyApiClient {
  Future<Map<String, dynamic>> getLatestRates(String baseCurrency) async {
    final response = await http.get(
      Uri.parse('https://api.frankfurter.dev/v1/latest?from=$baseCurrency'),
    );
    return jsonDecode(response.body) as Map<String, dynamic>;
  }
}

@riverpod
Future<Map<String, dynamic>> latestRates(Ref ref, String baseCurrency) async {
  final client = ref.watch(currencyApiClientProvider); // also declared as a provider
  return client.getLatestRates(baseCurrency);
}

// UI layer works with raw JSON
class CurrencyScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final ratesAsync = ref.watch(latestRatesProvider('GBP'));

    return ratesAsync.when(
      data: (data) {
        final base = data['base'] as String;  // Runtime cast
        final rates = data['rates'] as Map<String, dynamic>;
        final usdRate = rates['USD'] as double?;  // Can be null

        return Column(
          children: [
            Text('Base: $base'),
            if (usdRate != null) Text('USD: $usdRate'),
          ],
        );
      },
      loading: () => CircularProgressIndicator(),
      error: (err, stack) => Text('Error: $err'),
    );
  }
}
```

**Problems:** No type safety, runtime casts can fail, typos in keys ('USD' vs 'usd'), null checks scattered everywhere, hard to test.

## Solution: Strongly-Typed Model Classes

```dart
// ✅ GOOD - Parse JSON at data layer boundary
enum Currency {
  USD(desc: 'United States Dollar', symbol: '\$'),
  EUR(desc: 'Euro', symbol: '€'),
  GBP(desc: 'British Pound', symbol: '£'),
  JPY(desc: 'Japanese Yen', symbol: '¥'),
  AUD(desc: 'Australian Dollar', symbol: 'A\$');

  final String desc;
  final String symbol;

  const Currency({required this.desc, required this.symbol});

  static Currency? from(String code) {
    return Currency.values
        .where((currency) => currency.name == code)
        .firstOrNull;
  }
}

class CurrencyRates {
  CurrencyRates({
    required this.amount,
    required this.base,
    required this.date,
    required this.rates,
  });

  final double amount;
  final Currency base;
  final DateTime date;
  final Map<Currency, double> rates;

  factory CurrencyRates.fromJson(Map<String, dynamic> json) {
    // Parsing is more complex, but errors are caught at the boundary.
    // The rest of the app gets type-safe data.
    final baseCode = json['base'] as String;
    final baseCurrency = Currency.from(baseCode);
    if (baseCurrency == null) {
      throw FormatException('Unknown base currency: $baseCode');
    }

    final rawRates = json['rates'] as Map<String, dynamic>;
    final Map<Currency, double> parsedRates = {};

    for (final entry in rawRates.entries) {
      final currency = Currency.from(entry.key);
      if (currency != null) {
        parsedRates[currency] = (entry.value as num).toDouble();
      }
    }

    return CurrencyRates(
      amount: (json['amount'] as num).toDouble(),
      base: baseCurrency,
      date: DateTime.parse(json['date'] as String),
      rates: parsedRates,
    );
  }
}

// API client returns strongly-typed model
class CurrencyApiClient {
  Future<CurrencyRates> getLatestRates(Currency baseCurrency) async {
    final response = await http.get(
      Uri.parse('https://api.frankfurter.dev/v1/latest?from=${baseCurrency.name}'),
    );
    final json = jsonDecode(response.body) as Map<String, dynamic>;
    return CurrencyRates.fromJson(json);  // Parse at boundary
  }
}

@riverpod
Future<CurrencyRates> latestRates(Ref ref, Currency baseCurrency) async {
  final client = ref.watch(currencyApiClientProvider);
  return client.getLatestRates(baseCurrency);
}

// UI layer works with type-safe model
class CurrencyScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final ratesAsync = ref.watch(latestRatesProvider(Currency.GBP));

    return ratesAsync.when(
      data: (rates) {
        final usdRate = rates.rates[Currency.USD];  // Type-safe access

        return Column(
          children: [
            Text('Base: ${rates.base.desc}'),  // Auto-complete works
            if (usdRate != null)
              Text('${Currency.USD.symbol}$usdRate'),
          ],
        );
      },
      loading: () => CircularProgressIndicator(),
      error: (err, stack) => Text('Error: $err'),
    );
  }
}
```

**Benefits:** Compile-time type safety, auto-completion, refactoring support, errors caught at data layer boundary, cleaner UI code.

**Trade-off:** The `fromJson` parsing code is more complex, but this complexity is localized to one place. The validation and error handling happen at the boundary, and the rest of the app can safely use the strongly-typed models without defensive checks.

## Value Semantics for Model Classes

When models contain collections (`Map`, `List`, `Set`), ensure equality/hash behavior matches semantics.

- Include all semantic fields in `==` and `hashCode`
- Use deep/deterministic equality for collections
- Avoid order-sensitive hashing for unordered collections

```dart
// ✅ GOOD - explicit deep equality for map fields
@override
bool operator ==(Object other) {
  return other is CurrencyRates &&
      other.base == base &&
      _mapEquals(other.rates, rates);
}

@override
int get hashCode {
  final sortedEntries = rates.entries.toList()
    ..sort((a, b) => a.key.name.compareTo(b.key.name));
  return Object.hash(base, Object.hashAll(sortedEntries));
}

bool _mapEquals<K, V>(Map<K, V> a, Map<K, V> b) {
  if (a.length != b.length) return false;
  for (final entry in a.entries) {
    if (b[entry.key] != entry.value) return false;
  }
  return true;
}
```

## Testing Benefits

```dart
// Easy to create test data with strongly-typed models
void main() {
  test('fromJson parses valid response', () {
    final json = {
      'amount': 1.0,
      'base': 'USD',
      'date': '2024-01-15',
      'rates': {'EUR': 0.86, 'GBP': 0.76},
    };

    final rates = CurrencyRates.fromJson(json);

    expect(rates.base, Currency.USD);
    expect(rates.rates[Currency.EUR], 0.86);
  });

  test('fromJson throws on invalid currency', () {
    final json = {
      'amount': 1.0,
      'base': 'INVALID',
      'date': '2024-01-15',
      'rates': {},
    };

    expect(
      () => CurrencyRates.fromJson(json),
      throwsA(isA<FormatException>()),
    );
  });
}
```
