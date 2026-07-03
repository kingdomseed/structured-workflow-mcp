# Dispose Resources When No Longer Needed

Always dispose of controllers, stream subscriptions, timers, and animation controllers in the dispose method to prevent memory leaks.

## Why Dispose?

Failing to dispose leads to:
- Memory leaks that degrade app performance
- Unnecessary background work consuming battery
- Potential crashes when memory exhausted
- Continued execution of callbacks after widget removed

## Common Resources Requiring Disposal

- **TextEditingController**
- **AnimationController**
- **StreamSubscription**
- **Timer**
- **FocusNode**
- **ScrollController**

## Example: Multiple Disposables

```dart
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  late final TextEditingController _emailController;
  late final TextEditingController _passwordController;
  late final FocusNode _emailFocus;
  StreamSubscription<ValidationResult>? _validationSubscription;

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
    _emailFocus = FocusNode();
    _validationSubscription = validationStream.listen(_handleValidation);
  }

  @override
  void dispose() {
    // ✅ Dispose all resources
    _emailController.dispose();
    _passwordController.dispose();
    _emailFocus.dispose();
    _validationSubscription?.cancel();
    super.dispose(); // Always call super.dispose() last
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(controller: _emailController, focusNode: _emailFocus),
        TextField(controller: _passwordController),
      ],
    );
  }
}
```

## Critical Rules

1. Always call `super.dispose()` **last**
2. Use `late final` for resources created in `initState`
3. Cancel `StreamSubscription` with `.cancel()`
4. Cancel `Timer` with `.cancel()`
5. Dispose all controllers (Text, Animation, Scroll, Focus, etc.)
