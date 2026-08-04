# Create Solution

Create Solution turns an approved Spec into a logical implementation plan,
human-approved tickets, and the intended working solution. It preserves the
connection between each requirement, the work that implements it, the evidence
that verifies it, and any justified change discovered during creation.

The phase entry point is [`$start-create-solution`](start-create-solution/SKILL.md).

## Criterion skills

1. [**C1 — Construct a logical plan**](construct-a-logical-plan/SKILL.md)
   translates the Spec into ordered, independently verifiable implementation
   tickets with complete requirement coverage.
2. [**C2 — Demonstrate technical skills**](demonstrate-technical-skills/SKILL.md)
   applies the techniques required by each ticket and records evidence of
   competent use.
3. [**C3 — Follow the plan to create the solution**](follow-the-plan-to-create-the-solution/SKILL.md)
   implements and verifies the approved tickets while keeping the plan, tracker,
   and solution aligned.
4. [**C4 — Justify changes to the design**](justify-changes-to-the-design/SKILL.md)
   records evidence-driven departures and updates the artifact that owns the
   affected decision.

## Durable artifacts

The creating-solution document contains the logical plan and tickets, technical
skills evidence, creation record, and justified changes. The issue tracker holds
the approved implementation tickets. The working solution and its verification
evidence are the handoff to Evaluate.

C2 happens through C3. It demonstrates the technical skills required to create
the approved solution. The approved Spec establishes the solution's shape and
technical decisions; C1 makes those decisions executable.

## Movement

New Criterion C work begins with C1. C2 and C3 usually proceed together, while C4
is used whenever implementation evidence requires a meaningful design change.
Discoveries can send work to any earlier criterion, and evaluation can be used
whenever the plan, a ticket, or the current implementation needs an
evidence-based judgment. Record every move and active ticket in
`workflow-tracker.md`.
