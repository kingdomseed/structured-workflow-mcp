# TEMP-sources Inventory

Staged 2026-07-03 for the fresh-source skill bucket synthesis. Every audit
citation MUST point at a path under `TEMP-sources/` and quote the pinned
version below. `r-and-d/` and `~/` paths are forbidden as evidence.

## Pinned versions

| System | Staged path | Pin |
| --- | --- | --- |
| Matt Pocock skills | `TEMP-sources/mattpocock-skills/` | commit `272f99b` (2026-07-03) |
| Superpowers | `TEMP-sources/superpowers/` | v6.1.1, commit `d884ae0` (2026-07-02) |
| VGV Wingspan | `TEMP-sources/vgv-wingspan/` | commit `7691c77` (2026-07-03) |
| VGV AI Flutter Plugin | `TEMP-sources/vgv-ai-flutter-plugin/` | commit `d513aac` (2026-07-02) |
| ACT | `TEMP-sources/act/` | VERSION 1.0.0 (repo updated 2026-07-03) |
| Codex Product Design | `TEMP-sources/product-design-0.1.47/` | 0.1.47 (only cached version; not re-fetched) |

## Matt Pocock skills (`mattpocock-skills/skills/`)

Reorganized into category folders. Skills:

- `engineering/`: ask-matt, code-review, codebase-design, diagnosing-bugs,
  domain-modeling, grill-with-docs, implement, improve-codebase-architecture,
  prototype, research, resolving-merge-conflicts, setup-matt-pocock-skills,
  tdd, to-issues, to-prd, triage
- `productivity/`: grill-me, grilling, handoff, teach, writing-great-skills
- `in-progress/`: claude-handoff, loop-me, wayfinder, wizard, writing-beats,
  writing-fragments, writing-shape
- `deprecated/`: design-an-interface, qa, request-refactor-plan,
  ubiquitous-language
- `misc/`, `personal/`: out of scope for buckets (tool setup, personal vault)

Hooks: none shipped. Subagents: none shipped (plugin.json lists skills only).

### Rename/removal map vs old audits

Old audits cited `~/.agents/skills/<name>` — ALL those local paths are gone.

| Old audit citation | Fresh disposition |
| --- | --- |
| grill-me | `skills/productivity/grill-me/` (moved) |
| grill-with-docs | `skills/engineering/grill-with-docs/` (moved) |
| ubiquitous-language | `skills/deprecated/ubiquitous-language/` (DEPRECATED) |
| zoom-out | REMOVED (no successor dir; check codebase-design/domain-modeling for absorbed behavior) |
| design-an-interface | `skills/deprecated/design-an-interface/` (DEPRECATED; likely absorbed into codebase-design) |
| prototype | `skills/engineering/prototype/` (moved) |
| to-prd | `skills/engineering/to-prd/` (moved) |
| to-issues | `skills/engineering/to-issues/` (moved) |
| tdd | `skills/engineering/tdd/` (moved) |
| diagnose | `skills/engineering/diagnosing-bugs/` (RENAMED; verify content) |
| triage | `skills/engineering/triage/` (moved) |
| review | `skills/engineering/code-review/` (RENAMED from in-progress/review; verify content) |
| handoff | `skills/productivity/handoff/` (moved) |
| improve-codebase-architecture | `skills/engineering/improve-codebase-architecture/` (moved) |
| setup-matt-pocock-skills | `skills/engineering/setup-matt-pocock-skills/` (moved) |
| (new, uncited) | code-review, codebase-design, domain-modeling, implement, research, grilling, wayfinder, loop-me, writing-great-skills |

## Superpowers (`superpowers/`) — v6.1.1

Skills (`skills/`): brainstorming, dispatching-parallel-agents,
executing-plans, finishing-a-development-branch, receiving-code-review,
requesting-code-review, subagent-driven-development, systematic-debugging,
test-driven-development, using-git-worktrees, using-superpowers,
verification-before-completion, writing-plans, writing-skills

Note vs old audits: `writing-skills` is new to the audit surface; verify each
previously cited skill's content, v6 was a major revision.

Hooks (`hooks/`): hooks.json, hooks-cursor.json, run-hook.cmd, session-start
(SessionStart bootstrap that injects using-superpowers).

