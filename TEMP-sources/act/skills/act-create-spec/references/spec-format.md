# Spec Format

Use this format. The frontmatter title is the display title; do not duplicate it as an H1.

```md
---
type: Spec
title: Configurable ACT Workflows
---

## Problem

## Proposed Outcome

## User Stories

## Requirements

## Technical Decisions

## Testing Strategy

## Out of Scope

## Blocking Questions

## Open Questions

## Follow-Ups

## Notes
```

Write `## User Stories` as a numbered list. Keep distinct stories separate unless they can be merged losslessly, so downstream Work Items can reference specific story numbers.

Use `## Requirements` to preserve concrete behavior, constraints, supported inputs, output rules, error cases, and boundaries from the conversation. Do not collapse requirement-level details into vague summaries.

Reference ledger IDs inline where the Spec covers ledger decisions:

```md
1. Failed message retry must preserve prior messages and unsent draft input. [L1]
```

Omit optional empty sections: `Requirements`, `Out of Scope`, `Blocking Questions`, `Open Questions`, `Follow-Ups`, and `Notes`.
