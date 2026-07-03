---
name: act-create-issues
description: Turn a Spec into independently executable Work Items after user approval.
argument-hint: "[Spec reference]"
tools: [Read, Write, Glob, Grep, Bash, AskUserQuestion, Skill]
---

Turn a Spec into standalone Work Items after user approval.

Spec to decompose: $ARGUMENTS

## Process

### 1. Check readiness

Read the Spec and associated Interview Ledger when present.

If the Spec contains `## Blocking Questions`, stop before proposing Work Items and report that the Spec needs answers before decomposition.

If `## Open Questions` affect Work Item boundaries, dependencies, acceptance criteria, or scope, stop and ask only about those questions. Otherwise preserve the uncertainty as `Blocking decisions` or residual risk.

### 2. Explore codebase

If needed, explore the codebase to understand alignment with the Spec. Respect existing architecture and identify small enabling refactors.

### 3. Draft Work Items

Map the Spec into Work Items that fit the codebase and can execute independently when prerequisites are satisfied.

For each Work Item, decide title, scope, blockers, coverage, and any blocking decisions.

Use numbered blockers only for Work Items that must be completed first. Use coverage for Spec and Interview Ledger traceability.

When an Interview Ledger exists, every `current` record must be covered by at least one proposed Work Item, explicitly deferred, or reported as uncovered.

### 4. Get approval

Always pause before writing Work Items. Present a short numbered proposal:

```md
**1. <Title>**
- Scope: <one or two sentences describing the Work Item>
- Blocked by: None or 1, 2
- Covers: User Stories 1; Requirements 1-2; Testing Strategy 1; Interview Ledger L1
```

Include `Blocking decisions:` only when present.

If any Interview Ledger items are uncovered, report them by ID. Ask the user:

1. Are any Work Items too coarse or too fine?
2. Should any Work Items be combined or split?
3. Are the dependencies correct?

Iterate until the user approves the proposal.

### 5. Write Work Items

Read `.act/workflow.md`, then load and follow the ACT storage reference for the parent Spec's Workflow Storage before writing Work Items; if the storage cannot be read or written, stop and report the missing prerequisite.

Use this Work Item body shape unless the storage reference says otherwise:

```md
## What to build
[Approved scope]

## Required context
[any additional context needed to complete the Work Item]

## Acceptance criteria
- [ ] ...

## Covers
- User Stories: 1
- Requirements: 1-2
- Interview Ledger: L1

## Blocked by
None - ready to start
```

Omit `## Required context` if empty. Always include `## Blocked by`. Add `## Blocking decisions` only when needed.

### 6. Report completion

Report created Work Item references and next `act-implement <Work Item reference>` commands. If this skill is running through a workflow variant, substitute the matching variant command. Do not invoke the next workflow automatically.
