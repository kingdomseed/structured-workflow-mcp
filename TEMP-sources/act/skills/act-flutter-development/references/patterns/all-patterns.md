# Custom Flutter/Dart Coding Patterns

This document consolidates specific coding patterns and best practices based on the patterns defined in this directory.

## Code Style and Organization

### Constant Sizes
* Use predefined constant sizes for paddings, gaps, rounded corners, etc.
* Define all sizes in a centralized `Sizes` class (e.g., `lib/src/constants/app_sizes.dart`)
* Create const gap widgets (`gapH16`, `gapW16`) for consistent spacing
* Example: `padding: EdgeInsets.all(Sizes.p16)` instead of `EdgeInsets.all(16.0)`

### Folder Structure
* Organize code by feature rather than by type for better modularity
* Use feature-first approach for complex features, type-first for simple ones
* Keep related code together within feature folders
* Only share code in `common/` when used by 2+ features

### Naming Conventions
* Use `PascalCase` for classes
* Use `camelCase` for members/variables/functions/enums
* Use `snake_case` for files
* Prefer named arguments for functions with 2+ parameters for clarity

## Modern Dart Features

### Enhanced Enums (Dart 2.17+)
* Use enums with members, properties, and methods
* Define const constructors with properties
* Add custom methods and getters to enums
* Example: `enum StatusCode { success(200, 'OK'), ... }`

### Switch Expressions with Pattern Matching (Dart 3)
* Use switch expressions instead of switch statements for conciseness
* Combine cases with logical OR patterns (`||`)
* Use guard clauses with `when` keyword
* Use pattern matching with `final` to capture values
* Use `_` for wildcard/default cases

### Dot Shorthand Syntax (Dart 3.10+)
* Use dot shorthand for enums, named constructors, and static members when type can be inferred
* Prefer `final` with explicit constructor over explicit type with `.new()`
* Use for const named constructors: `const .all(8.0)`
* Don't use for Icons (e.g., use `Icons.info`, not `.info`)
* Keep explicit type for const unnamed constructors: `const Duration(milliseconds: 300)`

### Records (Dart 3)
* Use records to return multiple values instead of creating single-use classes
* Prefer named fields for clarity: `({String name, int age})`
* Use destructuring: `final (:name, :age) = getUserInfo();`
* Don't use records for complex types with behavior - use classes instead

### Result Modeling (Enum vs Sealed)
* Prefer `enum` (often with one payload object) for small finite statuses
* Use `sealed class` only when cases require different data shapes/behavior
* Avoid sealed subclasses that only encode status names

### Multiline Strings
* Use triple quotes (`'''`) for multiline strings instead of string concatenation with `\n`

## Architecture Patterns

### Instance-Based Design Over Static
* Prefer instance-based classes with dependency injection
* Avoid static methods with hidden dependencies
* Make dependencies explicit in constructors
* Reserve static methods for pure utility functions with no dependencies

### Avoid Global State
* Don't use global variables or static mutable state
* Use dependency injection and state management solutions
* Immutable constants are acceptable
* Choose one state-management and dependency-injection approach and use it consistently across the codebase

### Single Runtime Implementation First
* Start with concrete classes when only one runtime implementation exists
* Add interfaces/abstract classes when 2+ real runtime implementations are needed
* Do not add abstraction layers solely for tests
* Prefer dependency overrides/fakes at the composition boundary for Test Seams

### Public vs Private Constructor Arguments
* For simple classes preferring conciseness: use public fields (`required this.dio`)
* For strict encapsulation: use private fields with initializer list
* Both approaches are valid - choose based on team preferences and context

## Widget Patterns

### Widget Classes Over Build Helpers
* Create reusable widget classes instead of private build helper methods
* Use `StatelessWidget` or `StatefulWidget` for reusable UI components
* Example: `class ExampleWidget extends StatelessWidget` not `Widget _buildExample()`

### Pure Build Methods
* Keep `build()` as UI projection from state
* Avoid direct side effects in build body (navigation, dialogs, I/O, logging)
* Transition-driven effects via state-transition listeners are acceptable; avoid direct side effects in build

### Column and Row Spacing (Flutter 3.27+)
* Use `spacing` parameter instead of `SizedBox` between children
* Combine spacing with flex for mixed fixed/proportional layouts
* Example: `Column(spacing: 16.0, children: [...])`

### Const Constructors for Performance
* Use `const` constructors for widgets whenever possible to reduce rebuilds
* Mark widgets as const in build methods when all parameters are const
* Use const for gap widgets and static UI elements
* Enables better compile-time optimizations and reduces memory allocation

