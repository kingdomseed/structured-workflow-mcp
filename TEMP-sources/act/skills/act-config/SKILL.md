---
name: act-config
description: Configure ACT workflow storage and semantics for the current working directory. Use when setting up, repairing, or reporting ACT workflow files.
argument-hint: ""
tools: [Bash, AskUserQuestion, Read]
---

Configure ACT workflow storage and workflow semantics for Specs and derived Work Items.

Store local workflow files relative to the current working directory. Do not resolve storage from the git repository root, do not search parent directories for `.act/config.yaml`, and do not `cd` before running ACT config scripts.

## Files

Config path: `.act/config.yaml` in the current working directory.
Workflow semantics path: `.act/workflow.md` in the current working directory.
Agent guidance path: prefer existing `AGENTS.md`, then existing `CLAUDE.md`. If neither exists, ask which one to create.

Read [project-config.md](./references/project-config.md) for the schema and validation rules.

## Workflow

1. Run the validator: `node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-config/scripts/update-config.js --check`.

2. If config is valid, keep it. Do not ask whether to change it.

3. If config is missing or invalid, select Workflow Storage. Inspect `origin` first with `git remote get-url origin`.

Recommend GitHub when `origin` points to GitHub; otherwise recommend local markdown. Prompt, with `(Recommended)` on the recommended option:

```md
Where should ACT create new Specs for this directory?

Default for this directory: <GitHub|Local markdown>, because <reason>.

Options:
- GitHub: Create new Specs as GitHub Issues for this repository.
- Local markdown: Save new Specs as markdown files under a local path.
```

4. If the user selects GitHub, validate that any configured remote points to GitHub with `git remote -v`.

Accept HTTPS and SSH GitHub remotes. If none exists, do not write config. Ask the user to add a GitHub remote or choose local markdown. Do not check whether `gh` is installed or authenticated.

5. If the user selects local markdown, ask for the local path when missing or invalid:

```md
Where should ACT save local Specs?

Options:
- `ai_specs` (Recommended): Save Specs under `./ai_specs`.
- Custom path: Enter another current-working-directory-relative path.
```

Ask and stop until the user replies.

6. Write config with `skills/act-config/scripts/update-config.js`:

```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-config/scripts/update-config.js --backend local --local-path ai_specs
```

or:

```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-config/scripts/update-config.js --backend github
```

Expected stdout: `Wrote .act/config.yaml`.

If `skills/act-config/scripts/update-config.js` rejects the local path, ask again with the same path prompt. Do not hand-write `.act/config.yaml`.

7. Ensure workflow semantics and agent guidance after config is valid or written.

If neither `CLAUDE.md` nor `AGENTS.md` exists, ask which one to create: `AGENTS.md` or `CLAUDE.md`.

Run `node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-config/scripts/update-workflow-docs.js`.

If the script reports `NO_AGENT_FILE`, ask the guidance-file question, then run:

```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-config/scripts/update-workflow-docs.js --agent-file <AGENTS.md|CLAUDE.md>
```

## Completion Report

After config, workflow semantics, and agent guidance are ensured, read `.act/config.yaml` and report current settings:

```md
ACT config complete.

Config: `.act/config.yaml`
Workflow semantics: `.act/workflow.md`
Agent guidance: `<AGENTS.md or CLAUDE.md>`

Configured settings:
- `workflow.backend`: `<local|github>`
- `local.path`: `<path>` when backend is `local`
```

Then stop. Do not invoke another workflow automatically.
