# Test Quality Contract

Criteria for distinguishing good tests from bad. Apply when writing or reviewing tests.

## Good Tests

Good tests:
- Exercise real code through **public interfaces**.
- Read like **specifications** — describe system capabilities, not implementation mechanics.
- Survive internal refactors **unchanged** (behavior didn't change, tests shouldn't either).
- Use the **same interface** a real caller or user would use.
- Test **one behavior** per test case.

### Flutter Widget Test — Good

```dart
testWidgets('shows error message when login fails', (tester) async {
  await tester.pumpWidget(buildApp(authService: FakeFailingAuth()));
  await tester.enterText(find.byKey(const Key('email-field')), 'test@test.com');
  await tester.enterText(find.byKey(const Key('password-field')), 'wrong');
  await tester.tap(find.byKey(const Key('login-button')));
  await tester.pumpAndSettle();

  expect(find.text('Invalid credentials'), findsOneWidget);
});
```

- Uses app's public UI (text fields, buttons, visible output).
- Asserts on **user-visible outcome** (error message appears).
- Would pass regardless of internal auth implementation.

### Dart Unit Test — Good

```dart
test('calculateTotal applies discount for orders above threshold', () {
  final order = Order(items: [Item(price: 150.0)]);
  final total = pricingService.calculateTotal(order);
  expect(total, 135.0); // 10% discount applied
});
```

- Tests through public method.
- Asserts on output, not internal discount lookup.

## Bad Tests

Bad tests:
- **Couple to implementation details** — break when internals change even though behavior is identical.
- **Mock internals** — verify wiring rather than behavior.
- **Use side channels** — assert via database queries, call counts, or internal state instead of public output.
- **Test configuration, not behavior** — verify setup rather than outcomes.

### Flutter Widget Test — Bad

```dart
testWidgets('login calls AuthService.signIn', (tester) async {
  final mockAuth = MockAuthService();
  when(mockAuth.signIn(any, any)).thenAnswer((_) async => User('test'));

  await tester.pumpWidget(buildApp(authService: mockAuth));
  await tester.tap(find.byKey(const Key('login-button')));
  await tester.pumpAndSettle();

  verify(mockAuth.signIn('', '')).called(1); // verifying call, not outcome
});
```

- Asserts that a **method was called**, not that the user sees the right result.
- Breaks if you rename the method or change the auth flow — even if behavior is identical.

### Dart Unit Test — Bad

```dart
test('calculateTotal calls _lookupDiscount internally', () {
  final service = PricingService();
  // Testing private method via reflection or internal spy
  expect(service.discountApplied, isTrue); // internal state
});
```

- Tests private implementation detail.
- Breaks on refactor even when public behavior is unchanged.

## Decision Matrix

| Question | Good Test | Bad Test |
| --- | --- | --- |
| What does it assert? | Public output/behavior | Internal calls/state |
| Does it break on refactor? | Only if behavior changes | Whenever internals change |
| Can a user observe this? | Yes | No |
| Does it mock boundaries? | External dependencies only | Internal collaborators |
| Does it read like a spec? | "calculates total with discount" | "calls _applyDiscount then _formatPrice" |

## Mocking Policy

- **Mock at boundaries**: External services, APIs, databases, platform channels.
- **Use fakes over mocks**: Fakes implement real interfaces with controlled behavior. Mocks verify call sequences.
- **Never mock the unit under test** or its internal collaborators.
- **Prefer constructor injection** for testability — pass dependencies explicitly.

### Example: Fake vs Mock

```dart
// Good: Fake implements the interface with controlled behavior
class FakeAuthService implements AuthService {
  bool shouldFail = false;

  @override
  Future<User> signIn(String email, String password) async {
    if (shouldFail) throw AuthException('Invalid credentials');
    return User(email: email);
  }
}

// Avoid: Mock verifies call patterns
// verify(mockAuth.signIn(any, any)).called(1);
```

## Checklist

- [ ] Tests assert on public output or user-visible behavior.
- [ ] Tests survive internal refactors when behavior is unchanged.
- [ ] Mocks are used only for external boundaries (APIs, databases, platform).
- [ ] Fakes are preferred over mocks for controlled test behavior.
- [ ] Each test reads like a specification of one behavior.
- [ ] No tests verify private methods, internal state, or call counts.
