# Avoid Tight Coupling

Use abstraction layers and dependency injection to avoid tight coupling to external dependencies. This makes code more flexible, testable, and maintainable.

## Why Avoid Tight Coupling?

- Makes testing difficult (hard to mock or replace dependencies)
- Vendor lock-in (can't easily switch to alternative packages)
- Breaks single responsibility principle (components know too much about implementation details)
- Makes refactoring risky and expensive
- Reduces code reusability across different contexts
- Hidden dependencies make code harder to understand

## Important Balance: Avoid Premature Interfaces

Avoiding tight coupling does **not** mean adding an interface for every class.

- If there is only one runtime implementation, start with a concrete class
- Use dependency injection and provider overrides for tests
- Introduce interfaces/abstract classes when multiple runtime implementations are real and current

```dart
// ✅ GOOD - concrete service + DI, easy to override in tests
class UserRepository {
  UserRepository(this.client);
  final ApiClient client;

  Future<User> fetchUser(String id) => client.fetchUser(id);
}

final userRepositoryProvider = Provider(
  (ref) => UserRepository(ref.watch(apiClientProvider)),
);
```

```dart
// Test override without forcing an abstract class
testWidgets('shows user', (tester) async {
  final fakeRepo = UserRepository(FakeApiClient());

  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        userRepositoryProvider.overrideWithValue(fakeRepo),
      ],
      child: const MyApp(),
    ),
  );
});
```

## Anti-Pattern: Direct Package Usage Throughout Codebase

```dart
// ❌ AVOID - Widget tightly coupled to Firebase
class UserProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<DocumentSnapshot>(
      stream: FirebaseFirestore.instance
          .collection('users')
          .doc(userId)
          .snapshots(),
      builder: (context, snapshot) {
        if (!snapshot.hasData) return CircularProgressIndicator();
        final data = snapshot.data!.data() as Map<String, dynamic>;
        return Text('Name: ${data['name']}');
      },
    );
  }
}
```

**Problems:** Widget directly depends on Firebase, can't test without Firebase, can't switch backends without rewriting UI.

## Solution: Repository Pattern

```dart
// ✅ GOOD - Repository isolates Firebase dependency
class UserRepository {
  UserRepository(this.firestore);
  final FirebaseFirestore firestore;

  Stream<User> watchUser(String userId) {
    return firestore
        .collection('users')
        .doc(userId)
        .snapshots()
        .map((doc) => User.fromJson(doc.data()!));
  }

  Future<void> updateUser(User user) async {
    await firestore.collection('users').doc(user.id).set(user.toJson());
  }
}

// The repository can be accessed in widgets via dependency injection
// (e.g., Riverpod, GetIt, Provider) and used to map data to the UI.
// This keeps widgets decoupled from Firebase implementation details.
```

## Anti-Pattern: Using Navigator Keys for Context

```dart
// ❌ AVOID - Utility class tightly coupled to global navigator
final navigatorKey = GlobalKey<NavigatorState>();

class DateFormatter {
  String getMonth(DateTime dateTime, {bool includeYear = false}) {
    final locale = navigatorKey.currentContext?.locale.toString();
    if (includeYear) {
      return DateFormat.yMMMM(locale).format(dateTime);
    }
    return DateFormat.MMMM(locale).format(dateTime);
  }
}
```

**Problems:** Formatter depends on Flutter framework (navigator key), can't use in non-widget contexts, hard to test.

## Solution: Dependency Injection for Context-Dependent Logic

```dart
// ✅ GOOD - Pass locale as parameter
class DateFormatter {
  String getMonth(DateTime dateTime, String locale, {bool includeYear = false}) {
    if (includeYear) {
      return DateFormat.yMMMM(locale).format(dateTime);
    }
    return DateFormat.MMMM(locale).format(dateTime);
  }
}

// Widget usage
class DateDisplay extends ConsumerWidget {
  const DateDisplay({required this.date});
  final DateTime date;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final formatter = ref.watch(dateFormatterProvider);
    final locale = ref.watch(currentLocaleProvider);
    return Text(formatter.getMonth(date, locale));
  }
}
```

**Exception:** Global navigator keys are acceptable when required by framework integration points (e.g., `RouterDelegate`, `ForceUpdateWidget`). In such cases, keep the key private to the file where it's declared and avoid using it elsewhere in the codebase.

## Testing Benefits

```dart
// Mock repository for testing
class MockUserRepository extends UserRepository {

  @override
  Stream<User> watchUser(String userId) {
    return Stream.value(User(id: userId, name: 'Test User'));
  }

  @override
  Future<void> updateUser(User user) async {}
}

// Test with override
testWidgets('displays user name', (tester) async {
  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        userRepositoryProvider.overrideWithValue(MockUserRepository()),
      ],
      child: MaterialApp(home: UserProfileScreen(userId: '123')),
    ),
  );
  await tester.pump();
  expect(find.text('Name: Test User'), findsOneWidget);
});
```
