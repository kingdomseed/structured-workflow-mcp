## DOs

- DO classify repeated Figma frames before coding. Treat inactive, focused, active, disabled, loading, and error examples as states of one component unless navigation/screens are explicitly shown.
- DO narrow the implementation scope before writing Flutter code. Exclude phone chrome, status bars, and decorative examples unless the user asked for them.
- DO create a component-to-widget mapping before implementation for non-trivial designs.
- DO inspect the target Flutter project first and follow its existing folder, theme, asset, and test conventions.
- DO put reusable feature or component code where the target project convention says it belongs. Prefer a bounded feature/component area over dumping all generated code into an unrelated generic catch-all folder.
- DO extract Figma colors, typography, spacing, radii, and control states into Flutter theme surfaces where possible.
- DO prefer `ThemeData`, `TextTheme`, `ColorScheme`, `ThemeExtension`, and relevant component themes over direct global constants in every widget when the tokens are shared or project-level concerns.
- DO keep form widgets embeddable. Let the parent screen own `Scaffold`, routing, app bars, and snack bars.
- DO use `Form`, `GlobalKey<FormState>`, `TextFormField`, and field-local validators for validation-heavy form designs.
- DO model validation timing explicitly. For submit-gated errors, use a `_submitted` flag with `AutovalidateMode.disabled` before first submit and `AutovalidateMode.onUserInteraction` afterward.
- DO derive CTA enablement from the interpreted interaction model, not from one visual state alone.
- DO use `inputFormatters` for input constraints such as allowed characters, max length, automatic separators, and display formatting when the design or domain calls for them.
- DO infer semantic validation from the design and domain. Replace generic placeholder or helper copy with actual validation messages.
- DO use Flutter terminology in code and docs, such as focus lost / `onFocusLost`, not web terms like `onBlur`.
- DO use standard Material controls when they fit, such as `Checkbox` and `ElevatedButton`, then theme them.
- DO export true vector assets as SVG and register them in `pubspec.yaml`.
- DO use `CustomPainter` or inline/vector geometry for simple brand marks when raster export would be blurry.
- DO use `SafeArea`, `SingleChildScrollView`, max-width constraints, and flexible fields for mobile layouts.
- DO run `flutter analyze` after implementation and add tests for non-trivial validation, formatting, button enablement, and state transitions when practical.

## DON'Ts

- DON'T treat Figma state matrices as separate Flutter screens or routes.
- DON'T hardcode active-state sample values from Figma as initial app data unless the design is explicitly example content.
- DON'T blindly copy placeholder/error text from Figma when it is clearly generic design filler.
- DON'T style a text field with deep `Container` / `DecoratedBox` / `Row` wrappers when `InputDecoration` can express the border, padding, hint, suffix icon, and error style.
- DON'T define design tokens only as global constants referenced directly throughout widgets when an app theme is available.
- DON'T create one giant theme/token file full of unrelated surrounding-frame or out-of-scope UI tokens when implementing a narrower surface.
- DON'T expose public visual state props or create per-state widget classes unless the component is intentionally a design-system primitive or preview target.
- DON'T scatter validation across ad hoc booleans when Flutter form validators are sufficient.
- DON'T clear errors just because a field became non-empty; clear or update errors according to the validation timing model.
- DON'T use `TextEditingController.addListener` as if it only fires on text changes; it also fires on selection/cursor changes.
- DON'T enable the primary action from one unrelated control if the design implies other required inputs or conditions must be satisfied first.
- DON'T skip validation for less prominent required fields.
- DON'T rely on `keyboardType` as an input constraint. It is only a keyboard hint.
- DON'T use Material icons as a substitute for Figma-exported icons when visual fidelity matters.
- DON'T rasterize small vector icons or brand marks to PNG by default.
- DON'T repeatedly call screenshot/export flows for assets when SVG/vector export is available.
- DON'T custom-draw checkboxes with `GestureDetector` / `AnimatedContainer` unless you also handle semantics, focus, keyboard interaction, and touch target size.
- DON'T hardcode fixed widths that can overflow on narrower screens.
- DON'T make a reusable form widget return a `Scaffold` unless it is truly the whole screen.
- DON'T declare the task done without asset registration, static analysis, and a quick review of validation/state behavior.
