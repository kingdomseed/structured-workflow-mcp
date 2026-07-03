# Theme Extensions

Add custom properties to ThemeData beyond Material Design specifications.

## Implementation

```dart
class AppColorExtension extends ThemeExtension<AppColorExtension> {
  const AppColorExtension({required this.positive, required this.negative});
  final Color positive;
  final Color negative;

  @override
  ThemeExtension<AppColorExtension> copyWith({Color? positive, Color? negative}) {
    return AppColorExtension(
      positive: positive ?? this.positive,
      negative: negative ?? this.negative,
    );
  }

  @override
  ThemeExtension<AppColorExtension> lerp(
    ThemeExtension<AppColorExtension>? other,
    double t,
  ) {
    if (other is! AppColorExtension) return this;
    return AppColorExtension(
      positive: Color.lerp(positive, other.positive, t)!,
      negative: Color.lerp(negative, other.negative, t)!,
    );
  }
}
```

## Add to Theme

```dart
ThemeData(
  extensions: <ThemeExtension<dynamic>>[
    AppColorExtension(
      positive: const Color(0xFF4CAF50),
      negative: const Color(0xFFF44336),
    ),
  ],
)
```

## Access Pattern

```dart
extension AppThemeExtensions on ThemeData {
  AppColorExtension get appColors => extension<AppColorExtension>()!;
}

// Usage
final color = Theme.of(context).appColors.positive;
```

## Key Points

- Return `ThemeExtension<T>` from `copyWith` and `lerp`
- Use `Color.lerp()` for colors, `TextStyle.lerp()` for text styles
- Create `ThemeData` extension for clean access
- Use `<ThemeExtension<dynamic>>[]` for extensions list
