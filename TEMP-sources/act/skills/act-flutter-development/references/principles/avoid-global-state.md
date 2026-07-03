# Avoid Global State

Avoid using global variables and static mutable state. Use dependency injection and state management solutions instead.

## Why Avoid Mutable Global State?

Mutable global state is particularly problematic because:

- Makes testing difficult (requires reset/cleanup between tests)
- Creates hidden dependencies that are hard to track
- Can lead to unexpected side effects and bugs
- Makes code harder to reason about and maintain
- Race conditions when multiple parts of code modify the same global state
- No clear ownership or lifecycle management
- Difficult to track when and where state changes occur

## Anti-Patterns

### Simple Global Variables

```dart
// ❌ AVOID - Global mutable state
ApiClient apiClient = ApiClient();
UserPreferences userPrefs = UserPreferences();

// ❌ AVOID - Static mutable state
class AuthService {
  static User? currentUser;
  static bool isLoggedIn = false;
}
```

### Global State with Async Initialization

```dart
// ❌ AVOID - Mutable global state with async initialization
Map<String, dynamic> appStateSettings = {};
PackageInfo? packageInfoGlobal;

Future<bool> initializeSettings() async {
  packageInfoGlobal = await PackageInfo.fromPlatform();
  appStateSettings = await getAppStateSettings();
  return true;
}
```

**Problems with this approach:**
- No guarantee initialization completed before access
- Other code can read `packageInfoGlobal` while it's still `null`
- Race conditions if called multiple times
- `appStateSettings` can be modified anywhere in the codebase
- No type safety (using `Map<String, dynamic>`)
- Difficult to mock in tests

## Preferred: Dependency Injection

### Simple Dependency Injection

```dart
// ✅ GOOD - Dependencies passed via constructor
class ProductRepository {
  ProductRepository(this.apiClient);
  final ApiClient apiClient;

  Future<List<Product>> getProducts() => apiClient.get('/products');
}

// Usage with Riverpod
@riverpod
ProductRepository productRepository(ProductRepositoryRef ref) {
  return ProductRepository(ref.watch(apiClientProvider));
}

// Usage with GetIt
final getIt = GetIt.instance;
void setupDependencies() {
  getIt.registerSingleton<ApiClient>(ApiClient());
  getIt.registerFactory<ProductRepository>(
    () => ProductRepository(getIt<ApiClient>()),
  );
}
```

### Handling Async Initialization

```dart
// ✅ GOOD - Encapsulated state with proper initialization
class AppConfig {
  AppConfig._({
    required this.packageInfo,
    required this.settings,
  });

  final PackageInfo packageInfo;
  final AppSettings settings;

  static Future<AppConfig> initialize() async {
    final packageInfo = await PackageInfo.fromPlatform();
    final settings = await getAppStateSettings();
    return AppConfig._(
      packageInfo: packageInfo,
      settings: settings,
    );
  }
}

// Usage with Riverpod
@riverpod
Future<AppConfig> appConfig(AppConfigRef ref) async {
  return AppConfig.initialize();
}

// Usage in widgets
class MyApp extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final configAsync = ref.watch(appConfigProvider);
    return configAsync.when(
      data: (config) => MaterialApp(/* use config */),
      loading: () => CircularProgressIndicator(),
      error: (err, stack) => ErrorWidget(err),
    );
  }
}

// Usage with GetIt
final getIt = GetIt.instance;
Future<void> setupDependencies() async {
  final appConfig = await AppConfig.initialize();
  getIt.registerSingleton<AppConfig>(appConfig);
}
```

## Acceptable: Immutable Constants

```dart
// ✅ OK - Truly constant values
const String apiBaseUrl = 'https://api.example.com';
const Duration requestTimeout = Duration(seconds: 30);

class AppConfig {
  static const apiBaseUrl = 'https://api.example.com';
  static const requestTimeout = Duration(seconds: 30);
}
```

## State Management Solutions

Instead of global state, use:
- **Riverpod** - Provider-based dependency injection and state management
- **BLoC/Cubit** - Stream-based state management with clear separation
- **GetIt** - Service locator for dependency injection
- **Provider** - InheritedWidget-based state management
- **InheritedWidget** - Flutter's built-in mechanism for passing data down the tree