Subagents: none shipped as agent definitions; `dispatching-parallel-agents`
and `subagent-driven-development` are skills ABOUT subagent use.

## VGV Wingspan (`vgv-wingspan/`)

Skills (`skills/`): brainstorm, build, create, create-pr, debrief,
elements-of-style, hotfix, plan, plan-technical-review, rebase,
refine-approach, review, shared (support dir)

Removals vs old audits: `create-branch` and `create-commit` REMOVED
(commit 7691c77, 2026-07-03). New: `create`, `rebase`, `elements-of-style`.

Hooks (`hooks/`): hooks.json (PreToolUse on Read|Glob|Grep ->
recommend-plugins.sh), recommendations/.

Subagents (`agents/`):
- analysis/: plan-splitting-agent, user-flow-analysis-agent
- codebase-review/: code-simplicity-review-agent, codebase-review-agent,
  vgv-review-agent
- quality-review/: architecture-review-agent, pr-readiness-review-agent,
  test-quality-review-agent
- research/: best-practices-research-agent, official-docs-research-agent

## VGV AI Flutter Plugin (`vgv-ai-flutter-plugin/`)

Skills (`skills/`): accessibility, animations, bloc, create-project,
dart-flutter-sdk-upgrade, green-gate, internationalization,
layered-architecture, license-compliance, material-theming, navigation,
static-security, testing, ui-package, very-good-analysis-upgrade

New vs old audits: animations, dart-flutter-sdk-upgrade, green-gate,
internationalization, very-good-analysis-upgrade.

Hooks (`hooks/`): hooks.json + scripts/ (warn-missing-mcp, format, analyze,
block-cli-workarounds, allow-readonly-git, check-vgv-cli).

Subagents (`agents/`): flutter-reviewer.md (read-only reviewer, added
2026-07-02).

## ACT (`act/`) — VERSION 1.0.0, updated 2026-07-03

Skills (`skills/`): act-config, act-create-issues, act-create-issues-flutter,
act-create-spec, act-create-spec-flutter, act-dart-create,
act-dart-migrate-dot-shorthand, act-dart-migrate-primary-constructors,
act-download-flutter-rules, act-figma-to-flutter, act-flutter-create,
act-flutter-development, act-flutter-drift-setup, act-flutter-driver-mcp,
act-flutter-pub-upgrade-major, act-flutter-robot-testing,
act-flutter-screenshot, act-flutter-sentry-init, act-flutter-tdd,
act-git-commit, act-git-commit-all, act-git-push-make-pr,
act-git-switch-main-pull, act-git-worktree, act-implement,
act-implement-flutter, act-install-official-dart-flutter-skills,
act-interview, act-interview-flutter, act-refine-spec,
act-refine-spec-flutter, act-workflow-compound, act-workflow-plan,
act-workflow-refine-spec, act-workflow-spec, act-workflow-work

Rename/addition map vs old audits (verify against `act/CHANGELOG.md`):

| Old audit citation | Fresh disposition |
| --- | --- |
| act-workflow-spec | still present; NEW `act-create-spec` (+`-flutter`) is the successor surface — compare both |
| act-workflow-refine-spec | still present; NEW `act-refine-spec` (+`-flutter`) |
| act-workflow-plan | still present |
| act-workflow-work | still present; NEW `act-implement` (+`-flutter`) |
| act-meta-audit-work | REMOVED (not in skills/; check CHANGELOG for successor) |
| (new) | act-interview (+`-flutter`), act-create-issues (+`-flutter`), act-config |

Hooks (`hooks/`): core/ (act-dart-formatter, act-logger, act-settings),
claude/ (dart-format, log-session, statusline), codex/, opencode/, hooks.json
(SessionStart/UserPromptSubmit/PreToolUse logging, statusline, Dart format).

Subagents (`agents/act/`): codebase-researcher, flutter-docs-researcher,
flutter-patterns-researcher.

Commands (`commands/`): act-help, act-submit-feedback, act-update-changelog,
act-update (harness commands, not skills).

## Codex Product Design (`product-design-0.1.47/`)

Skills (`skills/`): audit, design-qa, get-context, ideate, image-to-code,
index, prototype, research, share, url-to-code, user-context. Unchanged vs
old audits.

Hooks: none. Subagents (`agents/`): openai.yaml (inspect for agent roles).
