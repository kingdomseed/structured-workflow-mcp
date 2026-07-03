# Robot Architecture

Use a composable robot architecture so journey tests read like user intent,
not widget tree plumbing.

## Design Rules

- Keep journey tests high-level and linear.
- Put widget interaction details inside robot classes.
- Expose intent-centric methods (`signIn`, `addToCart`, `submitForm`).
- Keep assertions close to domain intent, not raw widget structure.

## Baseline Structure

```dart
class Robot {
  Robot(this.tester)
      : auth = AuthRobot(tester),
        products = ProductsRobot(tester),
        cart = CartRobot(tester),
        checkout = CheckoutRobot(tester);

  final WidgetTester tester;
  final AuthRobot auth;
  final ProductsRobot products;
  final CartRobot cart;
  final CheckoutRobot checkout;

  Future<void> pumpMyApp(ProviderContainer container) async {
    await tester.pumpWidget(
      UncontrolledProviderScope(
        container: container,
        child: const MyApp(),
      ),
    );
    await tester.pumpAndSettle();
  }
}
```

## Module Boundaries

Use explicit file ownership so journeys scale without a monolithic test file:

```text
test/
  journeys/
    purchase_journey_test.dart
  robots/
    app_robot.dart
    auth_robot.dart
    products_robot.dart
    cart_robot.dart
    checkout_robot.dart
  harness/
    app_harness.dart
  fixtures/
    seed_products.dart
```

- `journeys/*_journey_test.dart`: flow orchestration only.
- `robots/*_robot.dart`: interaction + assertion APIs.
- `harness/*.dart`: app bootstrapping and dependency overrides.
- `fixtures/*.dart`: deterministic seed data and reusable fake inputs.

Keep each journey file focused on intent; do not inline full robot classes or full
harness builders in journey test files.

## Feature Robot Example

```dart
class CartRobot {
  CartRobot(this.tester);
  final WidgetTester tester;

  Future<void> addToCart() async {
    final addButton = find.byKey(const Key('add-to-cart'));
    expect(addButton, findsOneWidget);
    await tester.tap(addButton);
    await tester.pumpAndSettle();
  }

  void expectItemCount(int count) {
    expect(find.byKey(const Key('cart-item')), findsNWidgets(count));
  }
}
```

## Journey Test Example

```dart
testWidgets('purchase flow', (tester) async {
  final container = buildTestContainer();
  final r = Robot(tester);

  await r.pumpMyApp(container);
  await r.products.selectProduct(atIndex: 0);
  await r.cart.addToCart();
  await r.checkout.startCheckout();
  await r.auth.signInWithEmailAndPassword();
  await r.checkout.confirmPayment();

  r.orders.expectOrderCount(1);
});
```

## Anti-Pattern

Avoid writing journey tests with repeated low-level find/tap plumbing:

```dart
// Avoid: flow logic mixed with raw widget selectors everywhere
await tester.tap(find.text('Checkout'));
await tester.pumpAndSettle();
await tester.enterText(find.byType(TextField).first, 'test@example.com');
```

This makes tests brittle and hard to maintain.

## Checklist

- One top-level robot composes feature robots.
- Feature robots expose intent-based methods.
- Journey tests call robot methods, not raw widget internals.
- Assertions match user-visible outcomes.
- Journey files do not contain full robot/harness implementations.
- Robot, harness, and fixture files are split by responsibility.
