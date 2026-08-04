---
name: explain-how-the-solution-could-be-improved
description: Establish Criterion D3 by turning evaluation evidence into precise, prioritized improvements and routing each change to its owning criterion. Use after D2 identifies failures, partial verification, residual risks, or opportunities supported by evidence.
---

# Explain How the Solution Could Be Improved

Update `workflow-tracker.md` to D3 before starting. Read the D2 findings and verdict, design specifications, justified need, Spec, creating-solution records, current evaluation entry, and evidence behind each proposed improvement.

## Derive improvements from evidence

Start with observed gaps, not a generic quality checklist. For each improvement, record:

- the D2 finding and criterion it addresses;
- the evidence showing the current limitation;
- the change that would improve the result;
- the expected effect and how it would be tested;
- the phase and criterion that own the change;
- dependencies, risks, and human decisions involved;
- priority based on consequence and the approved goals.

Distinguish required correction from optional improvement. Work needed to satisfy an approved requirement or Definition of Done remains required work. Record it as a failed criterion that must return to its owner before shipping. Use optional improvement for a new opportunity, a consciously expanded goal, or a refinement beyond the approved bar.

Keep recommendations proportionate to the evidence. Prefer the smallest change that resolves the demonstrated gap while preserving the approved design. When the evidence challenges the design itself, return to B3 or B4. When it changes the understood need, return to Criterion A. When it concerns implementation quality, return to the relevant C criterion.

Let the human decide whether a new opportunity should change the approved scope or begin another cycle. Avoid hiding a scope decision inside a technical recommendation.

## Record the output

Write the **D3 — Explain how the solution could be improved** section of the current evaluation entry. Order improvements by what most affects the approved criteria and justified need. Preserve links to evidence and the owning artifacts.

D3 is complete when every accepted finding has a clear disposition: required correction, approved improvement, new-cycle candidate, accepted residual risk, or rejected finding with evidence.

Update `workflow-tracker.md` with the owning destinations and recommended next move.
