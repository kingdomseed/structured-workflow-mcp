# Summary And Checkpoints

A Spec is the durable requirements document produced by `act-create-spec`; this interview gathers the decisions and unresolved questions needed to create it reliably.

Use this only when the interview reaches the Spec-ready checkpoint, the user asks for a summary, or the user asks to write the Spec early.

## Spec-Ready Checkpoint

Use `act-create-spec` below as the active spec-creation command. If this interview is running through a workflow variant, substitute that variant command everywhere, including option labels, next actions, and same-session invocation.

When framing, blocking ambiguities, and direction-setting choices appear resolved, use AskUserQuestion with these options in this order:

- header: "Spec-ready?"
- question: "The framing, blockers, and direction-setting choices look resolved. What should we do next?"
- options:
  - "Continue interview" - Keep resolving details before writing the Spec
  - "Summarise" - Show a concise summary of what we resolved
  - "act-create-spec" - Create the Spec now using this interview context

Do not recommend starting a new session at this checkpoint.

If the user chooses `act-create-spec`, invoke `act-create-spec` in the same session so the interview context is preserved.

## Summary Shape

Keep the summary short. It is a handoff of interview state, not a Spec outline, implementation plan, or Work Item breakdown.

Use this structure:

```md
## Interview Summary

**Resolved intent:** [What the Spec should accomplish]

**Resolved decisions:**
- [Decision and why it matters]
- [Decision and why it matters]

**Context updates made:**
- [Path]: [Canonical term, definition, or avoided wording captured]

**Blocking Questions:**
- [Blocking ambiguity that remains, if any]

**Open Questions:**
- [Non-critical question that may help later review, if any]

**Next action:** [Continue interview, explore a branch, or run act-create-spec]
```

Omit empty sections except `Resolved intent` and `Next action`.

## After Summarising

After a summary, use AskUserQuestion with these options in this order:

- header: "Next?"
- question: "What would you like to do next?"
- options:
  - "Continue interview" - Keep resolving the current branch
  - "Explore different branch" - Test a different decision path
  - "act-create-spec" - Create the Spec now using this interview context

If the user chooses `act-create-spec`, invoke `act-create-spec` in the same session.

## Early Spec Request

If the user asks to summarize or write the Spec before blockers are resolved, do it.

For early Spec writing, carry unresolved blocking ambiguities forward as `Blocking Questions`. Carry unresolved non-blocking questions forward as `Open Questions` only when they are explicitly present in the interview or source input.
