---
name: evaluate-against-the-design-specification
description: Use when a verdict, review, completion claim, handoff, or shipping decision needs fresh evidence against explicit criteria.
---

# Evaluate the solution against the design specification

Update `workflow-tracker.md` to D2 before starting. Read the D1 methods, exact artifact and state under evaluation, approved criteria, owning phase document, relevant project instructions, and available evidence.

## Gather fresh evidence

For every criterion:

1. Identify the D1 method that can prove or disprove it.
2. Run or perform the complete method against the current artifact state.
3. Read the full output and inspect the actual evidence.
4. Record the result, evidence location, and important limits.
5. Compare the observed result directly with the criterion and threshold.

Re-run a method when the artifact changes. Keep a previous result as history, not proof of the new state. Inspect delegated work and reviewer claims independently before accepting them.

When diagnosing a failure, first build a tight method that reproduces the exact symptom. List several possible causes that evidence could disprove. Test one variable at a time and preserve the evidence that identifies the cause. Return fixing work to the owning phase.

## Reach the verdict

Mark each criterion as:

- **verified**: current evidence meets the stated criterion;
- **partially verified**: evidence covers part of the criterion and names the remaining gap;
- **failed**: current evidence contradicts the criterion;
- **not proven**: no adequate result supports a judgment;
- **blocked**: the artifact, method, environment, or source of truth required for comparison is unavailable.

Report review findings with severity proportional to consequence. Include what is wrong, the criterion, evidence, why it matters, and the owning criterion or recommended change. Keep objective mismatches separate from judgment-based suggestions. Do not invent findings to fill a format.

Give separate verdicts to criteria that can pass or fail independently, then state an overall result:

- **pass**: every required criterion is verified;
- **pass with warnings**: every required criterion is verified and advisory or residual risks remain;
- **fail**: at least one required criterion failed or is only partially verified;
- **blocked**: a required judgment cannot be made with the available artifact or evidence.

Review first. Edit only after the human asks to act on findings and the workflow moves to the criterion that owns the change. Verify feedback against the actual project; accept, reject, or refine it with technical evidence rather than agreement by default.

## Record the output

Write the **D2 — Evaluate the solution against the design specification** section of the current evaluation entry. Include the artifact version, methods run, evidence, per-criterion results, overall verdict, reviewer coverage, and evidence limits.

For a shipping verdict, every required design specification and Definition of Done criterion needs a verified result. Update `workflow-tracker.md` with the verdict and return destination.
