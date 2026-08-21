---
name: demonstrate-technical-skills
description: Use during creation when an approved implementation ticket requires code, content, tooling, testing, design execution, migration, or another specialist technique to be performed correctly.
---

# Demonstrate technical skills

Update `workflow-tracker.md` to C2 and name the active ticket before starting. Read the ticket, approved Spec and planning artifacts, current creating-solution document, `GLOSSARY.md`, nearest project instructions, relevant code and tests, and only the technique skills needed for this work.

## Apply the required skills

Treat C2 as demonstrated skill during creation. Criterion B and C1 define the chosen design and technical decisions. Apply them while C3 follows the plan.

Identify the skills the ticket requires. These may include a language or framework, architecture, testing, accessibility, security, performance work, data migration, visual implementation, debugging, documentation, or tool operation. Prefer local project guidance and current official sources before general knowledge.

For each required skill:

- state what competent application means for this ticket;
- load the relevant project or installed technique skill;
- follow the approved interfaces, conventions, and constraints;
- use the project's established tools and examples;
- produce evidence through the artifact, test, inspection, measurement, or review that fits the skill.

Use test-driven development when the ticket or project calls for it and a valid test seam exists. Test behavior through approved interfaces. Keep each test, implementation change, and verification together so each result guides the next change.

Keep the solution simple. Use established patterns when they fit. Preserve type and domain meaning. Handle failure paths. Avoid speculative generalization. When a technique reveals that the approved design cannot work as written, route the design question through C4 rather than improvising a new shape.

## Record the evidence

Add a C2 record for the active ticket to the creating-solution document. Include:

- the technical skills applied;
- the project guidance or sources followed;
- the artifact or behavior produced;
- the verification evidence;
- any limitation, residual risk, or design question discovered.

C2 evidence should let a reviewer judge the work without relying on the agent's confidence.

Update `workflow-tracker.md` with the demonstrated skills, evidence location, and recommended next move.
