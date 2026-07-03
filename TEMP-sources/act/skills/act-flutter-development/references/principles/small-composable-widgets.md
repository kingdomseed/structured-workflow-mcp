# Small Composable Widgets

Build features as small, self-contained widgets. Each widget that fetches data or performs mutations gets its own controller/notifier, forming a natural vertical slice that can be developed, tested, and verified independently.

## Why Small Composable Widgets?

- Each widget+controller pair is a **vertical slice** — one working slice through all layers
- Small widgets are easier to reason about, test, and reuse
- Bugs are isolated to the widget that owns the behavior
- Parallel development: multiple widgets can be built independently
- Prevents features from ballooning — you ship working increments, not half-finished layers

## Anti-Pattern: Monolithic Screen Widget

```dart
// ❌ AVOID - One massive widget that owns all data and logic
class ProductScreen extends ConsumerWidget {
  const ProductScreen({super.key, required this.productId});
  final String productId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final product = ref.watch(productProvider(productId));
    final reviews = ref.watch(reviewsProvider(productId));
    final relatedProducts = ref.watch(relatedProductsProvider(productId));
    final cartState = ref.watch(cartProvider);

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // 200+ lines mixing product details, reviews, related items,
          // add-to-cart logic, error handling for each data source...
        ],
      ),
    );
  }
}
```

**Problems:** Hard to test in isolation. One failing provider blocks the entire screen. Changes to reviews risk breaking cart logic. Cannot develop sections independently.

## Solution: Compose from Self-Contained Widgets

```dart
// ✅ GOOD - Screen composes small widgets, each owning its own data
class ProductScreen extends StatelessWidget {
  const ProductScreen({super.key, required this.productId});
  final String productId;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          ProductHeader(productId: productId),
          AddToCartSection(productId: productId),
          ReviewsList(productId: productId),
          RelatedProducts(productId: productId),
        ],
      ),
    );
  }
}
```

Each child widget owns its data:

```dart
// Each widget fetches its own data and handles its own states
class ReviewsList extends ConsumerWidget {
  const ReviewsList({super.key, required this.productId});
  final String productId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final reviews = ref.watch(reviewsProvider(productId));
    return reviews.when(
      data: (items) => ReviewsSliver(reviews: items),
      loading: () => const SliverToBoxAdapter(child: ReviewsSkeleton()),
      error: (e, _) => SliverToBoxAdapter(child: ReviewsError(error: e)),
    );
  }
}
```

```dart
// Widgets that perform mutations get their own controller
class AddToCartSection extends ConsumerWidget {
  const AddToCartSection({super.key, required this.productId});
  final String productId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(addToCartControllerProvider);
    return SliverToBoxAdapter(
      child: ElevatedButton(
        onPressed: state.isLoading
            ? null
            : () => ref
                .read(addToCartControllerProvider.notifier)
                .addToCart(productId),
        child: state.isLoading
            ? const CircularProgressIndicator()
            : const Text('Add to Cart'),
      ),
    );
  }
}
```

## Guideline: When Does a Widget Get Its Own Controller?

- **Reads data** → `ref.watch` a provider directly
- **Performs mutations** (add to cart, submit form, delete item) → own controller/notifier
- **Pure presentation** (formatting, layout) → `StatelessWidget` with data passed in

## Vertical Slice Alignment

Small composable widgets map naturally to incremental development:

1. Build `ProductHeader` + its provider → verify it works
2. Build `AddToCartSection` + its controller → verify it works
3. Build `ReviewsList` + its provider → verify it works
4. Compose them in `ProductScreen` → verify integration

Each step produces a working, testable slice. If step 2 reveals a problem with the data layer, you find out before building the rest.

## When to Keep Widgets Together

Not every piece of UI needs its own file or provider:

- **Simple static layout** — a `Row` of `Text` widgets doesn't need extraction
- **Tightly coupled display** — if two pieces of UI always render the same data, keep them in one widget
- **Rule of thumb**: extract when the widget owns its own data source or mutation, or when it's reused elsewhere
