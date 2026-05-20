# Riverpod Error-Handling Reference

## Core Distinction

Separate programming errors, runtime exceptions, and user-correctable
validation states.

- **Programming errors** indicate bugs in the code. Do not routinely catch them
  to keep the app moving. Let global handlers report them so the code can be
  fixed.
- **Runtime exceptions** represent failures outside normal control, such as file
  system, network, storage, timeout, platform, or data-format failures. Catch
  them at the correct boundary and transform them into typed domain failures.
- **Validation states** are expected user-correctable outcomes. Model them as
  result types, field errors, empty values, or explicit UI states instead of
  throwing exceptions.

## Layer Responsibilities

### Data

The data layer catches infrastructure exceptions, adds context, preserves stack
traces, reports when appropriate, and transforms failures into typed domain
exceptions.

Do not catch broad errors when a specific exception type is known. Do not return
null or default values to hide infrastructure failure unless the domain model
explicitly defines absence as a valid state.

### Domain

The domain layer defines typed exceptions and validates invariants. It does not
catch infrastructure failures. It should not throw exceptions for ordinary user
input correction when a result type or validation state is the real domain
model.

### Application

The optional application layer may add business context while coordinating
multiple repositories or services. Preserve the original stack trace when
rethrowing or transforming failures.

### Presentation

Read providers let errors surface as `AsyncValue` error states. Mutation
controllers use guarded async state transitions and expose mutation failures to
the UI.

Widgets display read errors as part of rendering and display mutation side
effects through listener behavior such as snackbars or dialogs. Do not run
navigation, dialogs, snackbars, analytics, or logging as direct build-time
effects.

## Stack Preservation

When transforming one exception into another, preserve the original stack trace.
Stack preservation is part of the debugging contract, not an optional nicety.

If an error-reporting service is used, capture enough context for debugging:

- layer
- operation
- feature or repository
- sanitized identifiers when allowed
- stack trace
- relevant non-PII technical metadata

## Privacy

Error reporting must be privacy-aware. Scrub user-generated content, secrets,
tokens, file contents, and personally identifying data before sending events to
external monitoring services.

Preserve actionable debugging context without preserving private user data.

## AsyncValue Policy

- Use query providers for read paths so data, loading, and error states stay
  explicit.
- Use mutation controllers for write paths.
- Display read errors from the watched async state.
- Display mutation errors from transition listeners.
- Use nullable async values only when last-known/current-data semantics are an
  explicit contract.
- Prefer exhaustive data/loading/error handling when readiness matters.

## Review Failures

Flag these during review:

- empty `catch` blocks
- generic catch-all handling where specific exception types are available
- swallowed errors
- fallback values that hide infrastructure failures
- lost stack traces
- validation modeled as exceptions
- programming errors caught as routine control flow
- direct UI side effects in `build()`
- user data sent to monitoring unsanitized
- compatibility shims for old error-handling or Riverpod APIs in touched code
