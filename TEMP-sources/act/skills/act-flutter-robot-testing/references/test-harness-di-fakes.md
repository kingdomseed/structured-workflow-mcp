# Test Harness with DI and Fakes

Reliable journey tests need deterministic app state and deterministic async
behavior.

## Core Rules

- Inject dependencies through providers/services, not globals.
- Override network/storage/time dependencies in tests.
- Make delays optional in fake implementations.
- Prefer deterministic `pump` strategy before `runAsync`.

## File Placement Conventions

For robot journey tests, keep harness-related code in dedicated files:
- `test/harness/*.dart`: app bootstrap, provider overrides, pump helpers
- `test/fixtures/*.dart`: reusable seed data and fake inputs
- `test/journeys/*_journey_test.dart`: imports harness/fixtures, does not inline them

This keeps journey files focused on user intent rather than setup plumbing.

## Baseline Harness Pattern

```dart
ProviderContainer buildTestContainer() {
  final fakeProducts = FakeProductsRepository(addDelay: false);
  final fakeAuth = FakeAuthRepository(addDelay: false);

  return ProviderContainer(
    overrides: [
      productsRepositoryProvider.overrideWithValue(fakeProducts),
      authRepositoryProvider.overrideWithValue(fakeAuth),
    ],
  );
}

Future<void> pumpApp(WidgetTester tester, ProviderContainer container) async {
  await tester.pumpWidget(
    UncontrolledProviderScope(
      container: container,
      child: const MyApp(),
    ),
  );
  await tester.pumpAndSettle();
}
```

## Reusable Test Container Helper

```dart
Future<ProviderContainer> createTestContainer({
  Map<String, Object> seededPrefs = const {},
  List<Override> overrides = const [],
}) async {
  SharedPreferences.setMockInitialValues(seededPrefs);
  final container = ProviderContainer(overrides: overrides);
  await container.read(sharedPreferencesProvider.future);
  return container;
}
```

## Journey Usage Example

```dart
import '../harness/app_harness.dart';
import '../fixtures/seed_orders.dart';

testWidgets('checkout journey', (tester) async {
  final harness = await createAppHarness();
  addTearDown(harness.dispose);
  await seedOrders(harness.container);

  final r = AppRobot(tester);
  await r.pumpApp(harness.container);
  // journey steps...
});
```

## Async/Timer Strategy Ladder (Required Order)

1. **Deterministic seams first**
   - inject clock/scheduler services
   - use fakes with controllable delay flags
2. **Controlled pump strategy**
   - prefer explicit `pump` / bounded `pumpAndSettle`
   - wait for observable UI state transitions
3. **Fallback only when needed**
   - use `runAsync` only when steps 1-2 are not feasible
   - document why fallback is required

## Fallback Example (Legacy Compatibility)

```dart
await tester.runAsync(() async {
  // Use only when deterministic seams cannot be applied yet.
  await executeLegacyFlow();
});
```

## Retrofit Anti-Pattern to Fix

```dart
// Avoid direct periodic timers inside UI state in test-sensitive flows.
class _ConvertScreenState extends State<ConvertScreen> {
  Timer? _refreshTimer;

  @override
  void initState() {
    super.initState();
    _refreshTimer = Timer.periodic(const Duration(hours: 1), (_) {
      // refresh
    });
  }
}
```

Refactor toward injected scheduler/clock dependencies so tests can control time.

## Checklist

- All external dependencies are overridable in tests.
- Fake dependencies expose deterministic behavior toggles.
- Journey tests do not rely on uncontrolled timers.
- Any `runAsync` usage includes explicit justification.
