# Risk Reporting

Use this format to report journey verification results consistently.

## Required Output Schema

Every applicable plan/work result should include one block per journey using
these exact field names:

```markdown
### Journey Verification
- Journey: <name>
- Verification command(s): `<command>`
- Required seams/selectors: <list or "none">
- Result: `pass | fail | not run`
- Remaining risk: <explicit statement>
```

## Rules

- Do not claim completion without journey verification output.
- Do not silently skip required journeys.
- If result is `not run`, include why and what risk remains.
- If result is `fail`, include a short impact statement and next action.
- If journeys are implemented in a monolithic test file (journeys + robots +
  harness together), explicitly call out maintainability risk.

## Example: Pass

```markdown
### Journey Verification
- Journey: Sign in and sign out
- Verification command(s): `flutter test test/src/features/auth_flow_test.dart`
- Required seams/selectors: auth fake repository override, email/password keys
- Result: `pass`
- Remaining risk: Password reset and account lockout paths are not covered in this iteration.
```

## Example: Not Run

```markdown
### Journey Verification
- Journey: Checkout with successful payment
- Verification command(s): `flutter test test/src/features/purchase_flow_test.dart`
- Required seams/selectors: checkout fake service override, cart item keys
- Result: `not run`
- Remaining risk: Checkout regression risk remains high until the payment journey test is executed.
```

## Example: Fail

```markdown
### Journey Verification
- Journey: Add item and update quantity
- Verification command(s): `flutter test test/src/features/cart_flow_test.dart`
- Required seams/selectors: cart repository fake override, quantity selector keys
- Result: `fail`
- Remaining risk: Users may see incorrect quantity totals; release should be blocked pending fix and re-run.
```

## Example: Pass With Maintainability Risk

```markdown
### Journey Verification
- Journey: Add investment and save
- Verification command(s): `flutter test test/journeys/investment_journey_test.dart`
- Required seams/selectors: investment repository fake override, form field keys
- Result: `pass`
- Remaining risk: Journey is currently in a single file that also contains robots and harness setup; maintenance risk increases as more journeys are added until files are split.
```

## Summary Guidance

After listing all journey blocks, add a short summary:
- journeys passed
- journeys failed
- journeys not run
- top residual risk statements
