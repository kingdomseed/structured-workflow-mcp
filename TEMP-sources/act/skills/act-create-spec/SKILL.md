---
name: act-create-spec
description: Create and save a Spec from current conversation context. Use when the user asks to write, save, or generate a Spec without further interview.
argument-hint: ""
tools: [Read, Write, Glob, Grep, Bash, AskUserQuestion, Skill]
---

Do not interview the user or require outline approval. Ask inline only when a Critical Ambiguity would make the Spec unsafe or misleading.

Capture the requirements-level problem, solution shape, user-visible behaviors, constraints, error cases, output rules, boundaries, and durable decisions inferred from the conversation. Merge items only when the merge is lossless: no actor, behavior, condition, rationale, traceability target, or downstream Work Item reference is lost.

## Process

1. If you have not already explored the target project, briefly inspect the files, docs, tests, examples, and domain context directly relevant to the conversation. Use the project's established vocabulary and respect relevant docs.
2. Identify the Test Seams for the feature. Prefer existing Test Seams over new ones. Capture durable testing decisions in `## Testing Strategy`; ask the user only if the Test Seam is a Critical Ambiguity.
3. Extract materially resolved questions and answers into an Interview Ledger, then create the Spec, preserving distinct requirements and boundaries from the conversation.

## Workflow Storage

Before writing, ensure ACT workflow config exists at `.act/config.yaml` in the current working directory. If that file is missing or invalid, invoke `act-config` from the same current working directory, then continue.

Read `.act/workflow.md`. Write the Spec using configured Workflow Storage and store the Interview Ledger with it.

Load the ACT storage reference named by `.act/workflow.md` before writing, and follow its exact folder and file-naming convention.

If writing cannot proceed, stop and report the missing prerequisite. Do not silently use another storage location.

## Write The Interview Ledger

Read [interview-ledger-format.md](./references/interview-ledger-format.md) before writing the ledger.

Extract materially resolved Q/A into stable `L#` records. Do not include trivial conversational turns.

If there was no interview and no materially resolved answer beyond the source request, still write a minimal ledger with one `current` record for the initial request when it contains implementation-relevant requirements.

## Write The Spec

Read [spec-format.md](./references/spec-format.md) before writing the Spec.

Reference ledger IDs inline where the Spec covers ledger decisions, especially in `Requirements`, `Technical Decisions`, and `Testing Strategy`.

Before finishing, check that every `current` ledger ID appears in the Spec. If an ID cannot be covered because it remains unresolved, mark that ledger record `deferred` and include the unresolved point under `Open Questions` or `Blocking Questions` when appropriate.

## Completion

End by showing the location of the saved Spec and Interview Ledger. Then recommend starting a new session with `/new` and choosing one path.

If this skill is running through a workflow variant, substitute the matching variant commands in the recommendation.

```md
1. Run `act-refine-spec <Spec>` to review the Spec and ledger coverage for contradictions and gaps.
2. Run `act-create-issues <Spec>` if the Spec should be decomposed into independently executable Work Items.
3. Run `act-implement <Spec>` if the Spec is small, cohesive, low-risk, and does not need decomposition.
```

Do not invoke the next workflow automatically.
