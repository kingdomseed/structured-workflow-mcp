# Constant Sizes

Use predefined constant sizes for paddings, gaps, rounded corners, etc., rather than hardcoding them in the app.

All the sizes should be defined in this file:

```dart
// lib/src/constants/app_sizes.dart
import 'package:flutter/material.dart';

/// Constant sizes to be used in the app (paddings, gaps, rounded corners etc.)
class Sizes {
  static const p4 = 4.0;
  static const p8 = 8.0;
  static const p12 = 12.0;
  static const p16 = 16.0;
  static const p20 = 20.0;
  static const p24 = 24.0;
  static const p32 = 32.0;
  static const p40 = 40.0;
  static const p48 = 48.0;
  static const p64 = 64.0;
  static const p80 = 80.0;
}

/// Constant gap widths
const gapW4 = SizedBox(width: Sizes.p4);
const gapW8 = SizedBox(width: Sizes.p8);
const gapW12 = SizedBox(width: Sizes.p12);
const gapW16 = SizedBox(width: Sizes.p16);
const gapW20 = SizedBox(width: Sizes.p20);
const gapW24 = SizedBox(width: Sizes.p24);
const gapW32 = SizedBox(width: Sizes.p32);
const gapW40 = SizedBox(width: Sizes.p40);
const gapW48 = SizedBox(width: Sizes.p48);
const gapW64 = SizedBox(width: Sizes.p64);
const gapW80 = SizedBox(width: Sizes.p80);

/// Constant gap heights
const gapH4 = SizedBox(height: Sizes.p4);
const gapH8 = SizedBox(height: Sizes.p8);
const gapH12 = SizedBox(height: Sizes.p12);
const gapH16 = SizedBox(height: Sizes.p16);
const gapH20 = SizedBox(height: Sizes.p20);
const gapH24 = SizedBox(height: Sizes.p24);
const gapH32 = SizedBox(height: Sizes.p32);
const gapH40 = SizedBox(height: Sizes.p40);
const gapH48 = SizedBox(height: Sizes.p48);
const gapH64 = SizedBox(height: Sizes.p64);
const gapH80 = SizedBox(height: Sizes.p80);
```

### Example with vertical gaps

Use like this:

```dart
// import app_sizes.dart at the top

Padding(
  padding: EdgeInsets.all(Sizes.p16), // rather than EdgeInsets.all(16.0),
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      Icon(
        Icons.show_chart,
        size: Sizes.p80, // rather than 80.0,
        color: Colors.green,
      ),
      gapH24, // rather than const SizedBox(height: 24),
      Text(
        'Charts Screen',
        style: TextStyle(
          fontSize: Sizes.p24, // rather than 24.0,
          fontWeight: FontWeight.bold,
        ),
      ),
      gapH8,
      Text(
        'Exchange rate charts will be displayed here',
        style: TextStyle(
          fontSize: Sizes.p16, // rather than 16.0,
          color: Colors.grey,
        ),
        textAlign: TextAlign.center,
      ),
    ],
  ),
)
```
