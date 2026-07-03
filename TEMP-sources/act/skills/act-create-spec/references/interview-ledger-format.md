# Interview Ledger Format

The Interview Ledger is a Q/A-first traceability artifact. It preserves materially resolved questions and answers that led to the Spec.

It is not a raw transcript and not a second Spec.

## What To Include

Include questions and answers that affect implementation, verification, scope, terminology, UX, data shape, error handling, security, persistence, ordering, defaults, or boundaries.

Do not include trivial conversational turns.

Use stable IDs in conversation order:

```text
L1
L2
L3
```

Records represent final resolved decisions, not every question. When the user changes their answer during the interview, keep one `current` record for the final decision and add `Answer History` only if the change affects implementation, rejects an earlier alternative, or explains downstream constraints.

Do not leave contradictory `current` records.

## Format

```md
---
type: Interview Ledger
parent: spec.md
---

## Records

### L1

Status: current

Question: Should failed messages be retryable?

Answer: Yes, but retrying should not clear prior messages or unsent input.

Decision: Failed message retry must preserve prior messages and unsent draft input.

Constraints:
- Do not clear prior messages.
- Do not clear unsent input.
```

For shorthand acceptance of a rich recommendation, use this shape:

```md
### L2

Status: current

Question: Should automated tests mock the OpenAI HTTP call rather than requiring a real API key?

Recommended Answer:
- Yes, tests should mock the HTTP layer and not call OpenAI.
- Real-image OpenAI verification is manual, not automated.

Answer: y

Decision: Automated tests must avoid real OpenAI calls.

Reason: Real OpenAI calls make tests slow, flaky, paid, and dependent on secrets.
```

For changed answers, add `Answer History` when the history matters:

```md
Answer History:
- Initial answer: use positional optional arguments.
- Revised answer: use `--max-words` and `--max-tokens` named options.
- Final answer: support named options only.
```

## Statuses

- `current` - active and must be covered by the Spec.
- `deferred` - intentionally postponed or unresolved.

## Optional Fields

- `Recommended Answer` when the user accepted a recommendation by shorthand, or when the recommendation contains implementation-relevant detail not fully repeated in `Answer`.
- `Reason` when the rationale explains a non-obvious constraint, rejected alternative, testing boundary, or downstream trade-off.
- `Examples` when concrete scenarios prevent ambiguity.
- `Source` when the answer came from an explicit input file rather than live interview context.
- `Negative Requirements` when the answer explicitly forbids behavior.
- `Answer History` when changed answers affect implementation, reject an earlier alternative, or explain downstream constraints.

Omit optional fields when empty.

When the user answers with `y`, `yes`, `ok`, or similar shorthand, preserve the literal answer in `Answer` only if the accepted recommendation is also captured. Otherwise expand `Answer` to the resolved meaning.
