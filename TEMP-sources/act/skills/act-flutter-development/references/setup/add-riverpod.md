# Add Riverpod to the project

Goal: Add Riverpod to the project.

### Installation

Run:

```zsh
flutter pub add riverpod flutter_riverpod riverpod_annotation
flutter pub add dev:build_runner dev:riverpod_generator dev:riverpod_lint
```

### Usage

Add `ProviderScope` to the root widget:

```dart
// main.dart
void main() {
  runApp(
    ProviderScope(child: MainApp()),
  );
}
```