# Workflow-Management Skill Audit

Re-verified 2026-07-03 against the staged sources in `TEMP-sources/` (see
`TEMP-sources/INVENTORY.md` for pins). Every entry below cites a
`TEMP-sources/` path plus its pinned version. Long-tail packs that were not
re-staged are preserved verbatim in the final section.

## Bucket Definition

Workflow-Management is the cross-phase support layer for Structured Workflow. It is not a fifth MYP phase. It includes skills, hooks, memory patterns, trackers, handoffs, glossary mechanics, continuity behavior, project templates, context-recovery systems, issue-tracker coordination, and reusable working conventions that keep the four-phase cycle coherent across context shifts.

Inclusion rule: include only skills that maintain or recover the workflow state across phases, move durable artifacts between phases, configure the project-level workflow surface, or preserve shared language/context. Skills that primarily perform inquiry, ideation, implementation, testing, code review, design work, or domain-specific engineering are deferred to the relevant phase unless they contain a reusable workflow-management mechanic.

Ownership rule applied throughout: a source item is "adapt" or "copy" in at most one bucket. Where the primary home is a different bucket, the entry here is "reference" and names the owning bucket. In particular: the slicing act itself (decomposing a completed Spec into issues) is owned by creating-solution; workflow-management owns tracker-coordination and export mechanics — labels, states, publish order, resumption, and position updates.

## Skills

| Source Pack | Skill | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| Matt Pocock skills | handoff | `TEMP-sources/mattpocock-skills/skills/productivity/handoff/SKILL.md` (commit `272f99b`, 2026-07-03) | adapt | high |
| Matt Pocock skills | claude-handoff | `TEMP-sources/mattpocock-skills/skills/in-progress/claude-handoff/SKILL.md` (commit `272f99b`) | reference | medium |
| Matt Pocock skills | setup-matt-pocock-skills | `TEMP-sources/mattpocock-skills/skills/engineering/setup-matt-pocock-skills/SKILL.md` (commit `272f99b`) | adapt | high |
| Matt Pocock skills | domain-modeling | `TEMP-sources/mattpocock-skills/skills/engineering/domain-modeling/SKILL.md` (commit `272f99b`) | reference | high |
| Matt Pocock skills | triage | `TEMP-sources/mattpocock-skills/skills/engineering/triage/SKILL.md` (commit `272f99b`) | adapt | high |
| Matt Pocock skills | wayfinder | `TEMP-sources/mattpocock-skills/skills/in-progress/wayfinder/SKILL.md` (commit `272f99b`) | adapt | medium |
| Matt Pocock skills | to-issues | `TEMP-sources/mattpocock-skills/skills/engineering/to-issues/SKILL.md` (commit `272f99b`) | reference | high |
| Matt Pocock skills | to-prd | `TEMP-sources/mattpocock-skills/skills/engineering/to-prd/SKILL.md` (commit `272f99b`) | reference | medium |
| Matt Pocock skills | ubiquitous-language (deprecated) | `TEMP-sources/mattpocock-skills/skills/deprecated/ubiquitous-language/SKILL.md` (commit `272f99b`) | reference | medium |
| Matt Pocock skills | grill-with-docs | `TEMP-sources/mattpocock-skills/skills/engineering/grill-with-docs/SKILL.md` (commit `272f99b`) | reference | low |
| Matt Pocock skills | writing-great-skills | `TEMP-sources/mattpocock-skills/skills/productivity/writing-great-skills/SKILL.md` (commit `272f99b`) | reference | medium |
| ACT | act-config | `TEMP-sources/act/skills/act-config/SKILL.md` (VERSION 1.0.0, 2026-07-03) | adapt | high |
| ACT | act-workflow-compound | `TEMP-sources/act/skills/act-workflow-compound/SKILL.md` (VERSION 1.0.0) | adapt | high |
| ACT | act-workflow-work (deprecated) | `TEMP-sources/act/skills/act-workflow-work/SKILL.md` (VERSION 1.0.0) | reference | medium |
| ACT | act-git-worktree | `TEMP-sources/act/skills/act-git-worktree/SKILL.md` (VERSION 1.0.0) | reference | medium |
| Codex Product Design | user-context | `TEMP-sources/product-design-0.1.47/skills/user-context/SKILL.md` (0.1.47) | adapt | high |
| Codex Product Design | get-context | `TEMP-sources/product-design-0.1.47/skills/get-context/SKILL.md` (0.1.47) | reference | medium |
| VGV Wingspan | refine-approach | `TEMP-sources/vgv-wingspan/skills/refine-approach/SKILL.md` (commit `7691c77`, 2026-07-03) | reference | medium |
| VGV Wingspan | debrief | `TEMP-sources/vgv-wingspan/skills/debrief/SKILL.md` (commit `7691c77`) | reference | medium |
| Superpowers | using-superpowers | `TEMP-sources/superpowers/skills/using-superpowers/SKILL.md` (v6.1.1, commit `d884ae0`) | adapt | high |
| Superpowers | dispatching-parallel-agents | `TEMP-sources/superpowers/skills/dispatching-parallel-agents/SKILL.md` (v6.1.1) | adapt | high |
| Superpowers | subagent-driven-development | `TEMP-sources/superpowers/skills/subagent-driven-development/SKILL.md` (v6.1.1) | reference | high |
| Superpowers | verification-before-completion | `TEMP-sources/superpowers/skills/verification-before-completion/SKILL.md` (v6.1.1) | reference | high |
| Superpowers | using-git-worktrees | `TEMP-sources/superpowers/skills/using-git-worktrees/SKILL.md` (v6.1.1) | reference | medium |
| Superpowers | writing-skills | `TEMP-sources/superpowers/skills/writing-skills/SKILL.md` (v6.1.1) | reference | medium |

### Matt Pocock skills / handoff

- Belongs in: workflow-management
- Source: `TEMP-sources/mattpocock-skills/skills/productivity/handoff/SKILL.md` (commit `272f99b`, 2026-07-03)
- Recommendation: adapt
- Why it belongs here: The fresh version compacts the conversation into a handoff document for a fresh agent, includes a "suggested skills" section, redacts secrets, and — critically for our fixed-file model — refuses to duplicate content already captured in durable artifacts (PRDs, plans, ADRs, issues, commits, diffs), referencing them by path or URL instead. That is exactly the glue Structured Workflow needs between sessions: the phase documents remain the memory; the handoff points at them. Adapt to write against the phase document, `workflow-tracker.md`, and GLOSSARY.md rather than the OS temp directory.
- Confidence: high

### Matt Pocock skills / claude-handoff

