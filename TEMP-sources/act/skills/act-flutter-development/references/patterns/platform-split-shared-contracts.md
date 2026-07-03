# Platform Split with Shared Contracts

When platform behavior differs, split only platform-specific implementation details. Keep shared contracts and result models in a common file.

## Goal

- Avoid duplicate native/web type hierarchies
- Keep call sites platform-agnostic
- Prevent drift in status/error handling across platforms

## Anti-pattern: duplicate models per platform

```dart
// ❌ AVOID - each platform defines its own result types
// native_file_io.dart
sealed class NativeExportResult {}
class NativeExportSuccess extends NativeExportResult {}
class NativeExportFailure extends NativeExportResult {}

// web_file_io.dart
sealed class WebExportResult {}
class WebExportDone extends WebExportResult {}
class WebExportError extends WebExportResult {}
```

Problem: duplicated concepts and inconsistent semantics.

## Good pattern: shared contract, thin platform adapters

```dart
// ✅ GOOD - one shared result model
enum ExportStatus { success, cancelled, error }

class ExportResult {
  const ExportResult._(this.status, {this.path, this.message});
  final ExportStatus status;
  final String? path;
  final String? message;

  const ExportResult.success(String path)
      : this._(ExportStatus.success, path: path);
  const ExportResult.cancelled() : this._(ExportStatus.cancelled);
  const ExportResult.error(String message)
      : this._(ExportStatus.error, message: message);
}
```

```dart
// file_export_service.dart
export 'file_export_service_stub.dart'
    if (dart.library.io) 'file_export_service_native.dart'
    if (dart.library.html) 'file_export_service_web.dart';
```

```dart
// file_export_service_native.dart
Future<ExportResult> exportFile() async {
  try {
    final path = await nativeExport();
    return ExportResult.success(path);
  } on UserCancelledException {
    return const ExportResult.cancelled();
  } catch (e) {
    return ExportResult.error(e.toString());
  }
}
```

## Checklist

1. Shared result/status models live in one common file
2. Platform files contain only platform APIs and error mapping
3. UI and domain layers depend only on shared contracts
4. Adding a platform does not require creating a new type system
