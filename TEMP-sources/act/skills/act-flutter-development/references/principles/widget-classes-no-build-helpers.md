# Create reusable widget classes, not build helpers

Create reusable widget classes, not build helpers.

### Example

Write this:

```dart
// inside build method
return ExchangeRateHeaderContent(
  baseCurrency: chartsState.baseCurrency.name,
  targetCurrency: chartsState.targetCurrency.name,
  rate: _formatRate(displayPoint.rate),
  change: _formatChange(change, percentChange),
);

// below parent widget class
class ExchangeRateHeaderContent extends StatelessWidget {
  const ExchangeRateHeaderContent({
    super.key,
    required this.baseCurrency,
    required this.targetCurrency,
    required this.rate,
    required this.change,
  });

  final String baseCurrency;
  final String targetCurrency;
  final String rate;
  final String change;

  @override
  Widget build(BuildContext context) {
    /* return widget to be built */
  }
}
```

Rather than this:

```dart
// inside build method
return _buildContent(
  context: context,
  baseCurrency: chartsState.baseCurrency.name,
  targetCurrency: chartsState.targetCurrency.name,
  rate: _formatRate(displayPoint.rate),
  change: _formatChange(change, percentChange),
);

// helper method inside parent class
Widget _buildContent({
  required BuildContext context,
  required String baseCurrency,
  required String targetCurrency,
  required String rate,
  required String change,
}) {
  /* return widget to be built */
}
```