# Local Workflow Storage

Local Workflow Storage writes Specs and derived Work Items as markdown files under configured `local.path`, resolved from the current working directory.

## Create Spec

Create only the configured `local.path` directory if missing, the next `NNNN-kebab-case-slug` Spec Folder, and these files:

```text
<local.path>/<NNNN-slug>/interview-ledger.md
<local.path>/<NNNN-slug>/spec.md
```

Use the next highest numeric prefix; never renumber old folders. Write `interview-ledger.md` first, then `spec.md` with inline ledger references. Update `interview-ledger.md` only if the ledger itself needs a status correction.

## Read Or Update Spec

A local Spec reference is a path to `spec.md`. Read sibling `interview-ledger.md` when present. Apply approved Spec updates to the same `spec.md`.

## Create Work Items

After decomposition approval, write Work Items under sibling `work-items/` using `NN-slug.md`; never renumber existing files.

Local Work Items use YAML frontmatter:

```yaml
---
type: Work Item
title: <Title>
parent: ../spec.md
---
```

Convert same-Spec blocker numbers to sibling filenames such as `01-foundation.md`.

Stop when a required local artifact is missing or unreadable.
