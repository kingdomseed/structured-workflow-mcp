# Folder Structure

Organize code by feature rather than by type for better modularity and maintainability.

## Type-First Approach

```
lib/
├── models/          # All models together
├── screens/         # All screens together
├── widgets/         # All widgets together
└── services/        # All services together
```

Problems: Related code scattered, hard to find feature boundaries, difficult to refactor.

## Feature-First Approach

```
lib/src/
├── features/
│   ├── auth/
│   │   ├── data/auth_repository.dart
│   │   ├── domain/user.dart
│   │   └── presentation/login_screen.dart
│   ├── products/
│   │   ├── data/products_repository.dart
│   │   ├── domain/product.dart
│   │   └── presentation/products_screen.dart
├── common/
│   ├── widgets/     # Truly shared widgets
│   └── utils/       # Shared utilities
└── constants/
```

Benefits: Better modularity, easier navigation, simpler feature removal.

## Pragmatic Approach

**Use a hybrid structure** that fits your app's needs:

- Small apps: Type-first is fine
- Growing apps: Feature-first for complex features, type-first for simple ones
- Large apps: Feature-first with shared infrastructure

Example hybrid:

```
lib/src/
├── features/
│   ├── checkout/    # Complex feature: feature-first
│   └── settings/    # Complex feature: feature-first
├── screens/         # Simple screens: type-first
│   ├── home_screen.dart
│   └── about_screen.dart
├── widgets/         # Shared widgets
└── services/        # Core services
```

## Guidelines

- Start simple, refactor to features when complexity warrants it
- Keep related code together, but don't over-engineer structure
- Shared code in `common/` only when used by 2+ features
- No single structure fits all apps - adapt to your needs
