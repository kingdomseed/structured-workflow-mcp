# Avoid long methods

Keep methods short and focused. Long methods are harder to read, test, and maintain.

### Guidelines

- **50+ lines**: Consider refactoring
- **100+ lines**: Strongly consider refactoring
- If one method mixes **multiple responsibilities**, refactor even if short

### Mixed-responsibility smell

A method is too large when it does several of these at once:

- UI composition
- State orchestration
- Side effects (navigation/dialogs/I/O/logging)
- Domain/business policy decisions
- Data mapping/parsing

Split by responsibility, not only by line count.

### Refactoring strategies

**For `build()` methods**: Extract sections into separate widget classes (see [widget-classes-no-build-helpers](widget-classes-no-build-helpers.md)).

Also keep `build()` pure: avoid direct side effects in the build body. Use transition-driven callbacks such as `ref.listen` when needed (see [pure-build-side-effects](pure-build-side-effects.md)).

**For business logic**: Extract into well-named helper methods or separate classes.

If a single class becomes a "feature hub" (many unrelated flows), split by feature section and workflow ownership.

**For test setup**: Use helper functions or `setUp()` methods.

### Example

A long build method:

```dart
@override
Widget build(BuildContext context) {
  // 150 lines of nested widgets...
}
```

Should become:

```dart
@override
Widget build(BuildContext context) {
  return Column(
    children: [
      const HeaderSection(),
      ContentSection(data: data),
      const FooterSection(),
    ],
  );
}
```

Where `HeaderSection`, `ContentSection`, and `FooterSection` are separate widget classes.

### Class-level guidance

Long methods often indicate oversized classes/files.

- If one widget/screen owns unrelated flows, split into focused section widgets and workflow helpers.
- Keep each class responsible for one primary reason to change.
