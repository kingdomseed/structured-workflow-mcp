# Developing-Ideas Skill Audit

## Bucket Definition

Developing-Ideas takes the trusted Design Brief from Inquiry-Analysis and turns it into one chosen, planned solution. A skill belongs here when it helps the agent translate the brief into explicit success criteria, generate a small set of feasible approaches, prototype only to answer an unresolved design question, compare trade-offs against the criteria, gather human judgment on the chosen direction, and synthesize the PRD-ready requirements that hand off to Creating-Solution.

Developing-Ideas does not re-run the problem interview, write the production solution, slice work into implementation issues, run PR loops, or perform final acceptance evaluation. Those belong to Inquiry-Analysis, Creating-Solution, or Evaluating.

## Included Skills

| Source Pack | Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| Matt Pocock skills | design-an-interface | `/Users/jholt/.agents/skills/design-an-interface/SKILL.md`; upstream `https://github.com/mattpocock/skills` | adapt | high |
| Matt Pocock skills | prototype | `/Users/jholt/.agents/skills/prototype/SKILL.md`; upstream `https://github.com/mattpocock/skills` | adapt | high |
| Matt Pocock skills | to-prd | `/Users/jholt/.agents/skills/to-prd/SKILL.md`; upstream `https://github.com/mattpocock/skills` | adapt | high |
| Matt Pocock skills | grill-me | `/Users/jholt/.agents/skills/grill-me/SKILL.md`; upstream `https://github.com/mattpocock/skills` | reference | medium |
| Matt Pocock skills | improve-codebase-architecture | `/Users/jholt/.agents/skills/improve-codebase-architecture/SKILL.md`; upstream `https://github.com/mattpocock/skills` | reference | medium |
| ACT | act-workflow-spec | `/Users/jholt/.agentic-coding-toolkit/skills/act-workflow-spec/SKILL.md` | adapt | medium |
| ACT | act-workflow-refine-spec | `/Users/jholt/.agentic-coding-toolkit/skills/act-workflow-refine-spec/SKILL.md` | reference | medium |
| Codex Product Design | ideate | `/Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/ideate/SKILL.md` | adapt | high |
| Codex Product Design | prototype | `/Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/prototype/SKILL.md` | reference | medium |
| VGV Wingspan | brainstorm | `https://github.com/VeryGoodOpenSource/vgv-wingspan`, `skills/brainstorm/SKILL.md` | adapt | high |
| VGV Wingspan | refine-approach | `https://github.com/VeryGoodOpenSource/vgv-wingspan`, `skills/refine-approach/SKILL.md` | adapt | high |
| Superpowers | brainstorming | `https://github.com/obra/superpowers`, `skills/brainstorming/SKILL.md` | adapt | high |
| Impeccable | impeccable | `https://github.com/impeccableai/impeccable` unavailable during audit; local reviewed path `/Users/jholt/.agents/skills/impeccable/SKILL.md` | reference | low |

## Justifications

### Matt Pocock skills / design-an-interface

- Belongs in: developing-ideas
- Source: `/Users/jholt/.agents/skills/design-an-interface/SKILL.md`; upstream `https://github.com/mattpocock/skills`
- Recommendation: adapt
- Why it belongs here: It operationalizes the Developing-Ideas engine: gather requirements, generate multiple radically different designs, present each option, compare trade-offs, and synthesize a preferred direction. That maps directly to B2 feasible ideas and B3 chosen design.
- Confidence: high

### Matt Pocock skills / prototype

- Belongs in: developing-ideas
- Source: `/Users/jholt/.agents/skills/prototype/SKILL.md`; upstream `https://github.com/mattpocock/skills`
- Recommendation: adapt
- Why it belongs here: Its core rule is that a prototype is throwaway code that answers a question, and that only the answer survives. That matches the Structured Workflow rule to prototype to answer, not to build, during B2 feasible-ideas work.
- Confidence: high