- Belongs in: workflow-management (reference only)
- Source: `TEMP-sources/mattpocock-skills/skills/in-progress/claude-handoff/SKILL.md` (commit `272f99b`)
- Recommendation: reference
- Why it belongs here: A new in-progress variant of handoff that, instead of saving a document, launches a named background agent seeded with the handoff summary (`claude --bg --name ...`). The handoff content rules are identical to `handoff` (suggested skills, no artifact duplication, redaction). We adapt `handoff`; this variant is a harness-specific dispatch pattern worth keeping as a reference for "handoff straight into a fresh agent" once harness support exists.
- Confidence: medium

### Matt Pocock skills / setup-matt-pocock-skills

- Belongs in: workflow-management
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/setup-matt-pocock-skills/SKILL.md` (commit `272f99b`)
- Recommendation: adapt
- Why it belongs here: The fresh version is a full project-configuration surface: it explores repo state, walks the user through three decisions one at a time (issue tracker incl. GitHub/GitLab/local-markdown/other and PRs-as-request-surface, triage label vocabulary mapping, single- vs multi-context domain docs), confirms drafts before writing, and records the results in `docs/agents/*.md` plus an `## Agent skills` block in CLAUDE.md/AGENTS.md. Structured Workflow needs the same shape for its own setup: where the phase documents live, which tracker backs Creating-Solution's issue export, the human-ready/agent-ready label mapping, and where GLOSSARY.md and `workflow-tracker.md` sit. The explore-present-confirm-write flow and seed templates are directly reusable.
- Confidence: high

### Matt Pocock skills / domain-modeling

- Belongs in: inquiry-analysis (referenced by workflow-management)
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/domain-modeling/SKILL.md` (commit `272f99b`)
- Recommendation: reference
- Why it belongs here: This is the successor to the now-deprecated `ubiquitous-language` and the strongest source for GLOSSARY.md maintenance as an always-on, cross-phase discipline: challenge new terms against the existing glossary, sharpen fuzzy language into canonical terms, stress-test relationships with concrete scenarios, cross-reference claims against code, update `CONTEXT.md` inline the moment a term resolves ("Don't batch these up"), and keep the file "a glossary and nothing else" — the exact rule our GLOSSARY.md follows. Inquiry-Analysis is the single adapt owner for the active challenge-and-sharpen behavior. Workflow-Management references the file-shape and always-on maintenance mechanics when defining `GLOSSARY.md`, `GLOSSARY-MAP.md`, and sparse decision-record conventions.
- Confidence: high

### Matt Pocock skills / triage

- Belongs in: workflow-management
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/triage/SKILL.md` (commit `272f99b`)
- Recommendation: adapt
- Why it belongs here: The fresh version is a full tracker-coordination state machine: two category roles, five state roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), canonical-role-to-label mapping supplied by project config, PRs treated as "an issue with attached code", durable agent briefs (AGENT-BRIEF.md), an `.out-of-scope/` knowledge base for rejected requests, a verify-the-claim step before grilling, and explicit session resumption ("read prior triage notes, don't re-ask resolved questions"). The ready-for-agent/ready-for-human distinction maps directly onto our human-ready/agent-ready labels, and the resumption and brief mechanics are context-recovery patterns.
- Confidence: high

### Matt Pocock skills / wayfinder

- Belongs in: workflow-management
- Source: `TEMP-sources/mattpocock-skills/skills/in-progress/wayfinder/SKILL.md` (commit `272f99b`)
- Recommendation: adapt
- Why it belongs here: New since the old audit. Wayfinder charts work "too big for one agent session" as a shared map on the issue tracker: a map issue that is an index (one-line gists linking to closed tickets), child investigation tickets sized to one session, claim-by-assignment so concurrent sessions skip each other, native blocking relationships rendering the frontier, one-ticket-per-session discipline, and an explicit "fog of war" section for questions not yet sharp enough to be tickets. This is cross-session continuity plus tracker coordination in its purest form — the tracker itself carries position and decisions across sessions. Adapt the map/ticket/fog/claim mechanics; the ticket types that do the work (research, prototype, grilling) invoke phase skills.
- Confidence: medium
- Please verify: Overlap with `workflow-tracker.md` (both track position) and with Creating-Solution's Spec-to-issues slicing. Wayfinder is pre-Spec investigation decomposition; slicing an approved Spec is different work. Final synthesis should draw that line explicitly.

### Matt Pocock skills / to-issues

- Belongs in: workflow-management (reference only; primary home creating-solution)
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/to-issues/SKILL.md` (commit `272f99b`)
- Recommendation: reference
- Why it belongs here: The old audit claimed this as adapt; that was wrong under the ownership split. The slicing act — breaking the Spec into tracer-bullet vertical slices, quizzing the user on granularity and dependencies — is creating-solution's work and creating-solution owns this skill. What workflow-management takes by reference is the export mechanics: publish issues in dependency order so real identifiers can be referenced in "Blocked by", apply the ready-for-agent triage label on publish, use the durable issue-body template (What to build / Acceptance criteria / Blocked by / Parent), and never close or modify the parent issue. Those are tracker-coordination conventions this bucket standardizes for whatever the phases publish.
- Confidence: high

### Matt Pocock skills / to-prd

- Belongs in: workflow-management (reference only; primary home developing-ideas)
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/to-prd/SKILL.md` (commit `272f99b`)
- Recommendation: reference
- Why it belongs here: The PRD synthesis itself (user stories, implementation decisions, test seams) is Spec work owned by developing-ideas. Workflow-management references two mechanics: the "do NOT interview the user — just synthesize what you already know" rule (turning accumulated context into a durable artifact without re-litigating it) and the publish step (write to the project issue tracker with the `ready-for-agent` label, no additional triage). Both are handoff/export conventions rather than ideation.
- Confidence: medium

### Matt Pocock skills / ubiquitous-language (deprecated)

- Belongs in: workflow-management (reference only; deprecated upstream)
- Source: `TEMP-sources/mattpocock-skills/skills/deprecated/ubiquitous-language/SKILL.md` (commit `272f99b`)
- Recommendation: reference
- Why it belongs here: Now in `skills/deprecated/`. Its glossary mechanics have been absorbed by `domain-modeling` (which we adapt above): challenge/sharpen terms, canonical choices, glossary-only file discipline. What `domain-modeling` did not carry over — and what remains worth referencing for GLOSSARY.md's format — is the concrete output shape: grouped term tables with "Aliases to avoid" columns, an explicit Relationships section with cardinality, a short dev/domain-expert example dialogue, and a "Flagged ambiguities" section. Keep as a format reference for our GLOSSARY.md template; do not adapt the skill itself.
- Confidence: medium

### Matt Pocock skills / grill-with-docs

- Belongs in: workflow-management (reference only; primary home inquiry-analysis)
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/grill-with-docs/SKILL.md` (commit `272f99b`)
- Recommendation: reference
- Why it belongs here: The fresh version has collapsed to a one-line composition: "Run a `/grilling` session, using the `/domain-modeling` skill." The old audit's reasons for including it (inline glossary/ADR updates) now live entirely in `domain-modeling`. The interview lives in inquiry-analysis. Retained only as evidence of the composition pattern — a phase skill invoking the cross-phase glossary engine — which is exactly how our phase skills should call GLOSSARY.md maintenance.
- Confidence: low

### Matt Pocock skills / writing-great-skills

- Belongs in: workflow-management (reference only; build-time, not runtime)
- Source: `TEMP-sources/mattpocock-skills/skills/productivity/writing-great-skills/SKILL.md` (commit `272f99b`)
- Recommendation: reference
- Why it belongs here: New since the old audit. A dense reference on making skills predictable: model- vs user-invocation trade-offs (context load vs cognitive load), router skills, the information hierarchy (in-skill step / in-skill reference / external reference), progressive disclosure by branch, leading words, and failure modes (premature completion, duplication, sediment, sprawl, no-ops). This shapes how we author Structured Workflow's own skill surface — including this bucket's continuity skills — but it is not itself a runtime workflow-management behavior. Reference for final synthesis and skill authoring.
- Confidence: medium

Judged and not placed (read in full, no entry): `productivity/grilling` (relentless one-question-at-a-time interview — inquiry-analysis owns it), `in-progress/loop-me` (grilling variant producing personal workflow specs in `workflows/*.md`; its trigger/checkpoint/push-right/brief vocabulary is interesting but aimed at personal automation, not this system), `productivity/teach` (a stateful teaching workspace — out of scope for the design cycle).

### ACT / act-config

- Belongs in: workflow-management
- Source: `TEMP-sources/act/skills/act-config/SKILL.md` (VERSION 1.0.0, 2026-07-03)
- Recommendation: adapt
- Why it belongs here: New in ACT 1.0.0 and a direct analog of our project-template/configuration surface. It validates or creates `.act/config.yaml` (workflow storage backend: GitHub issues vs local markdown path), writes workflow semantics to `.act/workflow.md`, and ensures agent guidance lands in an existing `AGENTS.md`/`CLAUDE.md` (asking which to create only when neither exists — never both). The validator-first flow ("if config is valid, keep it; do not ask"), recommended-option prompts grounded in `git remote` inspection, and script-owned config writes ("do not hand-write `.act/config.yaml`") are exactly the shape a `structured-workflow setup` skill should take for configuring phase-doc locations, tracker backend, and the working-file set.
- Confidence: high

### ACT / act-workflow-compound

- Belongs in: workflow-management
- Source: `TEMP-sources/act/skills/act-workflow-compound/SKILL.md` (VERSION 1.0.0)
- Recommendation: adapt
- Why it belongs here: Still present in 1.0.0. It captures the highest-value session insights into `ai_docs/solutions/<category>/<slug>.md` — workflow-agnostic (feature delivery, refactors, bugs, reviews, diagnostics), at most one clarifying question, minimal frontmatter including a `confidence: high|medium|low` field, and a quality bar of "a future session answers what was learned, why it worked, what to repeat or avoid, and where the references are, in under a minute". This is the bounded promote-durable-learning mechanic Structured Workflow needs at cycle close or loop-back, feeding project templates and standing criteria without turning phase documents into transcripts. Its confidence field matches our confidence model directly.
- Confidence: high

### ACT / act-workflow-work (deprecated)

- Belongs in: workflow-management (reference only; deprecated upstream, successor owned by creating-solution)
- Source: `TEMP-sources/act/skills/act-workflow-work/SKILL.md` (VERSION 1.0.0)
- Recommendation: reference
- Why it belongs here: The fresh frontmatter reads "Deprecated legacy workflow skill. Prefer act-implement." — and `act-implement` (plan execution) is creating-solution's to own. What this bucket keeps by reference is the plan-truthfulness contract, still the best-articulated source for keeping durable files honest: "work is not complete until the plan file has been reconciled with the work performed", completed items must be checked in the file before being reported, blocked items stay unchecked with a written blocker note, and "if execution is delegated to a subagent, the top-level controller remains responsible for plan reconciliation". Generalized, that is the reconciliation discipline for `workflow-tracker.md`, phase documents, and issue state.
- Confidence: medium
- Please verify: Confirm the successor `act-create-*`/`act-implement` skills carry an equivalent reconciliation contract when creating-solution audits them; if they do, this bucket can cite those instead of a deprecated skill.

### ACT / act-git-worktree

- Belongs in: workflow-management (reference only)
- Source: `TEMP-sources/act/skills/act-git-worktree/SKILL.md` (VERSION 1.0.0)
- Recommendation: reference
- Why it belongs here: Script-owned worktree lifecycle (create/list/delete/rename/switch/cleanup) with `.env` copying, automatic `.gitignore` management, and confirmation-gated destructive actions. Per the 0.5.0 changelog it also symlinks gitignored agent files into new worktrees "so agent memory and config carry over automatically" — a workspace-isolation detail that matters to us precisely because our durable files must follow the agent into the worktree. Reference for workspace-isolation policy only; the ACT script itself stays theirs.
- Confidence: medium
- Please verify: Include only if Structured Workflow will own workspace-isolation guidance rather than deferring to harness-native worktree tools (see Superpowers using-git-worktrees, which prefers native tools).

### Codex Product Design / user-context

- Belongs in: workflow-management
- Source: `TEMP-sources/product-design-0.1.47/skills/user-context/SKILL.md` (0.1.47; unchanged since old audit)
- Recommendation: adapt
- Why it belongs here: A saved-context store so "future Product Design work starts from the right sources": a curated `user-context.md` state file plus named assets, a preflight script that loads saved entries as starting context, an explicit "inspect only the saved references needed for the current task" rule, a curation bar ("a few high-value references over a dump"), a secrets prohibition, and `status: not provided` as an honest empty marker. Generalized, this is the pattern for our project templates and standing context anchors — source locations, standing criteria, product/domain references — that each new cycle starts from.
- Confidence: high

### Codex Product Design / get-context

- Belongs in: workflow-management (reference only; primary home inquiry-analysis)
- Source: `TEMP-sources/product-design-0.1.47/skills/get-context/SKILL.md` (0.1.47; unchanged)
- Recommendation: reference
- Why it belongs here: A mandatory design-brief gate: question mode when key context is unclear, playback mode when it isn't ("do not re-ask answered questions; play back the brief"), a hard boundary against building while context is missing, and "done means the user has confirmed the design brief". The brief itself is inquiry-analysis territory (it is literally a Design Brief gate); workflow-management references the gating mechanics as a phase-entry check pattern — confirm the upstream artifact before downstream work starts.
- Confidence: medium

### VGV Wingspan / refine-approach

- Belongs in: workflow-management (reference only; primary home evaluating)
- Source: `TEMP-sources/vgv-wingspan/skills/refine-approach/SKILL.md` (commit `7691c77`, 2026-07-03)
- Recommendation: reference
- Why it belongs here: The old audit had this as adapt; downgraded. The fresh version is predominantly document review — assess, score against clarity/completeness/specificity/YAGNI/scope criteria, surface one must-address item, fix with approval — which is the Evaluating engine pointed at a document, so evaluating owns it. What this bucket references is the handoff mechanic: when invoked directly, it offers "Clear context and plan/build (Recommended)" as the first option, following `references/clear-context-handoff.md` — a deliberate fresh-context transition that works only because the document, not the conversation, carries the state. That is our phase-document handoff model stated as a skill behavior, including the rule that sub-invoked runs return control to the caller instead of offering the transition.
- Confidence: medium

### VGV Wingspan / debrief

- Belongs in: workflow-management (reference only; primary home evaluating)
- Source: `TEMP-sources/vgv-wingspan/skills/debrief/SKILL.md` (commit `7691c77`)
- Recommendation: reference
- Why it belongs here: The old audit had this as adapt; downgraded under the one-bucket rule. The blameless incident analysis — evidence gathering from git/CI, root-cause synthesis, prevent/detect/respond action items — is evaluation work and evaluating owns it. Workflow-management references its closure-and-export mechanics: persist to `docs/debriefs/YYYY-MM-DD-<topic>-debrief.md` while context is fresh, be "honest about gaps" (mark unknowns rather than guessing), and render action items as ready-to-copy issue previews using the repo's own issue templates without calling any CLI ("output is display only"). Those are the cycle-closing memory and tracker-export patterns for when Evaluation seeds a new cycle.
- Confidence: medium

### Superpowers / using-superpowers

- Belongs in: workflow-management
- Source: `TEMP-sources/superpowers/skills/using-superpowers/SKILL.md` (v6.1.1, commit `d884ae0`, 2026-07-02)
- Recommendation: adapt
- Why it belongs here: The v6 version is the activation contract that the session-start hook injects into every session: invoke relevant skills before any response or action, process skills before implementation skills, a rationalization table of red-flag thoughts, a subagent exemption (`<SUBAGENT-STOP>`), platform-adaptation pointers, and an explicit instruction-priority order (user instructions > skills > default behavior). Structured Workflow needs its own version of exactly this: the always-injected contract that reconnects the agent to `workflow-tracker.md`, GLOSSARY.md, and the current phase document before it acts. Adapt the routing/priority/re-read-don't-remember structure ("Skills evolve. Read current version."); tone down the maximalist "1% chance" posture to fit our judgment-and-confidence model.
- Confidence: high

### Superpowers / dispatching-parallel-agents

- Belongs in: workflow-management
- Source: `TEMP-sources/superpowers/skills/dispatching-parallel-agents/SKILL.md` (v6.1.1)
- Recommendation: adapt
- Why it belongs here: This is the dispatch-conventions skill, and dispatch conventions are cross-phase support: every phase dispatches researchers, reviewers, or fixers. It defines when parallel dispatch applies (independent domains, no shared state), the prompt contract (focused scope, self-contained context, constraints, explicit expected output), the mechanic (multiple dispatches in one response = parallel), and the integration step (read summaries, check conflicts, verify — "Agents can make systematic errors"). Its core stance — subagents "should never inherit your session's context or history; you construct exactly what they need" — is the isolation principle our phase documents make cheap to honor.
- Confidence: high

### Superpowers / subagent-driven-development

- Belongs in: workflow-management (reference only; primary home creating-solution)
- Source: `TEMP-sources/superpowers/skills/subagent-driven-development/SKILL.md` (v6.1.1)
- Recommendation: reference
- Why it belongs here: The old audit had this as adapt; downgraded. The skill executes implementation plans — fresh implementer per task, spec-compliance plus quality review per task, final whole-branch review — which is creating-solution's execution engine. Workflow-management references three cross-phase mechanics from it: (1) the Durable Progress ledger — "Conversation memory does not survive compaction... Track progress in a ledger file, not only in todos", with post-compaction recovery via the ledger and `git log` over recollection; (2) file handoffs — briefs, reports, and review packages passed as file paths so nothing bulky lives in the controller's context; (3) the implementer status vocabulary (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED) with defined controller responses. All three generalize beyond code execution to any delegated phase work.
- Confidence: high

### Superpowers / verification-before-completion

- Belongs in: workflow-management (reference only; primary home evaluating)
- Source: `TEMP-sources/superpowers/skills/verification-before-completion/SKILL.md` (v6.1.1)
- Recommendation: reference
- Why it belongs here: The old audit had this as adapt; downgraded under the one-bucket rule. "No completion claims without fresh verification evidence" is the verification engine's iron law, and Evaluating is our cross-phase verification engine — it owns this skill. Workflow-management references it wherever this bucket writes state: no `workflow-tracker.md` position update, tracker state change, or handoff claim without the evidence that backs it (its table explicitly covers "Agent completed — VCS diff shows changes, not agent reports success", which binds our dispatch conventions).
- Confidence: high
- Please verify: Confirm the evaluating bucket's fresh audit claims this as adapt; if evaluating does not take it, promote it back to adapt here rather than letting it fall between buckets.

### Superpowers / using-git-worktrees

- Belongs in: workflow-management (reference only)
- Source: `TEMP-sources/superpowers/skills/using-git-worktrees/SKILL.md` (v6.1.1)
- Recommendation: reference
- Why it belongs here: The v6 version adds a detect-first discipline (already-isolated detection with a submodule guard), prefers native harness worktree tools over raw git ("Never fight the harness"), requires consent before creating isolation, verifies the worktree directory is gitignored, and demands a clean test baseline before work starts. Reference-level workspace-isolation policy for multi-agent work around the same phase documents; pairs with the ACT worktree reference above.
- Confidence: medium

### Superpowers / writing-skills

- Belongs in: workflow-management (reference only; build-time, not runtime)
- Source: `TEMP-sources/superpowers/skills/writing-skills/SKILL.md` (v6.1.1)
- Recommendation: reference
- Why it belongs here: New to the audit surface in v6. TDD applied to skill authoring: baseline pressure scenarios before writing (RED), minimal skill addressing observed rationalizations (GREEN), loophole-closing (REFACTOR), "Match the Form to the Failure" (prohibition tables vs positive recipes vs structural slots), and description discipline (triggers only — never summarize the workflow, or agents follow the description instead of the skill). Like Matt's writing-great-skills, this governs how we build and test Structured Workflow's own skills, hooks, and dispatch prompts rather than being a runtime behavior.
- Confidence: medium

## Hooks

This bucket is the natural home for continuity and session hooks: they are how the system reconnects the agent to `workflow-tracker.md`, GLOSSARY.md, and the current phase document as context shifts.

| Source Pack | Hook | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| Superpowers | session-start bootstrap (+ hooks.json, hooks-cursor.json, run-hook.cmd) | `TEMP-sources/superpowers/hooks/` (v6.1.1, commit `d884ae0`) | adapt | high |
| ACT | session logger (act-claude-log-session.js + core/act-logger, hooks.json wiring) | `TEMP-sources/act/hooks/claude/act-claude-log-session.js`, `TEMP-sources/act/hooks/hooks.json` (VERSION 1.0.0) | adapt | medium |
| ACT | statusline (act-claude-statusline.js) | `TEMP-sources/act/hooks/claude/act-claude-statusline.js` (VERSION 1.0.0) | reference | medium |
| ACT | Dart auto-format (act-claude-dart-format.js) | `TEMP-sources/act/hooks/claude/act-claude-dart-format.js` via `TEMP-sources/act/hooks/hooks.json` (VERSION 1.0.0) | reference | high |
| VGV Wingspan | recommend-plugins.sh (PreToolUse) | `TEMP-sources/vgv-wingspan/hooks/recommend-plugins.sh`, `TEMP-sources/vgv-wingspan/hooks/hooks.json` (commit `7691c77`) | reference | medium |
| VGV AI Flutter Plugin | warn-missing-mcp.sh (SessionStart) | `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/warn-missing-mcp.sh` (commit `d513aac`) | reference | medium |

### Superpowers / session-start bootstrap

- Belongs in: workflow-management
- Source: `TEMP-sources/superpowers/hooks/session-start`, `hooks.json`, `hooks-cursor.json` (v6.1.1, commit `d884ae0`)
- Recommendation: adapt
- Why it belongs here: This is the closest source model for our planned continuity hooks. `hooks.json` fires the hook on SessionStart with matcher `startup|clear|compact` — meaning the injection re-fires after a context clear and after compaction, exactly the moments Structured Workflow must survive. The `session-start` script reads the full `using-superpowers` SKILL.md and emits it as JSON `additionalContext`, with per-platform output shapes (Cursor `additional_context`, Claude Code `hookSpecificOutput.additionalContext`, Copilot/SDK `additionalContext`) and JSON escaping handled in bash; `hooks-cursor.json` shows the parallel Cursor wiring. Our version injects the activation contract plus current `workflow-tracker.md` position and GLOSSARY.md pointer instead of a skills manifesto.
- Confidence: high

### ACT / session logger

- Belongs in: workflow-management
- Source: `TEMP-sources/act/hooks/claude/act-claude-log-session.js` and `TEMP-sources/act/hooks/hooks.json` (VERSION 1.0.0)
- Recommendation: adapt
- Why it belongs here: `hooks.json` wires the logger into essentially every lifecycle event — SessionStart, UserPromptSubmit, PreToolUse, PostToolUse (AskUserQuestion answers), PostToolUseFailure, PermissionRequest, SubagentStart/Stop, PreCompact, SessionEnd — writing canonicalized lines to per-session files under `ai_logs/`. The adapter normalizes harness events to a canonical shape, is settings-gated, and never blocks the session. For Structured Workflow this is the evidence trail that makes context recovery and delegated-work auditing possible: what happened, in order, in a durable file the next session can read. Adapt the pattern (canonical events, per-session log, PreCompact coverage); trim the event set to what recovery actually needs.
- Confidence: medium

### ACT / statusline

- Belongs in: workflow-management (reference only)
- Source: `TEMP-sources/act/hooks/claude/act-claude-statusline.js` (VERSION 1.0.0)
- Recommendation: reference
- Why it belongs here: A position-awareness precedent: the statusline renders context usage (with color thresholds and a skull past the red line), model, directory basename, and git branch with a dirty marker — `hooks.json` describes it as "context | model | directory | branch | task". It keeps position ambiently visible to the human the whole session, which is the human-facing complement to `workflow-tracker.md`. Reference the idea (surface current phase and tracker position in a statusline where the harness supports one); the implementation is harness-specific.
- Confidence: medium

### ACT / Dart auto-format

- Belongs in: workflow-management (listed for disposition only; belongs to creating-solution)
- Source: `TEMP-sources/act/hooks/claude/act-claude-dart-format.js` via `TEMP-sources/act/hooks/hooks.json` (VERSION 1.0.0)
- Recommendation: reference
- Why it belongs here: It does not. It is a PostToolUse Edit/Write hook that formats Dart files — an implementation-quality guardrail. Recorded here only so the disposition is explicit: this hook belongs to creating-solution (or a domain companion pack), not to the cross-phase layer.
- Confidence: high

### VGV Wingspan / recommend-plugins.sh

- Belongs in: workflow-management (reference only)
- Source: `TEMP-sources/vgv-wingspan/hooks/recommend-plugins.sh` + `hooks.json` (commit `7691c77`)
- Recommendation: reference
- Why it belongs here: A PreToolUse hook on `Read|Glob|Grep` that detects project type from declarative JSON rules in `hooks/recommendations/`, checks installed-plugin settings, and injects install suggestions as `additionalContext` — at most once per project per session via a `/tmp` marker hashed on `$PWD`, and only writing the marker when something was actually emitted so later-added rules can still fire. Judged relevant as a mechanics reference, not for its purpose: the fire-once marker discipline and data-driven detection rules are a good pattern for environment-aware nudges (e.g., "this repo has no `workflow-tracker.md`; run setup"). The plugin-marketing purpose itself is not ours.
- Confidence: medium

### VGV AI Flutter Plugin / warn-missing-mcp.sh

- Belongs in: workflow-management (reference only)
- Source: `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/warn-missing-mcp.sh` (commit `d513aac`, 2026-07-02)
- Recommendation: reference
- Why it belongs here: A SessionStart environment check: verifies Very Good CLI is installed and at minimum version, emits a warning into the agent's context if not, and always exits 0 (non-blocking). Judged useful as the minimal-session-start-precondition pattern: Structured Workflow's continuity hook should make the same kind of non-blocking check for its own preconditions (working files present, tracker readable) and inject a plain warning rather than failing the session. The CLI-specific check itself belongs to domain packs.
- Confidence: medium

## Subagents (custom droids)

Judgment lens: workflow-management owns subagent-dispatch conventions (prompt contracts, isolation, status vocabulary, read-only enforcement); the agents that do phase work belong to their phases. Notably, none of the staged systems ships a cross-phase support agent — the dispatch conventions live in skills (Superpowers `dispatching-parallel-agents`, adapted above, and `subagent-driven-development`, referenced above), while every shipped agent definition is a phase role. Matt Pocock skills and Superpowers ship no agent definitions at all (`mattpocock-skills` plugin.json lists skills only; Superpowers' subagent skills are skills about subagent use).

| Source Pack | Agent | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| ACT | act-codebase-researcher | `TEMP-sources/act/agents/act/codebase-researcher.md` (VERSION 1.0.0) | reference | medium |
| ACT | act-flutter-docs-researcher, act-flutter-patterns-researcher | `TEMP-sources/act/agents/act/flutter-docs-researcher.md`, `flutter-patterns-researcher.md` (VERSION 1.0.0) | reference | medium |
| VGV Wingspan | analysis agents (plan-splitting, user-flow-analysis) | `TEMP-sources/vgv-wingspan/agents/analysis/` (commit `7691c77`) | reference | medium |
| VGV Wingspan | research agents (best-practices, official-docs) | `TEMP-sources/vgv-wingspan/agents/research/` (commit `7691c77`) | reference | medium |
| VGV Wingspan | review agents (codebase-review x3, quality-review x3) | `TEMP-sources/vgv-wingspan/agents/codebase-review/`, `agents/quality-review/` (commit `7691c77`) | reference | medium |
| VGV AI Flutter Plugin | flutter-reviewer | `TEMP-sources/vgv-ai-flutter-plugin/agents/flutter-reviewer.md` (commit `d513aac`) | reference | medium |
| Codex Product Design | openai.yaml | `TEMP-sources/product-design-0.1.47/agents/openai.yaml` (0.1.47) | omit | high |

### ACT / act-codebase-researcher

- Belongs in: workflow-management (reference only; primary home inquiry-analysis)
- Source: `TEMP-sources/act/agents/act/codebase-researcher.md` (VERSION 1.0.0)
- Recommendation: reference
- Why it belongs here: The role — inspect a project's structure, patterns, and conventions and report — is inquiry-analysis research work. What this bucket references is the definition shape as a dispatch convention: explicit `mode: subagent`, an allowlist/denylist permission block (read/glob/grep allow; edit/bash/webfetch/websearch deny), a fixed structured output format, and guardrails like "Don't invent: only report what you actually find" and "return findings, not raw file contents". That is a model for how our companion agents should be declared and constrained.
- Confidence: medium

### ACT / act-flutter-docs-researcher and act-flutter-patterns-researcher

- Belongs in: workflow-management (reference only; primary homes inquiry-analysis / domain packs)
- Source: `TEMP-sources/act/agents/act/flutter-docs-researcher.md`, `TEMP-sources/act/agents/act/flutter-patterns-researcher.md` (VERSION 1.0.0)
- Recommendation: reference
- Why it belongs here: Both are phase/domain research roles (SDK-and-package documentation research with a mandatory deprecation check; pattern lookup against ACT's own knowledge base). Kept here only as further evidence of the same dispatch conventions as the codebase researcher — tiered permissions per role (the docs researcher gets web access, the patterns researcher does not) and structured report contracts. Nothing cross-phase to adapt.
- Confidence: medium

### VGV Wingspan / analysis agents

- Belongs in: workflow-management (reference only; owned by developing-ideas / creating-solution / evaluating)
- Source: `TEMP-sources/vgv-wingspan/agents/analysis/plan-splitting-agent.md`, `user-flow-analysis-agent.md` (commit `7691c77`)
- Recommendation: reference
- Why it belongs here: Phase work. `plan-splitting-agent` assesses plan scope against multi-signal thresholds and proposes independently-mergeable PR boundaries ("Never force a bad split") — that is plan-shaping for creating-solution's slicing step. `user-flow-analysis-agent` maps flows, permutations, and spec gaps with prioritized clarifying questions — inquiry/evaluating material. This bucket takes only their definition conventions: `<examples>` blocks with commentary inside the description (invocation triggers), explicit per-agent `model`/`effort` selection, and "return your assessment directly to the caller; do not write to a file".
- Confidence: medium

### VGV Wingspan / research agents

- Belongs in: workflow-management (reference only; primary home inquiry-analysis)
- Source: `TEMP-sources/vgv-wingspan/agents/research/best-practices-research-agent.md`, `official-docs-research-agent.md` (commit `7691c77`)
- Recommendation: reference
- Why it belongs here: Research roles owned by inquiry-analysis. Their source-priority ladders (project conventions first, then curated skills, then official docs, then community), mandatory deprecation checks, and source-attribution requirements ("Official documentation recommends..." vs "Many successful projects tend to...") align with our confidence-over-fluent-certainty principle and are worth citing when we write our own researcher roles — but the work is phase work.
- Confidence: medium

### VGV Wingspan / review agents

- Belongs in: workflow-management (reference only; primary home evaluating)
- Source: `TEMP-sources/vgv-wingspan/agents/codebase-review/` (codebase-review, code-simplicity-review, vgv-review) and `agents/quality-review/` (architecture-review, pr-readiness-review, test-quality-review) (commit `7691c77`)
- Recommendation: reference
- Why it belongs here: All six are focused reviewers — architecture, tests, simplicity/YAGNI, PR mechanical readiness, general standards — which is Evaluating's parallel-reviewer roster, not cross-phase support. Noted for this bucket: they demonstrate role-scoped model tiers (haiku for mechanical PR-readiness, sonnet for judgment reviews, `inherit` where session context matters) and preloaded skills via frontmatter (`skills: [elements-of-style]`), both conventions our dispatch layer should standardize.
- Confidence: medium

### VGV AI Flutter Plugin / flutter-reviewer

- Belongs in: workflow-management (reference only; primary home evaluating / domain packs)
- Source: `TEMP-sources/vgv-ai-flutter-plugin/agents/flutter-reviewer.md` (commit `d513aac`)
- Recommendation: reference
- Why it belongs here: A domain reviewer, but its enforcement mechanics are the best staged example of a hard read-only dispatch contract: no Edit/Write tools, four standards skills preloaded at startup, and — the notable part — an agent-scoped PreToolUse hook in its own frontmatter (`allow-readonly-git.sh`) restricting Bash to `git diff`/`git status`, with the contract stated in-body ("Do not attempt to work around this; it is intentional") and fixes reported in a table rather than applied. That hook-enforced role boundary is a dispatch-safety convention workflow-management should carry into our reviewer and researcher roles.
- Confidence: medium

### Codex Product Design / openai.yaml

- Belongs in: workflow-management (nothing to take)
- Source: `TEMP-sources/product-design-0.1.47/agents/openai.yaml` (0.1.47)
- Recommendation: omit
- Why it belongs here: Inspected as directed; it defines no agent roles. It is a four-line interface manifest — display name, short description, and a default prompt for the plugin surface. No dispatch, permission, or role content exists to adopt.
- Confidence: high

## Rename and Removal Ledger

Every old-audit entry from the six re-verified systems whose location, status, or disposition changed. Old citations pointed at `~/.agents/skills/...`, `~/.agentic-coding-toolkit/...`, `~/.codex/...`, or GitHub URLs; all are superseded by the `TEMP-sources/` pins above.

| Old-audit entry | Fresh disposition | This bucket's action |
| --- | --- | --- |
| Matt `handoff` (`~/.agents/skills/handoff`) | Moved to `skills/productivity/handoff/`; content stable. New sibling `in-progress/claude-handoff` launches a background agent from the handoff summary. | Adapt retained; claude-handoff added as reference. |
| Matt `setup-matt-pocock-skills` | Moved to `skills/engineering/`; expanded (GitLab support, PRs-as-request-surface question, `docs/agents/*.md` seed templates, one-decision-at-a-time flow). | Adapt retained on fresh content. |
| Matt `to-issues` | Moved to `skills/engineering/to-issues/`. Placement rule locked: creating-solution owns the slicing act. | Downgraded adapt → reference (export/tracker mechanics only). |
| Matt `to-prd` | Moved to `skills/engineering/to-prd/`. Primary home developing-ideas. | Reference retained, ownership named. |
| Matt `triage` | Moved to `skills/engineering/triage/`; expanded (PRs as triage surface, AGENT-BRIEF.md and OUT-OF-SCOPE.md reference docs, verify-the-claim step, AI-disclaimer rule). | Adapt retained on fresh content. |
| Matt `ubiquitous-language` | DEPRECATED (`skills/deprecated/ubiquitous-language/`). Its glossary mechanics are absorbed by `skills/engineering/domain-modeling/` (glossary-only CONTEXT.md, challenge/sharpen terms, inline updates, sparing ADRs); the table/dialogue/ambiguities output format was not carried over. | Adapt moved to domain-modeling (new entry); deprecated skill kept as format reference for GLOSSARY.md. |
| Matt `grill-with-docs` | Moved to `skills/engineering/`; now a one-line composition of `/grilling` + `/domain-modeling`. | Downgraded reference → thin reference; substance lives in domain-modeling. |
| Matt new candidates | `wayfinder`, `loop-me`, `grilling`, `writing-great-skills`, `teach` read in full. | wayfinder adapt (new entry); writing-great-skills reference (new entry); loop-me, grilling, teach judged not workflow-management (grilling → inquiry-analysis). |
| ACT `act-workflow-work` | Still shipped but frontmatter marks it "Deprecated legacy workflow skill. Prefer act-implement." CHANGELOG 1.0.0 deprecates all `/act-workflow-*` skills in favor of the new Interview → Create Spec → Refine Spec → Create Work Items → Implement flow. | Downgraded adapt → reference (plan-truthfulness contract only); successor `act-implement` is creating-solution's to audit. |
| ACT `act-workflow-compound` | Still present and current in 1.0.0. | Adapt retained on fresh content. |
| ACT `act-meta-audit-work` | REMOVED. CHANGELOG 1.0.0: "Removed the obsolete act-meta-audit-work skill from the toolkit." No successor skill exists in `act/skills/`. | Entry dropped. Its audit-a-prior-run role is partially covered by the ACT session logs (hooks, adapted above) as raw evidence; no skill to cite. |
| ACT `act-git-worktree` | Still present; 0.5.0 added symlinking of gitignored agent files into new worktrees. | Reference retained on fresh content. |
| ACT (new) `act-config` | New in 1.0.0: project configuration surface (`.act/config.yaml`, `.act/workflow.md`, AGENTS.md/CLAUDE.md guidance). | Added as adapt. |
| ACT (context note) | The 1.0.0 interview workflow "captures stable, project-specific terminology inside GLOSSARY.md" (CHANGELOG) — independent convergence on our always-on GLOSSARY.md. The interview skills themselves are inquiry-analysis's to audit. | No entry here; noted for glossary synthesis. |
| Superpowers `using-superpowers` | v6 revision re-read: adds `<SUBAGENT-STOP>` exemption, platform-adaptation reference files, explicit instruction-priority order. | Adapt retained on fresh content. |
| Superpowers `dispatching-parallel-agents` | Re-read at v6.1.1; content consistent with old summary. | Adapt retained. |
| Superpowers `subagent-driven-development` | v6 revision is substantially richer (durable progress ledger, file handoffs, model selection, status vocabulary) and squarely a plan-execution skill. | Downgraded adapt → reference; creating-solution owns execution, this bucket takes ledger/file-handoff/status mechanics. |
| Superpowers `verification-before-completion` | Re-read at v6.1.1; unchanged in spirit. Ownership resolved to the Evaluating engine. | Downgraded adapt → reference (please-verify flag on evaluating's claim). |
| Superpowers `using-git-worktrees` | v6 adds detect-first, native-tool preference, submodule guard, consent gate. | Reference retained. |
| Superpowers (new) `writing-skills` | New to the audit surface in v6. | Added as reference (build-time methodology). |
| Superpowers hooks | Newly cataloged this pass: `hooks/session-start` + `hooks.json` (matcher `startup|clear|compact`) + `hooks-cursor.json`. | Added as adapt — primary model for our continuity hooks. |
| VGV Wingspan `create-branch` | REMOVED at commit `7691c77` (with `create-commit`; new skills `create`, `rebase`, `elements-of-style` appeared). Branch-safety behavior now appears inline in other skills (e.g., debrief step 5 offers a feature branch before writing). | Entry dropped. Branch/worktree policy is covered by the two worktree references. |
| VGV Wingspan `refine-approach` | Re-read fresh: document review + scoring + clear-context handoff. | Downgraded adapt → reference; evaluating owns the review, this bucket takes the clear-context handoff mechanic. |
| VGV Wingspan `debrief` | Re-read fresh: blameless incident analysis with `docs/debriefs/` persistence and display-only issue previews. | Downgraded adapt → reference; evaluating owns the analysis. |
| Codex Product Design `user-context`, `get-context` | 0.1.47 unchanged (same cached version; not re-fetched). | user-context adapt retained; get-context reference retained with ownership named (inquiry-analysis). |

## Not Re-Verified This Pass (long tail)

The following entries are preserved from the previous audit pass. Their sources were not re-staged under `TEMP-sources/` and their citations were NOT re-verified on 2026-07-03. For the Factory/Droid borrowed entries: the local copies under `r-and-d/borrowed-factory-skills` were deleted on 2026-07-03; entries are retained by name only.

### Cursor Team Kit / workflow-from-chats

- Belongs in: workflow-management
- Source: https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/workflow-from-chats
- Recommendation: adapt
- Why it belongs here: It extracts durable working preferences from recent chats and converts them into skills, rules, or workflow docs. Structured Workflow needs this as a controlled way to promote repeated human preferences into project templates or agent instructions without bloating phase docs.
- Confidence: high

### Cursor Team Kit / make-pr-easy-to-review

- Belongs in: workflow-management
- Source: https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/make-pr-easy-to-review
- Recommendation: reference
- Why it belongs here: It improves handoff reviewability without changing behavior by clarifying PR descriptions, reviewer guidance, generated files, risks, and important paths. That can inform Structured Workflow's final handoff/release summary mechanics.
- Confidence: medium
- Please verify: PR reviewability may belong to Creating-Solution or Evaluating if workflow-management stays limited to state continuity.

### Factory/Droid borrowed / session-navigation

- Belongs in: workflow-management
- Source: local copy deleted 2026-07-03 (was `r-and-d/borrowed-factory-skills/builtin/session-navigation/SKILL.md`); entry retained by name only
- Recommendation: adapt
- Why it belongs here: It is explicitly a context-recovery system: list, search, resume, and inspect prior sessions by project/date/content. Structured Workflow needs the same capability, likely pointed at durable phase docs and tracker state rather than proprietary Droid session stores.
- Confidence: high

### Factory/Droid borrowed / init

- Belongs in: workflow-management
- Source: local copy deleted 2026-07-03 (was `r-and-d/borrowed-factory-skills/builtin/init/SKILL.md`); entry retained by name only
- Recommendation: adapt
- Why it belongs here: It creates repo-level agent/contributor guidelines. Structured Workflow needs project initialization templates for the workflow activation contract, fixed working files, and allowed side effects.
- Confidence: medium
- Please verify: Adapt as a project-template initializer, not as a generic AGENTS.md generator.

### Factory/Droid borrowed / incident-guidelines

- Belongs in: workflow-management
- Source: local copy deleted 2026-07-03 (was `r-and-d/borrowed-factory-skills/builtin/incident-guidelines/SKILL.md`); entry retained by name only
- Recommendation: reference
- Why it belongs here: It stores learned alert mappings, required tools, auth methods, repos, and gotchas for recurring RCA. The reusable idea is a memory pattern for operational project templates and recurring context, not the incident-specific table.
- Confidence: medium
- Please verify: Include only as a pattern for project templates or domain-specific standing criteria.

### Factory/Droid borrowed / wiki

- Belongs in: workflow-management
- Source: local copy deleted 2026-07-03 (was `r-and-d/borrowed-factory-skills/builtin/wiki/SKILL.md`); entry retained by name only
- Recommendation: reference
- Why it belongs here: It generates interconnected repository documentation and supports incremental refresh from a base wiki. Structured Workflow can borrow the "rebuild only affected context" idea for project context recovery, but the wiki generator itself is broader than this bucket.
- Confidence: medium
- Please verify: Keep generated repo docs separate from the small fixed working set.

### Bug Hunter / bug-hunter

- Belongs in: workflow-management
- Source: https://github.com/codexstar69/bug-hunter/blob/main/SKILL.md
- Recommendation: reference
- Why it belongs here: The security pipeline is domain-specific, but its checkpointed verification, resume state for large codebases, staged artifacts, and independent challenge/referee roles are strong patterns for trustworthy cross-phase evaluation and recovery.
- Confidence: medium
- Please verify: Do not import bug/security scanning as workflow-management; only borrow checkpoint/resume and adversarial-verdict mechanics.

### planning-with-files / planning-with-files

- Belongs in: workflow-management
- Source: https://github.com/OthmanAdi/planning-with-files/tree/main/skills/planning-with-files
- Recommendation: adapt
- Why it belongs here: It is one of the README's named influences. It provides file-based planning, progress tracking, findings capture, automatic session recovery, active-plan hooks, and plan-data injection safeguards. Structured Workflow should adapt the recovery and hook mechanics into its smaller fixed set rather than copy `task_plan.md`, `findings.md`, and `progress.md` directly.
- Confidence: high

### Cline Memory Bank / Memory Bank

- Belongs in: workflow-management
- Source: https://docs.cline.bot/best-practices/memory-bank
- Recommendation: adapt
- Why it belongs here: It is the other named influence in the README. It treats markdown files as persistent memory across sessions, including active context, progress, system patterns, and context-window recovery. Structured Workflow should adapt the durable-memory principle while preserving its own bounded files: phase docs, `GLOSSARY.md`, `workflow-tracker.md`, and project templates.
- Confidence: high

### vgv-pr-roundtrip / vgv-pr-roundtrip

- Belongs in: workflow-management
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/cleanup-2026-06-04/saved/vgv-pr-roundtrip/SKILL.md
- Recommendation: adapt
- Why it belongs here: It is a completion loop, not a one-pass coding task: build a slice, run repeated reviews, open PR, poll feedback, address comments, reconcile docs/LEARNINGS, and stop only when merge-ready. This maps to Structured Workflow's tracker reconciliation, handoff, confidence, and "do not silently skip checks" mechanics.
- Confidence: high

### Linear curated / linear

- Belongs in: workflow-management
- Source: /Users/jholt/.codex/plugins/cache/openai-curated/linear/e2d08a2e/skills/linear/SKILL.md
- Recommendation: reference
- Why it belongs here: The core README names the issue tracker as the task workspace. The Linear skill provides practical issue/project/team workflow operations, read-before-write behavior, batching, and result summaries that can inform a tracker adapter without making Structured Workflow depend on Linear.
- Confidence: high
