# Selector Contract

Selector policy:
- For widget robot journeys, stable app-owned `Key` selectors are the default.
- Semantics metadata (including `Semantics.identifier`) is optional and used only
  when it adds accessibility value or supports black-box lanes.

## Preferred Selector Order

1. `find.byKey(...)` with stable keys defined in app widgets
2. `find.bySemanticsLabel(...)` or semantics identifier usage in optional lanes
3. `find.text(...)` only when copy itself is under test
4. `find.byType(...)` only for stable structural assertions, not primary actions

## Good: Key-First Contract

```dart
class SignInScreen extends StatelessWidget {
  static const emailKey = Key('email');
  static const passwordKey = Key('password');

  @override
  Widget build(BuildContext context) {
    return Column(
      children: const [
        TextField(key: emailKey),
        TextField(key: passwordKey),
      ],
    );
  }
}
```

```dart
Future<void> enterCredentials(String email, String password) async {
  await tester.enterText(find.byKey(SignInScreen.emailKey), email);
  await tester.enterText(find.byKey(SignInScreen.passwordKey), password);
}
```

## Optional: Semantics for Black-Box Lane

```dart
Semantics(
  identifier: 'save-button',
  label: 'Save profile',
  child: ElevatedButton(
    onPressed: onSave,
    child: const Text('Save'),
  ),
)
```

Use this when:
- you want explicit accessibility metadata
- automation is intentionally black-box and should not rely on widget keys

## Anti-Patterns

```dart
// Brittle: depends on mutable copy
await tester.tap(find.text('Pay'));

// Brittle: depends on widget hierarchy details
await tester.tap(find.byType(ElevatedButton).at(2));
```

## Migration Strategy

1. Identify brittle selectors in current journey tests.
2. Add stable keys to only the controls used by declared journeys.
3. Replace brittle selectors with key-based selectors in robots.
4. Add semantics metadata only if it serves accessibility or black-box lanes.

## Minimal Instrumentation Rule

Do not add keys/semantics to every interactive widget. Add only what declared
journeys require.
