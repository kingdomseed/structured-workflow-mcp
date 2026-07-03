# Responsive Design with MediaQuery

Use MediaQuery.sizeOf instead of MediaQuery.of and consider LayoutBuilder for widget-specific constraints.

## MediaQuery.sizeOf vs MediaQuery.of

```dart
// ✅ PREFERRED - Only rebuilds when size changes
final size = MediaQuery.sizeOf(context);

// ❌ AVOID - Rebuilds when ANY MediaQuery property changes
final mediaQuery = MediaQuery.of(context);
final size = mediaQuery.size;
```

## Focused MediaQuery Methods

Use specific methods for better performance:

```dart
final size = MediaQuery.sizeOf(context);                      // Size only
final orientation = MediaQuery.orientationOf(context);        // Orientation only
final padding = MediaQuery.paddingOf(context);                // Padding (safe area)
final textScale = MediaQuery.textScaleFactorOf(context);      // Text scale
final brightness = MediaQuery.platformBrightnessOf(context);  // Brightness
```

## Responsive Breakpoints

```dart
class Breakpoints {
  // Just some examples, tweak them to your needs
  static const double mobile = 600;
  static const double tablet = 900;
  static const double desktop = 1200;
}

extension ResponsiveExtension on BuildContext {
  bool get isMobile => MediaQuery.sizeOf(this).width < Breakpoints.mobile;
  bool get isTablet => MediaQuery.sizeOf(this).width >= Breakpoints.mobile &&
      MediaQuery.sizeOf(this).width < Breakpoints.desktop;
  bool get isDesktop => MediaQuery.sizeOf(this).width >= Breakpoints.desktop;
}

// Usage
if (context.isMobile) {
  return const MobileLayout();
} else if (context.isTablet) {
  return const TabletLayout();
} else {
  return const DesktopLayout();
}
```

## LayoutBuilder for Widget-Specific Constraints

Use LayoutBuilder when you need constraints of a specific widget, not the entire screen:

```dart
// ✅ GOOD - Responds to parent widget's constraints
class ResponsiveCard extends StatelessWidget {
  const ResponsiveCard({super.key});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isCompact = constraints.maxWidth < 300;
        return Card(
          child: isCompact ? const _CompactLayout() : const _ExpandedLayout(),
        );
      },
    );
  }
}
```

## When to Use Each

- **MediaQuery.sizeOf** - Screen dimensions, device-based responsive layouts
- **LayoutBuilder** - Widget-specific constraints, reusable responsive components
