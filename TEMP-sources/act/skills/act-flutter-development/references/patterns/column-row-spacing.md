# Row and Column spacing argument

Since Flutter 3.27, you can pass a `spacing` argument to your `Row` and `Column` widgets.

This means you no longer need a `SizedBox` to add fixed spacing between each child.

## Example

Before (using `SizedBox` for uniform spacing):

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.stretch,
  children: [
    Expanded(child: ColoredBox(color: Colors.green)),
    SizedBox(height: 16.0),
    Expanded(child: ColoredBox(color: Colors.orange)),
    SizedBox(height: 16.0),
    Expanded(child: ColoredBox(color: Colors.red)),
  ],
)
```

After (using `spacing` parameter):

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.stretch,
  spacing: 16.0,
  children: [
    Expanded(child: ColoredBox(color: Colors.green)),
    Expanded(child: ColoredBox(color: Colors.orange)),
    Expanded(child: ColoredBox(color: Colors.red)),
  ],
)
```

The `spacing` parameter also works with `flex` for mixed fixed/proportional layouts:

```dart
Column(
  spacing: 16.0,
  children: [
    Expanded(flex: 3, child: ColoredBox(color: Colors.green)),
    Expanded(flex: 2, child: ColoredBox(color: Colors.orange)),
    Expanded(flex: 1, child: ColoredBox(color: Colors.red)),
  ],
)
```

## When to apply

Only suggest this pattern when ALL of the following are true:
- Multiple `SizedBox` widgets are used between children
- ALL `SizedBox` widgets have the **same** height (for Column) or width (for Row)
- The spacing is purely for visual separation (not conditional or dynamic)

## When NOT to apply

Do NOT suggest this pattern when:
- `SizedBox` widgets have **different** sizes (e.g., `SizedBox(height: 8)` and `SizedBox(height: 16)`)
- Only a single `SizedBox` exists between children
- Spacing varies based on conditions or widget type
- `SizedBox` is used for purposes other than inter-child spacing (e.g., fixed height containers)

### Example of non-uniform spacing (DO NOT flag)

```dart
// This should NOT be converted - spacing is not uniform
Column(
  children: [
    Text('Title'),
    SizedBox(height: 8),   // 8px after title
    Text('Subtitle'),
    SizedBox(height: 24),  // 24px before button (different!)
    ElevatedButton(...),
  ],
)
```
