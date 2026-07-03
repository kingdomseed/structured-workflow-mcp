---
name: act-dart-migrate-dot-shorthand
description: Migrate codebase to Dart 3.10+ dot shorthand syntax
tools: [Read, Glob, Edit, Bash, AskUserQuestion]
---

Migrate the current codebase to the new dot shorthand syntax.

## Prerequisites

**IMPORTANT:** Before starting the migration, verify that `pubspec.yaml` has SDK >= 3.10.0-0:

```yaml
environment:
  sdk: '>=3.10.0-0 <4.0.0'
```

If the SDK constraint is lower than 3.10.0-0:
1. Inform the user that dot shorthand syntax requires SDK >= 3.10.0-0
2. Ask the user to update `pubspec.yaml` first
3. **ABORT** the migration command

## Dart Dot Shorthand Syntax

### Requirements
- SDK >= 3.10.0-0 in pubspec.yaml
- Only use when type can be inferred from context

### Applicability Rules

**USE dot shorthand for:**
- Enum values
- Named constructors
- Unnamed constructors (use `.new()`)
- Static methods and fields

**DO NOT use for:**
- Static members where the context type differs from the declaring class (see Gotchas)

### Stylistic Preference

**Prefer inferring with `final/var/const` over explicit type with `.new()`:**

```dart
// ✅ PREFERRED - Use final with explicit constructor
final controller = AnimationController(vsync: this);
final scrollController = ScrollController();

// ⚠️ VALID but not preferred - Type on left forces .new()
AnimationController controller = .new(vsync: this);
ScrollController scrollController = .new();
```

**Reason:** Don't sacrifice type inference (`final`) just to use `.new()` shorthand. The primary benefit of dot shorthand is reducing verbosity when the type is already known from context, not forcing type declarations.

### Pattern Examples

#### Enums
```dart
// Flutter enums
mainAxisSize: .min,              // MainAxisSize.min
mainAxisAlignment: .start,       // MainAxisAlignment.start
crossAxisAlignment: .center,     // CrossAxisAlignment.center
textAlign: .center,              // TextAlign.center
fontWeight: .bold,               // FontWeight.bold

// Custom enums
enum LogLevel { info, warning, error, debug }
void logMessage(String msg, {LogLevel level = .info}) {}
logMessage('Error occurred', level: .error);

// Switch statements
return switch (level) {
  .debug => 'gray',
  .info => 'blue',
  .warning => 'orange',
  .error => 'red',
};
```

#### Constructors
```dart
// Named constructors - Use when type is known from context
final padding = EdgeInsets.symmetric(vertical: 8);  // Prefer explicit over .symmetric()
BorderRadius radius = .circular(2);                 // OK when type declared
decoration: BoxDecoration(borderRadius: .circular(2)), // Good - type inferred

// Named constructors in expressions (preferred use case)
Point origin = .origin();
Point p1 = .fromList([1.0, 2.0]);

// Unnamed constructors - Use final + explicit constructor (preferred)
final controller = AnimationController(vsync: this);
final scrollController = ScrollController();
final key = GlobalKey<ScaffoldMessengerState>();
final map = <String, bool>{};

// .new() is valid when type is already declared
GlobalKey<ScaffoldMessengerState> key = .new();  // Valid but less common
Map<String, bool> map = .new();                  // Valid but less common

// Generic constructors
List<int> intList = .filled(5, 0);

// Const with named constructors - Use dot shorthand (preferred)
padding: const .all(8.0),
padding: const .symmetric(horizontal: 16.0),
padding: const .only(top: 8.0, bottom: 8.0),
borderRadius: const .circular(8.0),

// Const with unnamed constructors - Keep explicit type name
duration: const Duration(milliseconds: 300),      // ✅ Keep as is
duration: const .new(milliseconds: 300),          // ❌ Don't use .new() with const
duration: const .(milliseconds: 300),             // ❌ Invalid syntax
```

#### Static Members
```dart
// Static methods
int port = .parse('8080');           // int.parse('8080')

// Static fields/getters
BigInt zero = .zero;                 // BigInt.zero
```

### Gotchas - Critical Constraint

**Icons CANNOT use dot shorthand:**
```dart
// ❌ INVALID - Will cause error
IconData icon = .info;
const Icon(.info);

// ✅ VALID - Must use full prefix
IconData icon = Icons.info;
const Icon(Icons.info);
```

**Reason:** `.info` would resolve to `IconData.info`, but `info` is defined in the `Icons` class, not the `IconData` class.

**Rule:** The static member must belong to the inferred type itself, not a related utility class.

### Decision Tree for AI Agents

1. Is SDK >= 3.10.0-0? → If no, use full prefix
2. Is this a variable declaration with explicit type on left side? → If yes, prefer `final` with full constructor name
3. Is this a const expression with an unnamed constructor (e.g., `const Duration(...)`)? → If yes, keep explicit type name (do NOT use dot shorthand)
4. Can type be inferred from context (parameter, return type, field assignment)? → If no, use full prefix
5. Is it an enum, named constructor, or static member? → If no, use full prefix
6. Is the member defined on the inferred type? → If no, use full prefix (Icons case)
7. Otherwise → Use dot shorthand

**Priority order:**
1. Type inference with `final` + full constructor > Explicit type + `.new()`
2. Const with named constructors → Use dot shorthand (e.g., `const .all(8.0)`)
3. Const with unnamed constructors → Keep explicit type (e.g., `const Duration(milliseconds: 300)`)
4. Dot shorthand for enums and static members when type is contextually known
5. Full prefix when in doubt

## Scope

- Include all non-generated `*.dart` files (typically under `lib/` and `test/`)
- Skip generated files (e.g., `*.g.dart`, `*.freezed.dart`)

## Process

1. Verify SDK version in `pubspec.yaml` (see Prerequisites)
2. Scan the codebase for applicable dot shorthand patterns
3. Apply dot shorthand transformations following the guidelines
4. Once the first pass is complete, run `flutter analyze`
5. Fix ALL analyzer issues that arise
6. Produce a detailed report of the changes

## Report Format

```markdown
## Summary of Changes

Total changes: X instances

[List of changes by type (e.g. enum values, EdgeInsets, BorderRadius, FontWeight, other constructors)]

## Skipped Changes

[List any patterns that were intentionally skipped with reasons, e.g. Icons.info - static member on wrong class]

## Verification

✅/❌ Flutter analyze results

Summary statement about compilation success.
```
