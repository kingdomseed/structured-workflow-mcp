# Sentry Flutter Reference

## Dependency Versions

```yaml
dependencies:
  sentry_flutter: 9.8.0
  # If the app also uses Dio
  sentry_dio: 9.8.0

dev_dependencies:
  sentry_dart_plugin: 3.2.0

# https://docs.sentry.io/platforms/flutter/upload-debug/#available-configuration-fields
sentry:
  upload_debug_symbols: true
  upload_source_maps: false
  upload_sources: false
  project: [insert-project-name]
  org: [insert-org]
  wait_for_processing: true
  log_level: error # possible values: trace, debug, info, warn, error
  commits: auto
  ignore_missing: true
```

## Initialization Code

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SentryFlutter.init(
    (options) {
      // Set the Sentry DSN from the environment variable
      options.dsn = Env.sentryDsn;
      // If the app uses flavors, uncomment this and set the current flavor name
      //options.environment = /* get the current flavor name */;
      // Workaround for https://github.com/getsentry/sentry-dart/issues/3247
      options.tracePropagationTargets.clear();
      // Improve stack traces in the dashboard
      options
        ..considerInAppFramesByDefault = false
        ..addInAppInclude(/* extract package name from pubspec.yaml */);
      // Use the beforeSend callback to filter which events are sent
      options.beforeSend = (SentryEvent event, Hint hint) async {
        // Ignore events that are not from release builds
        if (!kReleaseMode) {
          return null;
        }
        // Only add this block if the app uses Dio:
        // If there was no response, it means that a connection error occurred
        // Do not log this to Sentry
        final exception = event.throwable;
        if (exception is DioException && exception.response == null) {
          return null;
        }
        // For all other events, return the event as is
        return event;
      };
    },
  );

  // rest of main method code
}
```
