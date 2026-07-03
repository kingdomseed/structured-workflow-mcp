# Force update pattern

Goal: Show a force update alert dialog to the user if the app is out of date.

Add all the necessary code according to the steps below.

### Prerequisites

- Env file exists in project and contains the `Env.appStoreId` property (create it if missing, see @env).
- Adaptive alert dialog already exists in project (create it if missing, see @adaptive-alert-dialog).
- Url launcher package already exists in project (install it if missing).

### Installation

Run:

```zsh
flutter pub add force_update_helper
```

### Usage

Example implementation:

```dart
import 'package:url_launcher/url_launcher.dart';
import '/src/env/env.dart';
import '/src/common_widgets/show_alert_dialog.dart';

void main() {
  runApp(const MainApp());
}

final _rootNavigatorKey = GlobalKey<NavigatorState>();

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // ... other properties
      navigatorKey: _rootNavigatorKey,
      builder: (context, child) {
        return ForceUpdateWidget(
          navigatorKey: _rootNavigatorKey,
          forceUpdateClient: ForceUpdateClient(
            // TODO: Real apps should fetch this from an API endpoint or via Firebase Remote Config
            fetchRequiredVersion: () => Future.value('2.0.0'),
            iosAppStoreId: Env.appStoreId,
          ),
          allowCancel: false,
          showForceUpdateAlert: (context, allowCancel) => showAlertDialog(
            context: context,
            title: 'App Update Required',
            content: 'Please update to continue using the app.',
            cancelActionText: allowCancel ? 'Later' : null,
            defaultActionText: 'Update Now',
          ),
          showStoreListing: (storeUrl) async {
            if (await canLaunchUrl(storeUrl)) {
              await launchUrl(
                storeUrl,
                // * Open app store app directly (or fallback to browser)
                mode: LaunchMode.externalApplication,
              );
            } else {
              log('Cannot launch URL: $storeUrl');
            }
          },
          onException: (e, st) {
            log(e.toString());
          },
          child: child!,
        );
      },
    );
  }
}
```

### Notes

- If the project already contains a wrapper for url_launcher, use that instead of the url_launcher API directly.
- If the project already contains an error logger, use that in the `onException` callback.
