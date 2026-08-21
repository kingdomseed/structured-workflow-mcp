---
name: design-testing-methods
description: Use before judging a solution or intermediate artifact, when existing tests may not answer the current question, or when the evidence requirements need to change.
---

# Design testing methods

Update `workflow-tracker.md` to D1 before starting. Identify the exact artifact, version, state, and scope under evaluation. Read its owning phase document, approved criteria, existing testing decisions, available evidence tools, relevant project instructions, and prior evaluation entries.

## Build the criteria map

List every criterion that the evaluation must judge and cite its source of truth. Separate required criteria from advisory standards. Evaluate criteria separately when they need different evidence.

For a finished solution, include both the cycle-specific design specifications and the project's standing Definition of Done. For an intermediate artifact, use the criteria established by its owning phase and the upstream artifact it must satisfy.

## Choose methods that generate evidence

Select one or more methods for each criterion. Prefer the smallest reliable method that exercises the real behavior or property being judged.

Methods may include:

- automated unit, integration, end-to-end, regression, performance, or static checks;
- a deterministic reproduction or comparison command;
- direct inspection of a document, diff, interface, schema, or artifact against its source;
- captured screenshots, recordings, traces, logs, measurements, or accessibility evidence;
- numbered manual checks or structured human feedback when judgment cannot be automated;
- independent review lenses with explicit criteria and read-only outputs.

For each method, record:

- the criterion it addresses;
- the artifact state and conditions it requires;
- the command, procedure, or review question;
- the data or evidence it will produce;
- the pass threshold or comparison rule;
- known limits and residual risk;
- who or what can run it.

Match the method to the claim. A screenshot can prove visible layout in one state; it cannot prove keyboard access or every responsive state. Static inspection can find certain security risks; it cannot prove runtime security. A test that passes through an internal detail may not prove user-visible behavior.

Use real failure cases and edge states where they matter. Make automated methods deterministic and agent-runnable when practical. When a human must judge, give numbered steps and the exact observation to record.

Reuse B4 testing decisions, C1 verification methods, and C2/C3 evidence when they address the current criterion and can be run or inspected against the current state. Add missing methods before reaching a verdict.

## Record the output

Write the **D1 — Design testing methods** section of the current evaluation entry.

D1 is complete when every criterion has a method that can produce a meaningful result. If no such method exists, record the missing evidence as a blocker.

Update `workflow-tracker.md` with the methods, evidence locations, blockers, and recommended next move.