### Matt Pocock skills / to-prd

- Belongs in: developing-ideas
- Source: `/Users/jholt/.agents/skills/to-prd/SKILL.md`; upstream `https://github.com/mattpocock/skills`
- Recommendation: adapt
- Why it belongs here: It synthesizes known context into a PRD without re-interviewing the user, which matches B4 as interview-free synthesis after the success criteria, feasible ideas, and chosen design are already settled. Adaptation should remove automatic issue-tracker publishing and keep the PRD as the durable phase artifact.
- Confidence: high

### Matt Pocock skills / grill-me

- Belongs in: developing-ideas
- Source: `/Users/jholt/.agents/skills/grill-me/SKILL.md`; upstream `https://github.com/mattpocock/skills`
- Recommendation: reference
- Why it belongs here: The design-tree questioning pattern is useful when a solution choice is human-ready and the agent needs to resolve trade-offs before recommending a direction. It should inform the B2/B3 decision conversation, not become a separate phase or replace the Design Brief handoff.
- Confidence: medium
- Please verify: Confirm whether this should remain a lightweight questioning pattern inside Developing-Ideas rather than an installable skill under the bucket.

### Matt Pocock skills / improve-codebase-architecture

- Belongs in: developing-ideas
- Source: `/Users/jholt/.agents/skills/improve-codebase-architecture/SKILL.md`; upstream `https://github.com/mattpocock/skills`
- Recommendation: reference
- Why it belongs here: It can help generate and compare architecture-improvement candidates after a Design Brief identifies maintainability or testability as the need. Its candidate report and grilling loop support B2 feasible ideas and B3 chosen design, but the initial discovery work overlaps Inquiry-Analysis.
- Confidence: medium
- Please verify: Use only when the Design Brief already frames architecture improvement as the solution-space problem; otherwise this drifts into inquiry.

### ACT / act-workflow-spec

- Belongs in: developing-ideas
- Source: `/Users/jholt/.agentic-coding-toolkit/skills/act-workflow-spec/SKILL.md`
- Recommendation: adapt
- Why it belongs here: It turns a task description into a clear executable specification with requirements, approach, testing expectations, success criteria, and out-of-scope boundaries. Adapted to start from the Design Brief, it can feed B1 design specifications and B4 PRD synthesis.
- Confidence: medium
- Please verify: It is Flutter/Dart-oriented and includes requirements questioning; keep only the PRD/spec synthesis mechanics that do not re-run Inquiry-Analysis.

### ACT / act-workflow-refine-spec

- Belongs in: developing-ideas
- Source: `/Users/jholt/.agentic-coding-toolkit/skills/act-workflow-refine-spec/SKILL.md`
- Recommendation: reference
- Why it belongs here: It reviews a pre-implementation spec for gaps, assumptions, UX incoherence, data-model mismatch, and codebase alignment. That is useful evidence for the PRD adversarial review described at the B4 boundary, while the actual review engine remains Evaluating.
- Confidence: medium
- Please verify: Treat as a PRD-review lens, not as a separate Developing-Ideas procedure.

### Codex Product Design / ideate

- Belongs in: developing-ideas
- Source: `/Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/ideate/SKILL.md`
- Recommendation: adapt
- Why it belongs here: It requires a confirmed design brief, inspects visual references, generates exactly three independent options, varies hierarchy/layout/interaction/product framing, and stops for human selection before build. That is a strong B2/B3 visual-ideas pattern.
- Confidence: high

### Codex Product Design / prototype

- Belongs in: developing-ideas
- Source: `/Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/prototype/SKILL.md`
- Recommendation: reference
- Why it belongs here: Its routing rules enforce design-brief confirmation, ideation before build when no visual target exists, and user selection before implementation. It is useful for structuring visual prototype jumps, but its coded-prototype workflows can cross into Creating-Solution unless constrained to throwaway decision evidence.
- Confidence: medium
- Please verify: Keep the no-build-before-visual-target and selection gates; do not import production frontend build behavior into Developing-Ideas.

