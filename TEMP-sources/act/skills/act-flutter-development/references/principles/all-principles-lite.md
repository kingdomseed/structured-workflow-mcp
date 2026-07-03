# Flutter Code Review Principles

These rules focus on what truly matters for sustainable, maintainable Flutter code. They cut through noise to address fundamental concerns.

**Note:** 'Best Practices' do not exist. There is only your current best understanding of how to do something in a given context. As your understanding evolves, so should your practices.

---

## Core Philosophy

### Do as little as possible (YAGNI/KISS)
- **Rule**: Only build what is necessary to deliver current value
- **Check**: Look for unused abstractions, premature optimizations, or over-engineered solutions
- **Examples**:
  - Unused helper functions or classes
  - Abstractions created for "potential future needs"
  - Interface/abstract + single runtime implementation
  - Complex dependency injection for simple use cases
  - Feature flags for things that don't need them
- **Action**: Remove unnecessary code. Three similar lines is better than a premature abstraction.

### Make it work, make it right, make it fast
- **Rule**: Prioritize in this order - functionality first, correctness second, performance third
- **Check**:
  - Does it accomplish the objective?
  - Does it handle edge cases correctly?
  - Are performance optimizations justified by real-world testing?
- **Action**: Don't optimize before proving it works. Don't make fast code that does the wrong thing.

### Optimize for sustainable velocity
- **Rule**: Code should enable rapid iteration while maintaining quality
- **Check**:
  - Can new features be added without major refactoring?
  - Are tests fast and reliable?
  - Is the codebase easy to understand and navigate?
- **Action**: Prioritize code clarity and test reliability over clever optimizations

### Keep it consistent
- **Rule**: Use one pattern/library per task across the codebase
- **Check**: Are there multiple ways of doing the same thing?
- **Examples**:
  - Multiple HTTP clients for the same purpose
  - Inconsistent state management patterns
  - Mixed spacing/sizing approaches
  - Inconsistent error handling patterns
- **Action**: Consolidate to a single approach unless there's a clear reason for variation

---

## Critical Issues (Must Fix)

### 1. Hardcoded or Insecure API Keys
**Why it matters**: Security vulnerability that can lead to unauthorized access and financial loss

- **Check for**:
  - API keys hardcoded in source code
  - Sensitive keys (OpenAI, Stripe secret keys) stored on client
  - API keys committed to version control
  - Keys that should be server-side exposed to client

- **Examples**:
```dart
// BAD: Hardcoded API key
const apiKey = 'sk-1234567890abcdef';

// GOOD: Load from environment
final apiKey = Env.openAiKey;

// BAD: Server-side key on client
const stripeSecretKey = 'sk_live_...';

// GOOD: Use publishable key on client
const stripePublishableKey = 'pk_live_...';
```

- **Action**:
  - Store client-safe keys in .env files (Sentry DSN, Mixpanel tokens)
  - Keep sensitive keys on server only (OpenAI, Stripe secret keys)
  - Never commit .env files to version control
  - Use --dart-define-from-file=.env for Flutter apps

### 2. Silent Failures
**Why it matters**: Fails "Design to fail fast and early" principle

- **Check for**:
  - Errors caught and ignored without logging
  - Empty catch blocks
  - Default fallback values hiding failures
  - Missing error handling in async operations

- **Examples**:
```dart
// BAD: Silent failure
return ratesAsync.when(
  error: (_, _) => 1.0,  // User never knows something failed
);

// GOOD: Log the error
error: (error, stackTrace) {
  log('Failed to fetch rate', error: error, stackTrace: stackTrace);
  return 1.0;
},
```

### 3. Incomplete Work (TODOs, Commented Code)
**Why it matters**: Fails "Deployable commits" and "Do as little as possible"

- **Check for**:
  - TODO comments in production code
  - Commented-out code blocks
  - Half-finished refactorings

- **Action**:
  - Complete the work or remove it
  - Use version control for history, not comments
  - Main branch should be deployable at all times

### 4. State Synchronization Instead of Derivation
**Why it matters**: Core architectural principle - "Don't synchronize state, derive it"

- **Check for**:
  - Same data stored in multiple places
  - Manual updates to keep state in sync
  - State copying between components

- **Action**: Move state to one place, derive it everywhere else

### 5. Missing Error Context
**Why it matters**: Fails "Optimize for the debugging experience"

- **Check for**:
  - Generic error messages ("Error occurred")
  - Errors without useful context
  - Assertions without messages

- **Examples**:
```dart
// BAD: Useless error
throw Exception('Invalid');

// GOOD: Useful error
throw ArgumentError(
  'Expected currency code from API but got null. '
  'Response: $responseData'
);
```

---

## Important Issues (Should Fix)

### 6. Tight Coupling to Dependencies
**Why it matters**: "Avoid tight coupling to dependencies" - limits future flexibility

- **Check for**:
  - Direct dependency usage throughout codebase
  - No abstraction layer for external packages
  - Hard to swap implementations

- **Action**: Add thin adapter/repository layer for critical dependencies

**Important nuance:** Avoiding coupling does not require interfaces everywhere. If there is one runtime implementation, prefer a concrete class plus dependency injection and test overrides.

### 7. Deep Inheritance Hierarchies
**Why it matters**: "Favor composition over inheritance"

- **Check for**:
  - Classes extending multiple levels deep
  - Tight parent-child coupling

- **Action**: Use composition, mixins, or interfaces instead

### 8. Hasty Abstractions
**Why it matters**: "Avoid Hasty Abstractions (AHA)"

- **Check for**:
  - Abstractions created after 1-2 uses
  - Over-generalized code
  - Abstraction obscuring actual behavior
  - Sealed class hierarchies for tiny status sets
  - Duplicate type hierarchies across platform-specific files

