# Keep build() Pure (Avoid Side Effects in Build)

Treat `build()` as a pure projection from state to UI.

## Why this matters

- Rebuilds can happen often and unpredictably
- Side effects in `build()` can run multiple times unintentionally
- Hidden lifecycle coupling makes tests flaky and debugging harder
- Pure builds are easier to reason about and refactor

## What is a side effect?

Side effects are operations that do more than compute UI:

- Navigation (`Navigator.push/pop`)
- Showing dialogs/snackbars
- Writing state (`ref.read(...).set...`, notifier mutations)
- Network/database/file I/O
- Logging/analytics/crash reporting
- Scheduling work (`addPostFrameCallback`, timers)

Not side effects:

- Reading providers/state (`ref.watch`, `ref.read`)
- Pure transforms (`map`, `where`, formatting)
- Building widgets from current state

## Anti-pattern: trigger effects directly in build

```dart
// ❌ AVOID - Side effect in build body
@override
Widget build(BuildContext context, WidgetRef ref) {
  final saveState = ref.watch(saveProvider);
  if (saveState == SaveState.success) {
    showDialog<void>(
      context: context,
      builder: (_) => const AlertDialog(title: Text('Saved')),
    );
  }
  return const SaveScreenBody();
}
```

Problem: every rebuild that still satisfies the condition may retrigger the effect.

## Good: react to transitions with ref.listen

```dart
// ✅ GOOD - Effect runs on state transition, not every build
@override
Widget build(BuildContext context, WidgetRef ref) {
  ref.listen<SaveState>(saveProvider, (previous, next) {
    if (previous == next) return;

    if (next == SaveState.success) {
      showDialog<void>(
        context: context,
        builder: (_) => const AlertDialog(title: Text('Saved')),
      );
    }
  });

  final state = ref.watch(saveProvider);
  return SaveScreenBody(state: state);
}
```

This is acceptable even when `ref.listen` is declared in `build()`, because the side effect is tied to provider state transitions, not direct build execution.

## Practical guidelines

1. Keep `build()` focused on rendering only
2. Prefer transition-driven effects (`ref.listen`) over conditional effects in build
3. Guard repeated events (`previous == next`, status checks)
4. Use `mounted` checks after async boundaries before UI interactions
5. Reserve `addPostFrameCallback` for specific framework timing needs, not general app flow orchestration