### VGV Wingspan / brainstorm

- Belongs in: developing-ideas
- Source: `https://github.com/VeryGoodOpenSource/vgv-wingspan`, `skills/brainstorm/SKILL.md`
- Recommendation: adapt
- Why it belongs here: It asks for success criteria early, proposes 2-3 concrete approaches with trade-offs, leads with a recommendation, applies YAGNI, asks the user to choose an approach, and captures a brainstorm/design document. This maps closely to B1, B2, and B3.
- Confidence: high

### VGV Wingspan / refine-approach

- Belongs in: developing-ideas
- Source: `https://github.com/VeryGoodOpenSource/vgv-wingspan`, `skills/refine-approach/SKILL.md`
- Recommendation: adapt
- Why it belongs here: It reviews brainstorm or planning documents before implementation using criteria such as completeness, clarity, specificity, YAGNI, feasibility, and fidelity to user intent. That fits the B3/B4 refinement pass before the PRD is trusted downstream.
- Confidence: high

### Superpowers / brainstorming

- Belongs in: developing-ideas
- Source: `https://github.com/obra/superpowers`, `skills/brainstorming/SKILL.md`
- Recommendation: adapt
- Why it belongs here: It explicitly turns ideas into designs and specs, asks about purpose, constraints, and success criteria, proposes 2-3 approaches with trade-offs, gets user approval, and writes a design document before implementation. This is a strong source for the generate-options-and-choose engine.
- Confidence: high

### Impeccable / impeccable

- Belongs in: developing-ideas
- Source: `https://github.com/impeccableai/impeccable` unavailable during audit; local reviewed path `/Users/jholt/.agents/skills/impeccable/SKILL.md`
- Recommendation: reference
- Why it belongs here: The local skill provides frontend design critique and refinement guidance across hierarchy, typography, layout, color, interaction, accessibility, copy, and anti-patterns. Those are useful as design criteria and option-quality lenses for UI-heavy B2/B3 work, but the skill is primarily production-UI craft and QA.
- Confidence: low
- Please verify: The requested GitHub URL returned repository-not-found during audit; confirm the intended canonical Impeccable source before importing ideas.

## Borderline / Deferred