- **Action**:
  - Wait for clear patterns to emerge (3+ similar uses) before abstracting
  - Prefer enum + payload for simple outcomes
  - Use shared contracts/models for cross-platform behavior

### 9. Unclear Separation of Concerns
**Why it matters**: "Separate concerns" - related things should be close together

- **Check for**:
  - Business logic in UI widgets
  - Data fetching mixed with presentation
  - Things that change together scattered across files
  - Side effects executed directly in `build()` body

- **Action**:
  - Colocate related code, separate unrelated code
  - Keep `build()` focused on UI projection
  - Trigger imperative effects from state transitions via listener/subscriber callbacks, not directly in `build()`

### 10. Monolithic Screen Widgets
**Why it matters**: Large widgets that own all data fetching and mutations are hard to develop incrementally, test in isolation, and maintain long-term

- **Check for**:
  - Screen widgets watching multiple unrelated data sources
  - One widget handling both data fetching and mutations for several features
  - Build methods mixing loading/error handling for different data sources
  - Features that can't be developed or tested independently

- **Action**:
  - Each widget that reads data → watches its own state source
  - Each widget that performs mutations → owns its own controller
  - Pure presentation widgets → `StatelessWidget` with data passed in
  - Each widget+controller pair is a natural vertical slice that can be built, tested, and verified independently
  - See `small-composable-widgets` for full guidance and examples

### 11. Testing Implementation Details
**Why it matters**: "Tests should resemble users"

- **Check for**:
  - Tests that break on refactoring
  - Testing private methods directly
  - Mocking too much

- **Action**: Test behavior users see, not internal implementation

---

## Code Quality (Nice to Have)

### 12. Vague Naming
**Why it matters**: Code clarity and "Document your work"

- **Check for**:
  - Abbreviations (`prefs`, `ctx`, `mgr`)
  - Vague names (`data`, `info`, `helper`)
  - Inconsistent naming patterns

- **Action**: Use full, descriptive names

### 13. Missing Documentation on Public APIs
**Why it matters**: "Document your work" - explain the why

- **Check for**:
  - Public classes/methods without dartdoc
  - Complex logic without comments explaining why

- **Action**:
  - Add dartdoc to public APIs
  - Comment the "why", let code show "what" and "how"

### 14. Long Methods
**Why it matters**: Maintainability and "Functions short and with a single purpose"

- **Check for**:
  - Methods 50+ lines: consider refactoring
  - Methods 100+ lines: strongly consider refactoring
  - Multiple responsibilities in one function

- **Action**: For `build()` methods, extract to widget classes (`widget-classes-no-build-helpers`). For business logic, extract to well-named helper methods. See `avoid-long-methods` for details.

### 15. Magic Numbers and Strings
**Why it matters**: Code clarity and maintainability

- **Check for**:
  - Unexplained numeric literals
  - Hardcoded strings used multiple times

- **Action**: Use named constants or enums

---

## What NOT to Flag

These are explicitly NOT problems based on the rules and principles above:

### ✓ Acceptable Patterns
- **Boilerplate code** - "Explicit is better than implicit"
- **Duplicated code** (if abstraction isn't obvious yet) - "Avoid Hasty Abstractions"
- **Simple solutions** over complex ones - "Do as little as possible"
- **Pragmatic choices** over pure ones - "Pragmatism is more important than purity"
- **Unfamiliar but simpler patterns** - "Don't confuse simplicity with familiarity"

### ✓ Don't Flag These
- Missing const keywords (unless performance measured)
- File organization preferences (unless clearly inconsistent)
- Formatting issues (use formatter)
- Minor linting issues (unless they matter)
- Using established patterns even if not "pure"
- Dialog/navigation triggered from state-transition listener callbacks (not from direct `build()` execution)

---

## Review Process

### Priority Order
1. **Critical Issues** - Fix immediately, block merging
2. **Important Issues** - Address before feature is complete
3. **Code Quality** - Address when time permits

### Key Questions to Ask
1. Is this the simplest solution that works?
2. Will this be easy to change later?
3. Are errors visible and debuggable?
4. Is the code consistent with the rest of the codebase?
5. Does this add lasting value or temporary complexity?
6. Are side effects triggered directly in build body?
7. Are platform contracts shared or duplicated per platform?
8. Is abstraction justified by current runtime needs?

### Focus Areas
- Error handling and visibility
- State management patterns
- Separation of concerns
- Code consistency
- Sustainable velocity
- Side effect placement and lifecycle safety
- Platform contract consistency

### Skip Areas (Unless Clearly Broken)
- Formatting preferences
- Minor naming quibbles
- Theoretical performance issues
- Personal style preferences
- Hypothetical future needs

---

## Measuring Success

Good code review should result in:
- ✓ Fewer production bugs (errors fail fast)
- ✓ Faster feature delivery (no unnecessary complexity)
- ✓ Easier debugging (clear error messages)
- ✓ Consistent patterns (one way to do things)
- ✓ Deployable commits (main always works)

Not necessarily:
- ✗ Perfect test coverage
- ✗ Zero linting warnings
- ✗ Perfectly DRY code
- ✗ Every public API documented
- ✗ Zero TODOs ever

---

## Summary

Focus on:
1. **Errors must be visible** - no silent failures
2. **Code must be complete** - no TODOs, no commented code
3. **Keep it simple** - avoid premature optimization/abstraction
4. **Stay consistent** - one pattern per task
5. **Optimize for change** - code should be easy to modify

Ignore:
1. Formatting (use formatter)
2. Theoretical issues (must be real)
3. Style preferences (unless inconsistent)
4. Perfect purity (pragmatism wins)
5. Hypothetical futures (YAGNI)

Remember: The best code review catches real problems that affect users or developers, not style preferences or theoretical concerns.
