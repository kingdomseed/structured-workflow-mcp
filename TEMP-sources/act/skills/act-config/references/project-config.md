# Project Config

ACT project config stores Workflow Storage settings for new Specs in the current working directory.

ACT workflow semantics live in `.act/workflow.md`. Agent guidance in `AGENTS.md` or `CLAUDE.md` points agents to `.act/config.yaml` and `.act/workflow.md`.

Config path, relative to the current working directory:

```text
.act/config.yaml
```

## Schema

Local storage:

```yaml
workflow:
  backend: local

local:
  path: ai_specs
```

GitHub storage:

```yaml
workflow:
  backend: github
```

Supported `workflow.backend` values:

- `local`
- `github`

When `workflow.backend` is `local`, `local.path` is required.

When `workflow.backend` is `github`, infer the repository from git remotes and do not store it in config.

## Local Path Rules

`local.path` is current-working-directory-relative.

Reject:

- Empty paths
- Absolute paths
- Paths containing `..`
- `.act` or paths under `.act`
- `.git` or paths under `.git`
- Existing non-directory files

The path may point to an existing directory or a directory that does not exist yet.

Normalize by stripping a leading `./` and removing trailing slashes. Preserve other spelling.

## Writing Rules

`.act/config.yaml` is ACT-owned.

The update script writes a fresh canonical file. It does not preserve unknown blocks or comments.

For GitHub config, it writes no `local:` block.

For local config, it writes `workflow.backend` and `local.path`.

## Workflow Semantics

Generated `.act/workflow.md` content is maintained in `references/workflow-template.md`.

Write `.act/workflow.md` from that template every time so existing repos receive the current ACT workflow semantics after ACT updates.

## Agent Guidance

Agent guidance is maintained by `scripts/update-workflow-docs.js`.

The script writes the canonical ACT Workflow block to `AGENTS.md` or `CLAUDE.md`. Use `--agent-file AGENTS.md|CLAUDE.md` when no guidance file exists or when a specific target is required.

Do not duplicate the generated block here; update the script if the block or replacement behavior changes.
