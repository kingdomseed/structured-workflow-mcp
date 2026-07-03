# ACT Workflow

## Workflow Storage

Workflow Storage is configured in `.act/config.yaml`. `workflow.backend` selects where newly created Specs are written:

- `local`: local markdown artifacts.
- `github`: GitHub Issues.

Existing artifacts remain valid in their original storage. Read them from their reference: local paths use local storage; GitHub issue URLs, `owner/repo#123`, and `#123` use GitHub storage.

Interview Ledgers and Work Items stay with their parent Spec. Edits update the artifact being edited. Do not migrate or reinterpret existing artifacts just because `workflow.backend` changes.

If the required storage cannot read or write, stop and report the missing prerequisite or unreadable reference. Do not silently use another storage location.

When storage-specific mechanics are needed, load the ACT storage reference with:

`node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-config/scripts/show-storage-reference.js --storage <local|github>`

Workflow Storage preserves the same concepts: Spec, Interview Ledger, Work Item, Parent Spec Reference, Blocker Reference, Blocking Decision, and Acceptance Criteria.

## Artifact Vocabulary

### Spec

The requirements source of truth for a feature or change. Captures the problem, proposed outcome, user-visible behavior, constraints, technical decisions, testing strategy, scope boundaries, and unresolved questions.

### Interview Ledger

Preserves materially resolved questions and answers that led to a Spec. Ledger IDs such as `L1` provide traceability from conversation decisions to Spec requirements and Work Items.

### Work Item

One executable vertical implementation slice linked to a parent Spec. Independently actionable once blockers are done and blocking decisions are resolved.

### Parent Spec Reference

The reference from a Work Item back to its source Spec. It may be a local Spec path or a GitHub Issue reference, depending on where the parent Spec is stored.

### Blocker Reference

A reference to another Work Item that must be completed before the current Work Item can safely start.

### Blocking Decision

An unresolved product, technical, or scope decision that prevents safe implementation even when Work Item blockers are complete.

### Acceptance Criteria

Concrete checks that define when a Work Item is complete. Keep them observable and independently verifiable.

### Blocking Questions

Unresolved decisions that make safe decomposition or implementation impossible. Resolve them before creating or executing affected Work Items.

### Open Questions

Known uncertainties that do not block the next workflow step. Preserve them in the relevant artifact until resolved or intentionally deferred.

### Required Context

Non-obvious files, docs, decisions, or constraints an agent needs before implementing a Work Item. Do not duplicate the parent Spec unless a specific detail needs emphasis.

### Test Seam

A deliberate boundary that lets tests replace nondeterministic or external behavior with controlled fakes, fixtures, or overrides. Prefer existing Test Seams; add new ones only when needed to verify required behavior safely.

### Covers

Lists the Spec sections, user stories, requirements, testing strategy items, and Interview Ledger IDs addressed by a Work Item.

## Domain Docs

Use established project vocabulary in Specs, Work Items, tests, summaries, and implementation notes.

Read the nearest relevant `GLOSSARY.md` for canonical project language. Read relevant project docs when they affect the requested change.

Proceed silently when optional domain docs are absent. Surface conflicts with glossary terms or project docs instead of silently overriding them.
