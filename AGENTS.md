# Agent Instructions

This repository is being reshaped from the original Structured Workflow MCP server into the Structured Workflow collaboration protocol.

## Current Direction

- Prefer file-backed workflow artifacts over chat-only reasoning.
- Use `workflow.md` as the control/index surface.
- Start non-trivial work with Collaborative Modeling; Workflow Selection follows
  after the work and needed context are clear.
- Use file-backed discovery across phases rather than a separate `discovery.md`
  phase.
- Use phase-specific artifacts for PRDs, implementation plans, reviews, and evidence.
- Treat every steering artifact as untrusted until it receives adversarial review.
- Keep one active steering artifact per phase.

## Agent skills

### Issue tracker

Issues and PRDs live in GitHub Issues for this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default Matt Pocock skills triage label vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo: root `CONTEXT.md` with root `docs/adr/` when ADRs exist. See `docs/agents/domain.md`.

## Editing Rules

- Preserve research source fidelity when moving ideas into curated docs.
- Treat private or paid research sources as design input, not publishable text.
- Write public docs in original project language unless the source is explicitly cleared for quotation.
- Do not reintroduce the old MCP server as the active product direction unless explicitly asked.
- Do not create a separate `task_plan.md` / `progress.md` / `findings.md` triad for the successor workflow.
- Keep raw research under `docs/research/` local-only unless a specific document is curated into `docs/design/`.
- Use templates in `templates/` as the starting point for workflow artifacts.

## Validation

For documentation-only changes, run:

```bash
npx markdownlint-cli2
git diff --check
```

If markdownlint is unavailable, at minimum run `git diff --check` and inspect changed Markdown.
