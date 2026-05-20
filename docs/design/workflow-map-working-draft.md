# Workflow Map Working Draft

This file exists so the workflow diagram can be edited as the shared
understanding changes.

## Status

This diagram is a working draft. It exposed a misunderstanding:

- `Setup Workspace`
- `Restore/Create Context`
- `Explore & Understand`
- `Workflow Entry Point`

These appeared in scaffold thinking and templates, but they were not defined
through shared understanding. The current resolution is that they disappear
entirely unless a concrete later need earns them back. **Collaborative
Modeling** is the entry point and **Workflow Selection** happens after enough
modeling to know what the model is working on.

The model should not load every possible workflow context up front. It should
begin with Collaborative Modeling, inspect only the context needed to understand
the user's intent, then route into the workflow or side flow that fits.

`discovery.md` disappeared as a named pre-phase, but the Planning with Files
idea still matters: discovery is file-backed across every phase. Findings,
questions, answers, evidence, and decisions should live in the relevant current
artifact instead of only in the model's context window.

## Current Diagram Under Review

```mermaid
flowchart TD
  A["User Starts Session"] --> CM["Collaborative Modeling / Grill With Docs"]

  CM --> C1["Read only needed CONTEXT.md / CONTEXT-MAP.md terms"]
  C1 --> C2["Check only relevant ADRs and existing docs"]
  C2 --> C3["Inspect code when answers are discoverable"]
  C3 --> C4["Ask one decision-branch question at a time"]
  C4 --> C5["Update ubiquitous language when terms resolve"]
  C5 --> C6["Create sparse ADRs only when needed"]
  C6 --> R{"Workflow Selection"}

  R --> FW["Feature Workflow"]
  R --> RW["Refactor Workflow"]
  R --> DW["Diagnostic Workflow"]
  R --> SF["Side Flow"]
  R --> AU["Already-reviewed plan -> Autonomous Loop"]

  FW --> P["PRD"]
  RW --> RI["Inventory / Audit Existing Structure"]
  RI --> P

  P --> PR["PRD Review Side Flow"]
  PR --> RA["Research Artifacts"]
  RA --> IP["Implementation Plan"]
  IP --> PLR["Plan Review Side Flow"]
  PLR --> AU

  AU --> SL["Slice Loop"]
  SL --> NPR["Near-PR Hardening Loop"]
  NPR --> PRF["PR Feedback Loop"]
  PRF --> EV["Evidence / Completion"]

  DW --> D1["Build feedback loop"]
  D1 --> D2["Reproduce failure"]
  D2 --> D3["Hypothesize / instrument"]
  D3 --> D4["Regression proof"]
  D4 --> D5["Fix and prove"]

  SF --> S1["Focused output: report, artifact, change, or routing back"]

  classDef clearer fill:#d8f3dc,stroke:#2d6a4f,color:#111;
  classDef partial fill:#fff3bf,stroke:#b08900,color:#111;
  classDef fuzzy fill:#e9ecef,stroke:#868e96,color:#111;

  class A,CM,C1,C2,C3,C4,C5,C6,R clearer;
  class FW,RW,DW,SF,P,PR,RA,IP partial;
  class PLR,AU,SL,NPR,PRF,EV,D1,D2,D3,D4,D5,S1 fuzzy;
```

## Questions Exposed

1. For diagnostic work, when does it use the full Collaborative Modeling path and when does it
   start directly from reproduction?
2. For side flows, when do they return to Collaborative Modeling versus
   producing a standalone artifact/change?

## Resolved

- Collaborative Modeling is the shared entry point.
- Workflow Selection follows Collaborative Modeling.
- The reason Workflow Selection comes after Collaborative Modeling is context
  control: the model should receive the context needed for the work, not every
  possible workflow context up front.
- `Setup Workspace`, `Restore/Create Context`, `Explore & Understand`, and
  `Workflow Entry Point` disappear as named phases unless a later concrete need
  earns them back.
- `discovery.md` disappears as a named pre-phase, but file-backed discovery
  remains a cross-phase practice.
