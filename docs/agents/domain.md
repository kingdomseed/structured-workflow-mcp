# Domain Docs

How engineering skills should consume this repo's domain documentation when
exploring the codebase.

## Layout

This is a single-context repo:

```text
/
├── CONTEXT.md
├── docs/adr/
└── docs/agents/
```

`CONTEXT.md` exists at the repo root. `docs/adr/` does not need to exist until
the first ADR is actually needed.

## Before Exploring

Read the root `CONTEXT.md` before naming concepts, creating issues, drafting
PRDs, diagnosing behavior, proposing refactors, or writing tests.

If `docs/adr/` exists, read ADRs that touch the area you're about to work in.
If it does not exist, proceed silently. Do not create ADR folders or files until
a durable architectural decision has actually been resolved.

## Use The Glossary's Vocabulary

When output names a domain concept in an issue title, PRD, refactor proposal,
hypothesis, test name, or implementation plan, use the term as defined in
`CONTEXT.md`. Do not drift to synonyms the glossary explicitly avoids.

If the concept needed is not in the glossary yet, either reconsider whether the
language is being invented too early or note the gap for `grill-with-docs`.

## Flag ADR Conflicts

If output contradicts an existing ADR, surface it explicitly rather than
silently overriding it:

```text
Contradicts ADR-0007 because ...
```
