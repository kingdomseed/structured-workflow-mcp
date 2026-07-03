# Planning for Testability

Pre-development design decisions that make TDD cycles smooth. Apply during plan creation.

## Pre-Development Questions

Before writing any code, answer:

1. **What interface changes are needed?**
   - New classes, methods, or widgets the feature requires.
   - What the public API looks like from a caller's perspective.

2. **Which behaviors matter most?**
   - Core behaviors that must be tested first.
   - Order them by risk: highest-risk behavior → first test cycle.

3. **Can we design deep modules?**
   - Simple public interface, complex internal logic.
   - A deep module is easy to test (few entry points) and easy to use.
   - Shallow modules (many methods, little logic each) indicate missing abstraction.

4. **How do we optimize for testability?**
   - Constructor injection for dependencies.
   - Interface boundaries for external services.
   - Deterministic behavior (no hidden time/random/network dependencies).

## Designing for Testability

### Constructor Injection

Pass dependencies explicitly. This makes faking trivial in tests.

```dart
// Testable: dependency is injected
class OrderService {
  OrderService({required this.paymentGateway, required this.inventory});
  final PaymentGateway paymentGateway;
  final Inventory inventory;
}

// Hard to test: dependency is created internally
class OrderService {
  final _gateway = StripePaymentGateway(); // can't substitute in tests
}
```

### Interface Boundaries

Define abstract interfaces for external dependencies. Implement fakes for tests.

```dart
abstract class WeatherApi {
  Future<Weather> getForecast(String city);
}

// Production
class OpenWeatherApi implements WeatherApi { ... }

// Test
class FakeWeatherApi implements WeatherApi {
  Weather? nextForecast;

  @override
  Future<Weather> getForecast(String city) async =>
      nextForecast ?? Weather.sunny();
}
```

### Deep Modules

Prefer one method that does the right thing over many methods that expose internals.

```dart
// Deep: simple interface, complex logic hidden
class PricingEngine {
  Money calculateTotal(Order order); // one entry point
}

// Shallow: caller must orchestrate steps
class PricingEngine {
  List<Discount> findApplicableDiscounts(Order order);
  Money applyDiscounts(Money subtotal, List<Discount> discounts);
  Money addTax(Money amount, TaxRate rate);
  Money roundToNearestCent(Money amount);
}
```

The deep module needs one test per behavior. The shallow module forces tests for every step, coupling tests to the internal pipeline.

### Deterministic Seams

Eliminate hidden dependencies on time, randomness, or network.

```dart
// Testable: clock is injected
class SessionManager {
  SessionManager({required this.clock});
  final Clock clock;

  bool isExpired(Session session) =>
      clock.now().difference(session.createdAt) > const Duration(hours: 1);
}

// Hard to test: uses real time
class SessionManager {
  bool isExpired(Session session) =>
      DateTime.now().difference(session.createdAt) > const Duration(hours: 1);
}
```

## Test Ordering Strategy

Order tests by risk and dependency:

1. **Happy path first** — Proves the core behavior works.
2. **Critical edge cases next** — Validates boundary conditions that affect correctness.
3. **Error handling** — Verifies failures are handled gracefully.
4. **Edge cases and corner cases** — Covers remaining scenarios.

Each test in this sequence drives the next slice of implementation.

## Plan Integration

When creating implementation plans, include for each phase:

- **Test-first tasks**: Specify the behavior to test before the implementation task.
- **Test ordering**: List tests in the order they should be written (happy path → edges → errors).
- **Testability requirements**: Note any injection points or interfaces needed.
- **Verify step**: `flutter test` after each cycle, `flutter analyze` after each phase.

### Example Plan Fragment

```markdown
### Phase 1: Core pricing logic

- **Goal**: Calculate order totals with discount rules
- [ ] Define `PricingEngine` interface and `Order` model
- [ ] TDD: happy path — order with no discount returns subtotal
- [ ] TDD: discount threshold — order above $100 gets 10% off
- [ ] TDD: multiple items — total sums all item prices before discount
- [ ] TDD: edge case — empty order returns zero
- [ ] Verify: `flutter analyze` && `flutter test`
```

## Checklist

- [ ] Dependencies injected via constructor (not created internally).
- [ ] External services have abstract interfaces with test fakes.
- [ ] Modules are deep: simple interface, complex logic.
- [ ] Time, randomness, and network access go through injectable seams.
- [ ] Tests ordered: happy path → edge cases → error handling.
- [ ] Plan tasks specify test-first ordering explicitly.
