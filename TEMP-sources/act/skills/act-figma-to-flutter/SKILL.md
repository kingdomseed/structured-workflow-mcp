---
name: act-figma-to-flutter
description: Figma-to-Flutter workflow. Use when a user provides a Figma node, URL, selected design, or asks for Figma MCP setup instructions for Flutter work.
argument-hint: "[setup | figma_url_with_node | selected Figma node]"
tools: [Read, Glob, Grep]
---

# Figma To Flutter

Use this skill for Flutter work based on the official Figma MCP capability.

If the skill is run with `setup` as the argument, skip the normal workflow. Read `references/setup.md` and print its setup instructions for the user.

Start in inspection mode. Do not write Flutter code, export assets, or create token files until you have inspected the input design/node and shown the user an initial report with clarification items.

## Workflow

1. Inspect the supplied Figma URL/node, or the currently selected Figma node.
2. Prefer the smallest relevant node. If the selected node is too broad, inspect enough to identify the relevant child node.
3. Classify what the design represents: screen, component, component set, state matrix, flow, example data, decoration, or interactive UI.
4. Show the initial report using the template below.
5. List anything that should be clarified before proceeding, with recommended answers when reasonable.
6. Continue only after the user confirms the scope or answers the material questions.

## Initial Report Template

```text
Initial Figma Report
- Node: <name, type, dimensions>
- Classification: <screen/component/component set/state matrix/flow/example data/decoration/interactive UI>
- Likely scope: <what should be implemented or extracted>
- Out of scope: <chrome, decorative surroundings, sample data, unrelated frames>

Design Notes
- Layout: <structure, spacing, constraints, responsive risks>
- Visuals: <colors, typography, radii, effects, imagery>
- Components/states: <variants, focused/error/disabled/loading/selected states>
- Assets: <SVG/PNG export candidates and what should be built with Flutter primitives>

Flutter Read
- Widget shape: <embeddable component vs whole screen>
- State/validation: <likely ownership, form behavior, CTA enablement>
- Theme fit: <tokens that belong in ThemeData/TextTheme/ColorScheme/component themes>

Clarify Before Proceeding
1. <question> Suggestion: <recommended default and reason>
2. <question> Suggestion: <recommended default and reason>
```

## Clarify Before Coding

Always surface these when relevant:

- Scope: whether to implement the focused component/screen only, or include surrounding phone chrome, status bars, examples, and decoration. Suggest excluding decorative chrome unless explicitly requested.
- States: whether repeated frames are separate destinations or states of one UI. Suggest treating inactive, focused, active, disabled, loading, selected, and error examples as states of one component unless navigation is explicit.
- Data: whether visible values are sample content or initial runtime data. Suggest not hardcoding active-state sample values unless the design says they are real defaults.
- Validation: required fields, error timing, helper text, disabled behavior, and CTA enablement. Suggest deriving behavior from the interpreted interaction model, not from one visual state.
- Assets: which icons/images need export and in what format. Suggest Flutter primitives for simple UI, SVG for true vector assets, and PNG only for raster or complex imagery.
- Theme: whether colors, type, spacing, radii, and control states should be added to existing app theme surfaces. Suggest following the target project's existing theme conventions.

## Flutter Implementation Guidance

General:
- Inspect the target Flutter project before writing code: `pubspec.yaml`, theme files, asset conventions, target feature folders, and nearby tests/previews.
- Prefer project conventions over Figma layer structure.
- Keep reusable components embeddable. Let parent screens own `Scaffold`, routing, app bars, snack bars, and app-level layout.
- Make mobile layouts resilient with `SafeArea`, scrolling, max-width constraints, and flexible fields. Avoid fixed widths that can overflow narrow screens.

Colors and theming:
- Put shared colors, typography, shapes, spacing, radii, and component states into `ThemeData`, `TextTheme`, `ColorScheme`, `ThemeExtension`, or component themes when that matches the project.
- When exporting color palettes, prefer `ColorSwatch` over individual colors.

Forms and validation:
- For validation-heavy forms, prefer `Form`, `GlobalKey<FormState>`, `TextFormField`, field validators, `_submitted`, and `AutovalidateMode` over scattered booleans and listeners.
- Use `InputDecoration` and Material controls when they fit instead of deeply nested visual shells or custom-drawn controls that lose semantics.

Post-export:
- Run `flutter analyze` after implementation and add focused tests for non-trivial validation, formatting, button enablement, and state transitions when practical.

## Don't

- Don't treat Figma state matrices as separate Flutter routes by default.
- Don't copy generic placeholder/helper/error text as runtime validation messages without interpreting the intended semantics.
- Don't style a text field with deep `Container` / `DecoratedBox` / `Row` wrappers when `InputDecoration` can express the border, padding, hint, suffix icon, and error style.
- Don't use `keyboardType` as an input constraint; it is only a keyboard hint.
- Don't use Material icons as substitutes when Figma-exported icons are needed for fidelity.
- Don't rasterize small vector icons or marks to PNG by default.
- Don't declare the task done without reviewing asset registration, analysis results, and validation/state behavior.
- Don't use `addPostFrameCallback`, ever. If any requirement calls for it, surface this to the user and stop.
- Don't run any git commands.