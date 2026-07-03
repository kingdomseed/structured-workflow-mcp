# Env file pattern

Goal: Define a Dart helper class to access environment variables defined with `--dart-define` or `--dart-define-from-file`.

Create `lib/src/env/env.dart` file if missing.

Example file:

```dart
class Env {
  static String get sentryDsn => const String.fromEnvironment('SENTRY_DSN');
  // TODO: Add other environment variables as needed

  static void validate() {
    if (sentryDsn.isEmpty) {
      throw Exception('SENTRY_DSN not defined');
    }
    // TODO: Validate other environment variables as needed
  }
}
```

Example usage:

```dart
// main.dart
import '/src/env/env.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SentryFlutter.init(
    (options) {
      options.dsn = Env.sentryDsn;
    },
  );
  // Validate environment variables, ensuring they're set for production builds
  Env.validate();
  runApp(MainApp());
}
```
