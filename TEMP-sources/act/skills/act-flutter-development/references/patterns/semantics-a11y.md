# Accessibility with Semantics

Use the `Semantics` widget to provide clear labels for screen readers (TalkBack/VoiceOver).

## Basic Properties

```dart
// Label and hint
Semantics(
  label: 'Email',
  hint: 'Enter your email address',
  child: TextField(),
)

// Button
Semantics(
  label: 'Submit Form',
  button: true,
  child: GestureDetector(onTap: _submitForm, child: Text('Submit')),
)

// Value for state
Semantics(
  label: 'Volume',
  value: '${volume.toInt()}%',
  child: Slider(value: volume, onChanged: (v) => setState(() => volume = v)),
)
```

## Excluding and Merging

```dart
// Hide decorative elements
ExcludeSemantics(child: Image.asset('decorative-pattern.png'))

// Merge multiple widgets
MergeSemantics(
  child: Row(children: [Icon(Icons.star), Text('4.5 stars')]),
)
```

## Dynamic State

```dart
Semantics(
  label: isPlaying ? 'Pause' : 'Play',
  button: true,
  liveRegion: true, // Announces state changes
  child: IconButton(
    icon: Icon(isPlaying ? Icons.pause : Icons.play_arrow),
    onPressed: _togglePlayback,
  ),
)
```

## Lists

```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return Semantics(
      label: items[index].title,
      hint: 'Item ${index + 1} of ${items.length}',
      child: ListTile(title: Text(items[index].title)),
    );
  },
)
```

## Best Practices

1. Describe purpose, not appearance
2. Don't repeat widget type in label
3. Hide decorative elements with ExcludeSemantics
4. Update labels when state changes
5. Test with TalkBack/VoiceOver
