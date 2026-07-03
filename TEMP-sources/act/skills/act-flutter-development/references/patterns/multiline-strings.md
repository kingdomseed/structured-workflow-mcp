# Multiline Strings

Dart supports multiline strings as a language feature.

Rather than writing this:

```dart
log(
  'OPENAI_API_KEY environment variable not set.\n'
  'Set it with: export OPENAI_API_KEY="sk-..."\n'
  'Or source the .env file: set -a; source .env; set +a',
);
```

Write this:

```dart
log('''
  OPENAI_API_KEY environment variable not set.
  Set it with: export OPENAI_API_KEY="sk-..."
  Or source the .env file: set -a; source .env; set +a'
''');
```
