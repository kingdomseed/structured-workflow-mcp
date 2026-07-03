# Sentry Dart setup

Goal: Add the Sentry intitialization code for the app.

### Prerequisites

- Env file exists in project and contains the `Env.sentryDsn` property (create it if missing, see @env).

### Installation

Run:

```zsh
flutter pub add sentry_flutter
```

### Usage

Update `main.dart` with this code:

```dart
import 'package:sentry_flutter/sentry_flutter.dart';
import '/src/env/env.dart';

// main.dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SentryFlutter.init(
    (options) {
      options.dsn = Env.sentryDsn;
      // Uncomment this if lib/src/env/flavor.dart exists
      // options.environment = getFlavor().name;
      // Use the beforeSend callback to filter which events are sent
      options.beforeSend = (SentryEvent event, dynamic hint) {
        // Ignore events that are not in release mode
        if (!kReleaseMode) {
          return null;
        }
        // Uncomment this if the project uses dio
        // If there was no response, it means that a connection error occurred
        // Do not log this to Sentry
        // final exception = event.throwable;
        // if (exception is DioException && exception.response == null) {
        //   return null;
        // }
        // * Uncomment this if the project uses Firebase
        // if (exception is FirebaseException &&
        //         // Android
        //         exception.message == "internal remote config fetch error" ||
        //         // iOS
        //         exception.message ==
        //             "The Internet connection appears to be offline.") {
        //   return null;
        // }
        // For all other events, return the event as is
        return event;
      };
    },
  );
  // ... other code
  runApp(MainApp());
}
```

### Notes

`await SentryFlutter.init` should be called right after `WidgetsFlutterBinding.ensureInitialized` and BEFORE any other initialization code. This ensures initialization errors are caught and logged to Sentry.