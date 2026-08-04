---
name: follow-the-plan-to-create-the-solution
description: Establish Criterion C3 by implementing approved tickets in order, verifying each result, and keeping the plan, tracker, and code aligned. Use when an approved implementation ticket or plan is ready to execute, resume, or reconcile.
---

# Follow the Plan to Create the Solution

Update `workflow-tracker.md` to C3 and name the active ticket before starting. Read the ticket, approved Spec and planning artifacts, C1 plan, relevant C2 technique skills, `GLOSSARY.md`, project instructions, current code and tests, and the current working-tree state.

## Check the ticket

Confirm that blockers and human decisions are resolved, the ticket still matches the current project, and its acceptance criteria can be verified. Raise a critical gap before implementation. Return a design gap to B3 or B4 and update C1 when ticket boundaries or dependencies must change.

Use the approved final form as the target. Preserve exact contracts, behavior, copy, routes, schemas, and other settled decisions. Keep unrelated working-tree changes intact.

## Build one ticket at a time

For each ticket:

1. Mark it in progress in the issue tracker and `workflow-tracker.md`.
2. Establish the focused verification command or manual evidence that will prove the ticket.
3. Use `$demonstrate-technical-skills` for the techniques the ticket requires.
4. Implement one vertical, verifiable increment at a time. Write and run a failing test first when the approved method calls for test-driven development.
5. Run focused analysis and tests during the work. Resolve failures before moving to the next increment.
6. Inspect the diff against the ticket and remove self-created churn that has no traceable purpose. Preserve unrelated and pre-existing work.
7. Run every ticket acceptance method fresh. Read the full output and record the observed result.
8. Reconcile acceptance criteria, the issue tracker, the C1 plan, C2 evidence, and `workflow-tracker.md` with what actually happened.
9. Commit the intended ticket changes when the approved repository workflow calls for a ticket commit.

After delegated work, inspect the actual diff and run verification independently. Treat the subagent report as a lead, not proof. Keep the top-level agent responsible for integration and durable state.

When verification repeatedly fails, narrow the feedback loop and test falsifiable causes one at a time. Use D1 and D2 to gather evidence when the failure is not yet understood. Reconsider the design after evidence shows that the current shape is the cause.

## Complete the build

After the tickets are complete, compare the whole change against the Spec and coverage map. Run the full project verification required by the repository and Definition of Done. Record the exact commands, outputs, failures, and remaining evidence gaps.

Write the **C3 — Follow the plan to create the solution** record in the creating-solution document, linked to the completed tickets and verification evidence.

C3 is complete when the approved solution exists, every ticket and requirement is reconciled with evidence, and the tracker matches the actual state. Recommend `$start-evaluate` for the full acceptance verdict.
