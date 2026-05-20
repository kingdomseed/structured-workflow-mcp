# Riverpod Architecture Reference

## Profile Boundary

This is a high-rigor Riverpod profile. It is appropriate when a repo has or
wants strict architectural boundaries, generated Riverpod providers, explicit
testing contracts, and durable error policies.

Do not apply this profile as generic Flutter law. First inspect the repo's
existing architecture, ADRs, `CONTEXT.md`, state-management approach, test
contracts, generated-code tools, and platform risks.

## Layer Model

Use a feature-first structure with layers inside each feature:

- **Domain**: framework-independent models, business logic, repository
  contracts, domain exceptions, value objects, and invariants.
- **Data**: repository implementations, DTOs, persistence, platform/network
  adapters, serialization, migrations, and infrastructure exception
  transformation.
- **Application**: optional coordination services for genuine cross-feature or
  multi-repository workflows.
- **Presentation**: widgets, screens, Riverpod providers/controllers, UI state,
  navigation side effects, and user-visible error display.

Dependencies point inward. Presentation may depend on application/domain.
Application may depend on domain. Data implements domain contracts. Domain does
not import Flutter, Riverpod, or data-layer implementation details.

## Project-Profile Calibration

Some rules are profile choices rather than universal Flutter requirements:

- Abstract repository interfaces for every repository are appropriate when the
  repo chooses strict layer boundaries and wants agents to see dependency
  direction structurally.
- Strict DTO separation is appropriate when storage/API formats must not leak
  into domain logic.
- Mandatory hooks for controller lifecycles are a project decision, not a
  Riverpod requirement.
- 100% non-generated line coverage is a high-rigor contract tied to production
  risk, not a generic requirement for every Flutter repo.

When a repo does not already make these choices, collaborative modeling should
decide them explicitly before implementation.

## Riverpod Rules

- Use generated Riverpod providers for production providers when the repo has
  standardized on Riverpod code generation.
- Treat Riverpod as the dependency-injection container.
- Do not introduce a second DI framework unless the repo already uses one or an
  ADR approves it.
- Use provider overrides for tests and bootstrap boundaries.
- Prefer explicit provider parameters for per-page or per-instance state.
- Do not add compatibility helpers to preserve obsolete Riverpod APIs in touched
  code.
- Verify current Riverpod APIs through official docs before relying on syntax
  or migration assumptions.

## Read / Write Split

Read paths fetch or observe data. They should use query providers such as
`FutureProvider`, `StreamProvider`, or generated equivalents. A controller is
not needed merely to fetch and display data.

Write paths mutate data. They should use a mutation controller such as a
`Notifier` or `AsyncNotifier` that manages transient mutation state, delegates
to repositories/services, and invalidates affected read providers after a
successful mutation.

Controllers do not own durable application data. The source of truth remains in
the data layer or domain-owned state. Controllers coordinate user actions and
transient mutation state.

## State Invariants

- Derive state from one source of truth instead of synchronizing duplicate
  state manually.
- If two providers expose related data, one should derive from the other or from
  the same source of truth.
- Treat objects reachable from provider state as immutable.
- Replace values through copy-on-write instead of mutating lists, maps, or model
  objects in place.
- Keep `build()` as a UI projection of current state.
- Trigger navigation, dialogs, snackbars, analytics, and other side effects from
  state-transition listeners, not direct build-time imperative code.

## Application Layer Threshold

The application layer is optional. Add it only when coordination is genuinely
cross-cutting or complex enough to deserve a named boundary.

Good application-layer candidates:

- Multi-repository workflows.
- Cross-feature mechanics reused by multiple features.
- Coordination that can be tested without many dependencies.
- Operations where the business concept is larger than one presentation
  controller.

Keep work in presentation/domain/data when a new application service would only
wrap one call or create premature abstraction.

## Public API And Barrels

Feature barrels should expose the feature's intended public API. Export domain
models, repository contracts, screens, and controllers that other features may
use. Do not export DTOs, data sources, private widgets, or implementation
details.

Package imports should follow repo convention. If the repo enforces package
imports, do not introduce relative imports except where the local convention
explicitly allows them.
