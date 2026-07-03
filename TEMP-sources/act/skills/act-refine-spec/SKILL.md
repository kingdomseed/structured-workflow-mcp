---
name: act-refine-spec
description: Review a Spec for contradictions, gaps, wrong assumptions, and codebase misalignment before Work Items are created.
argument-hint: "[Spec reference]"
tools: [Read, Glob, Grep, Bash, AskUserQuestion, Edit]
---

Review a Spec as an adversarial refinement pass. Prioritize findings that would make downstream work unsafe, ambiguous, or wasteful.

Spec to review: $ARGUMENTS

## Inputs

If no Spec is provided, ask for it. If it is unreadable, report it clearly and stop.

Read `.act/workflow.md` before workflow artifacts. Resolve the Spec from its reference, independent of `.act/config.yaml`. If storage mechanics are needed, load the ACT storage reference named there.

## Posture

Treat the Spec as the review source of truth. Do not infer missing decisions from hidden conversation context.

Do not restart discovery. Ask one focused question only when a contradiction or unsafe ambiguity prevents meaningful review.

Default to report-only. Edit only when the user explicitly asks.

## Context Check

Before reporting findings:

1. Read Interview Ledger when present.
2. Read root `GLOSSARY.md` when present.
3. Read relevant project docs or guidance named or implied by the Spec.
4. Verify prompt-relevant code paths, tests, packages, commands, and conventions when the Spec makes codebase claims.

Keep exploration focused on the Spec's claims and assumptions; do not map the whole repository.

## Interview Ledger Check

If an Interview Ledger exists beside the Spec, check for:

- `current` ledger IDs, such as `L1`, missing from the Spec.
- Spec requirements that reference a ledger ID but weaken the ledger answer or decision.
- Ledger constraints or negative requirements omitted from the Spec.
- `deferred` ledger records that the Spec treats as resolved without explanation.
- Duplicate or contradictory current ledger records.

## Review Lens

Look for:

- Contradictions inside the Spec.
- Requirements that are missing, vague, untestable, or too broad for safe Work Item generation.
- Open Questions that contain decisions too important to defer.
- Traceability gaps between user stories, requirements, testing strategy, boundaries, and downstream slices.
- Traceability gaps between Interview Ledger records and Spec coverage.
- Technical decisions that assume packages, APIs, files, patterns, data shapes, or platform behavior that do not match the codebase.
- Testing strategy gaps: missing seams, unclear automation/manual split, external-service assumptions, nondeterministic behavior, or absent regression coverage for risky behavior.
- Out of Scope omissions that could cause product-surface expansion.
- Terminology drift against `GLOSSARY.md`, project docs, or existing code.

Respect explicit scope. Do not flag excluded behavior as missing.

## Findings

Findings come first. Order them by severity or execution risk.

Use these severity labels:

- `Critical`: blocks safe downstream decomposition or would force implementation guessing.
- `High`: likely to cause rework, wrong decomposition, or incorrect implementation.
- `Medium`: weakens actionability but has a reasonable implementation path.
- `Low`: clarity or polish improvement.

Each finding must include what is wrong or unclear, evidence, why it matters, and a recommended Spec change. Prefer file and line references when available. Do not invent findings to fill the format.

Use this shape:

```md
1. **High: Short finding title**
Spec: `<Spec>`
Evidence: ...
Why it matters: ...
Recommended Spec change: ...
```

After findings, list strengths and residual risks. If no findings are found, say so explicitly and list residual risks. If edits were not made, say that recommendations are proposed changes only.

## Final Prompt

After presenting findings, ask what to do next.

Use these options:

1. `Update Spec`: Apply focused edits for the findings the user approves.
2. `Discuss Findings`: Talk through findings or revise recommendations before editing.
3. `Leave Spec As-Is`: Keep recommendations unapplied.

If there are no blocking findings, do not force a prompt. State that no blocking findings were found, list residual risks, and say the Spec is ready if the user accepts the residual risks.

## Editing

If the user explicitly asked you to edit the Spec, first complete the review. Then apply only focused changes to the same Spec that resolve reviewed findings and stay within the agreed scope.

Before editing, briefly list the changes. If a change requires a product decision, ask one focused question instead of guessing.

After editing, summarize the applied changes and identify any findings left unresolved.
