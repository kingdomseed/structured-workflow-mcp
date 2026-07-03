---
name: act-flutter-development
description: This skill provides Flutter/Dart development knowledge including principles, patterns, breaking changes, and official rules. Use when writing Flutter code, planning features, or reviewing implementations.
tools: [Read]
---

<objective>
Apply Flutter/Dart best practices, architectural principles, and coding patterns to produce maintainable, performant code. This skill provides comprehensive domain expertise for Flutter development workflows.
</objective>

<essential_principles>
## Core Philosophy

**"Best Practices" do not exist.** There is only your current best understanding of how to do something in a given context. As your understanding evolves, so should your practices.

### Do as little as possible (YAGNI/KISS)
- Only build what is necessary to deliver current value
- Three similar lines is better than a premature abstraction
- Wait for clear patterns to emerge (3+ similar uses) before abstracting

### Make it work, make it right, make it fast
- Prioritize in this order: functionality first, correctness second, performance third
- Don't optimize before proving it works
- Don't make fast code that does the wrong thing

### Keep it consistent
- Use one pattern/library per task across the codebase
- Consolidate to a single approach unless there's a clear reason for variation

### Errors must be visible
- No silent failures - always log errors with context
- Fail fast and early with meaningful error messages
- Include stack traces for debugging

### State derivation over synchronization
- Don't synchronize state, derive it
- Move state to one place, derive it everywhere else
</essential_principles>

<intake>
## What do you need help with?

1. **Load official rules** — Load Flutter team's official coding rules
2. **Load essential patterns (lite)** — Load core principles and patterns summary (experimental)
3. **Load all patterns (full)** — Load all principles, patterns, aliases, and breaking changes (experimental)
4. **Browse specific topic** — Explore a specific area (patterns, principles, setup, etc.)

**Specify a number or describe your task.**
</intake>

<routing>
| Response | Action |
|----------|--------|
| 1, "prime-official", "official", "rules" | Execute workflow [prime-official.md](./workflows/prime-official.md) |
| 2, "prime-lite", "lite", "essential" | Execute workflow [prime-lite.md](./workflows/prime-lite.md) |
| 3, "prime-full", "full", "all patterns" | Execute workflow [prime-full.md](./workflows/prime-full.md) |
| 4, "browse", "specific" | Ask which topic, then read from [references/](./references/) |
| "patterns" | Read [all-patterns.md](./references/patterns/all-patterns.md) |
| "principles" | Read [all-principles-lite.md](./references/principles/all-principles-lite.md) |
| "breaking", "dart 3", "flutter 3" | Read files in [breaking/](./references/breaking/) |
| "setup", "configure" | Read files in [setup/](./references/setup/) |
| "alias", "shortcuts" | Read [aliases-flutter.md](./references/aliases-flutter.md) |
| General Flutter task | Read relevant references based on context, then assist |

**After reading relevant references, apply patterns to the user's code.**
</routing>

<quick_reference>
## Quick Reference

### Naming Conventions
- `PascalCase` for classes, `camelCase` for members, `snake_case` for files
- Prefer named arguments for functions with 2+ parameters

### Modern Dart (3.10+)
```dart
// Dot shorthand - use when type is inferred
final padding = .all(16.0);
final alignment = .center;

// Switch expressions
final message = switch (status) {
  Status.loading => 'Loading...',
  Status.success => 'Done!',
  Status.error => 'Failed',
};

// Records for multiple returns
({String name, int age}) getUserInfo() => (name: 'Alice', age: 30);
final (:name, :age) = getUserInfo();
```

### Widget Patterns
```dart
// Use spacing parameter (Flutter 3.27+)
Column(
  spacing: 16.0,
  children: [widget1, widget2, widget3],
)

// Prefer widget classes over build helpers
class MyButton extends StatelessWidget { ... }  // Good
Widget _buildButton() { ... }  // Avoid
```

### State Management
- Derive state, don't synchronize it
- Always dispose controllers, subscriptions, timers

### Error Handling
```dart
// Always log with context
catch (e, st) {
  log('Failed to fetch user', error: e, stackTrace: st);
  rethrow;
}
```
</quick_reference>

<reference_index>
## Reference Files

All detailed patterns and principles in `references/`:

| Directory | Contents |
|-----------|----------|
| [breaking/](./references/breaking/) | Breaking changes for Dart, Flutter, Riverpod |
| [patterns/](./references/patterns/) | Coding patterns (dot-shorthand, enums, spacing, etc.) |
| [principles/](./references/principles/) | Architectural principles (KISS, state management, etc.) |
| [setup/](./references/setup/) | Setup guides (Sentry, flavors, Riverpod, etc.) |

### Key Files
- [aliases-flutter.md](./references/aliases-flutter.md) — Flutter command aliases and shortcuts
- [all-patterns.md](./references/patterns/all-patterns.md) — Consolidated coding patterns
- [all-principles-lite.md](./references/principles/all-principles-lite.md) — Core review principles
- [flutter-rules-official.md](./references/flutter-rules-official.md) — Official Flutter rules
</reference_index>

<workflows_index>
## Workflows

| Workflow | Purpose |
|----------|---------|
| [prime-full.md](./workflows/prime-full.md) | Load ALL knowledge files |
| [prime-lite.md](./workflows/prime-lite.md) | Load essential knowledge only |
| [prime-official.md](./workflows/prime-official.md) | Load official Flutter rules |
</workflows_index>

<success_criteria>
## Success Criteria

Code follows Flutter best practices when:
- Uses YAGNI/KISS — no premature abstractions or unused code
- Errors are visible — logged with context, never silently swallowed
- State is derived, not synchronized — single source of truth
- Consistent patterns — one approach per task across codebase
- Modern Dart features — dot shorthand, switch expressions, records where appropriate
- Resources disposed — controllers, subscriptions, timers properly cleaned up
- Widget classes preferred — over private build helper methods
- Named arguments used — for functions with 2+ parameters
- Feature-first organization — related code colocated
</success_criteria>