### ListView.builder for Performance
* Use `ListView.builder` for lists with > 20 items for lazy loading
* Use `ListView.separated` when separators are needed
* Specify `itemExtent` or `prototypeItem` when items have uniform height
* Reserve `ListView(children: [])` for small, static lists only

### Expanded and Flexible
* Use `Expanded` to make widgets fill available space in Row/Column
* Use `Flexible` when widgets should adapt but not necessarily fill
* Control proportions with `flex` parameter
* Prevents overflow in Row/Column layouts

## State Management and Performance

### Resource Disposal
* Always dispose controllers, subscriptions, timers, and animation controllers
* Call `super.dispose()` last in dispose method
* Use `late final` for resources created in `initState`
* Cancel StreamSubscription and Timer with `.cancel()`

### Build Method Performance
* Never perform expensive operations in `build()` methods
* No network calls, heavy computations, or I/O operations
* Don't create controllers in build - use `initState`
* Cache expensive calculations in state variables

### Using compute() for Expensive Operations
* Use `compute()` for operations taking > 16ms to avoid blocking UI
* Good for: JSON parsing (> 100KB), image processing, heavy computations
* Function must be top-level or static, single parameter, non-void return
* Use records for multiple parameters: `await compute(fn, (param1: x, param2: y))`

### Eager Initialization of Async Dependencies
* Use for async dependencies like SharedPreferences
* Initialize startup-critical async dependencies during app bootstrap before rendering dependent UI
* Expose readiness as typed state (loading, ready, error) and consume dependencies only when ready

## Cross-Platform Patterns

### Platform Split with Shared Contracts
* Use conditional imports/exports only for platform-specific implementation
* Keep shared contracts and result models in common files
* Platform adapters should map platform errors to shared result types
* Avoid duplicate native/web type hierarchies for the same concept

## Error Handling and Logging

### Exception Handling
* Catch specific exceptions first, generic last
* Always log errors with stack traces
* Use custom exceptions for domain-specific errors
* Create exception hierarchies extending base `AppException`
* Use `finally` blocks for resource cleanup
* Don't swallow exceptions - handle or rethrow

### Logging with dart:developer
* Use `log()` from `dart:developer` instead of `print()`
* Import: `import 'dart:developer';` (no alias needed)
* Use named loggers to categorize: `log('message', name: 'myapp.feature')`
* Include error and stackTrace parameters for exceptions
* Use log levels: 500 (debug), 800 (info), 900 (warning), 1000 (error)
* Note: Disregard if project uses another logging package

## Responsive Design

### MediaQuery Best Practices
* Use `MediaQuery.sizeOf(context)` instead of `MediaQuery.of(context)`
* Use specific methods: `orientationOf()`, `paddingOf()`, `textScaleFactorOf()`
* Define responsive breakpoints (e.g., mobile < 600, tablet < 1200, desktop >= 1200)
* Use `LayoutBuilder` for widget-specific constraints, not screen dimensions

## Theming

### Theme Extensions
* Use `ThemeExtension` for custom properties beyond Material Design
* Implement `copyWith` and `lerp` methods
* Add to ThemeData: `extensions: <ThemeExtension<dynamic>>[...]`
* Access with extension method for clean API: `Theme.of(context).appColors`

## Accessibility

### Semantics for Screen Readers
* Use `Semantics` widget to provide labels for screen readers
* Provide `label` describing purpose, `hint` for additional context
* Mark interactive elements with `button: true`
* Use `value` for current state (e.g., slider values)
* Hide decorative elements with `ExcludeSemantics`
* Merge related widgets with `MergeSemantics`
* Use `liveRegion: true` for dynamic state changes
* Test with TalkBack (Android) and VoiceOver (iOS)

## Best Practices Summary

* Prefer composition over inheritance
* Use const constructors to improve performance
* Always dispose resources to prevent memory leaks
* Keep build methods fast and side-effect free
* Use records for simple multi-value returns
* Leverage modern Dart features (enhanced enums, switch expressions, pattern matching)
* Model simple status outcomes with enum + payload before sealed hierarchies
* Make dependencies explicit through constructors
* Keep platform-specific code in thin adapters with shared contracts
* Avoid global state and static mutable fields
* Use structured logging with proper categorization
* Handle errors with specific exception types and proper logging
* Make apps accessible with Semantics widgets
* Use feature-first organization for larger codebases