- Matt Pocock skills: `to-issues` belongs in Creating-Solution because Structured Workflow says issue slicing starts after the PRD; `request-refactor-plan` mixes solution planning with commit-level implementation planning and issue creation; `grill-with-docs` is more Inquiry/Glossary/ADR oriented than B-phase option selection; `review`, `tdd`, `diagnose`, `triage`, and `qa` are Evaluating or Creating-Solution.
- ACT: `act-workflow-plan` belongs in Creating-Solution because it maps a spec to implementation phases and files; `act-flutter-tdd` is useful for PRD testing decisions but primarily governs test-first build execution; `act-figma-to-flutter`, `act-flutter-development`, `act-flutter-robot-testing`, migrations, Sentry setup, Drift setup, and Git skills are implementation or tooling.
- Codex Product Design: `get-context` is a transition/brief-confirmation gate and overlaps Inquiry-Analysis; `audit` and `design-qa` are Evaluating; `image-to-code`, `url-to-code`, and `share` are Creating-Solution or delivery; `research` is Inquiry-Analysis; `user-context` and `index` are routing/context support.
- VGV Wingspan: `plan`, `plan-technical-review`, `build`, `review`, `create-branch`, `create-commit`, `create-pr`, `rebase`, `hotfix`, and `debrief` are Creating-Solution, Evaluating, or workflow-management rather than Developing-Ideas.
- VGV AI Flutter Plugin: no strong Developing-Ideas candidate found. The pack provides Flutter/Dart implementation standards such as layered architecture, navigation, Bloc, accessibility, theming, testing, security, SDK upgrades, and project creation. These can inform Creating-Solution technical approach or Evaluating criteria, but they do not themselves translate a Design Brief into options and a PRD.
- Superpowers: `writing-plans` belongs in Creating-Solution because it writes implementation task plans; `subagent-driven-development`, `executing-plans`, worktrees, branch finishing, code review, debugging, TDD, and verification skills are implementation or evaluation. `dispatching-parallel-agents` is a cross-phase operating pattern, not a Developing-Ideas skill.
- Cursor Team Kit: no strong Developing-Ideas candidate found. `workflow-from-chats` is workflow-memory extraction; `verify-this`, smoke tests, compiler checks, PR review canvas, code-quality review, CI loops, merge conflict repair, and PR preparation belong to Evaluating, Creating-Solution, or workflow-management.
- Factory/Droid borrowed: no strong Developing-Ideas candidate found. `simplify`, `qa`, `review`, security review, incident response, wiki/PDF/PowerPoint generation, and install helpers are review, validation, delivery, or tooling flows.
- Flutter official skills: no strong Developing-Ideas candidate found. The official skills are implementation-oriented Flutter tasks such as responsive layout, routing, localization, widget tests, integration tests, previews, HTTP, JSON serialization, and architecture best practices. The embedded `grill-with-docs` copy is not a Flutter official phase candidate and is already covered by the Matt-style pattern.
- Dart official skills: no strong Developing-Ideas candidate found. The skills cover Dart implementation, testing, mocks, package conflicts, runtime errors, static analysis, coverage, and CLI creation.
- Bug Hunter: no strong Developing-Ideas candidate found. The pack is an adversarial bug/security review and fix pipeline; it belongs to Evaluating and, when auto-fixing, Creating-Solution.
- planning-with-files: no Developing-Ideas-specific candidate found. It is important prior art for durable file-based planning and session recovery, but Structured Workflow already uses that idea at the system level through phase documents and `workflow-tracker.md`.
- Cline Memory Bank: no Developing-Ideas-specific candidate found. It is cross-phase durable-memory prior art with projectbrief/productContext/activeContext/systemPatterns/techContext/progress files, not a B-phase option-generation or PRD-synthesis skill.
- vgv-pr-roundtrip: deferred to Creating-Solution and GitHub/PR workflow. It begins from a buildable slice and runs build, review, commit, PR, feedback, and merge-ready loops, which occur after the PRD and issue slicing.
- Linear curated: deferred to workflow-management or Creating-Solution. Linear can receive exported PRD/issue work, but Structured Workflow says the PRD is the Developing-Ideas output and issue slicing belongs to Creating-Solution. Also, external issue creation requires explicit confirmation.
- Sentry curated: deferred to Inquiry-Analysis or Evaluating. It can provide production-error evidence or verification data, but it does not generate solution options or synthesize PRD-ready requirements.

## Notes For Final Synthesis

- Keep Developing-Ideas as one coherent phase document. Do not split it into imported subskills like brainstorm, prototype, PRD, or refine.
- Strong reusable moves are: set criteria first; generate 2-3 concrete approaches; lead with a recommendation; compare against criteria; use YAGNI; prototype only to answer one question; make the human choose among viable approaches; synthesize the PRD without re-interviewing.
- Treat external skills as source evidence and patterns. Adapt their mechanics into the B1-B4 document shape rather than preserving their file paths, issue-tracker side effects, or phase names.
- The highest-value direct source patterns are Matt `design-an-interface`, Matt `prototype`, Matt `to-prd`, Product Design `ideate`, VGV `brainstorm`, VGV `refine-approach`, and Superpowers `brainstorming`.
- Avoid pulling implementation-plan, issue-slicing, PR, CI, QA, observability, and production-code design-system skills into this bucket. Those are useful later, but importing them here would blur Developing-Ideas with Creating-Solution and Evaluating.
