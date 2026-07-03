# Glossary Documents

Use glossary documents to keep stable project language close to the code. Do not use them as notes, Specs, implementation plans, or configuration.

## Select The File

Use `GLOSSARY.md` in the command working directory. Do not search parent directories.

Never create glossary files in the skill or agent configuration directory.

If `GLOSSARY.md` is missing, select it as the creation target.

If the selected `GLOSSARY.md` is missing, create it only when the first resolved project-specific term needs to be captured.

## Edit Boundaries

Do not split, migrate, or reorganize existing glossary files.

Do not add frontmatter.

Preserve the existing structure when a glossary document already has one. Add the smallest compatible inline update.

Good glossary updates capture:

- A canonical term the team should reuse.
- A short definition of what that term means in this project.
- Avoided wording that prevents recurring terminology confusion.

Bad glossary updates capture:

- Requirements, output rules, error behavior, or scope boundaries.
- Implementation decisions, testing decisions, or configuration.
- One-off interview answers or resolved Q/A.
- A scratch note from the current conversation.
- A one-off UI label that may change during design.
- A task list or phase breakdown.

## Conflict Checks

Before asking a language question, compare the user's wording against the selected glossary document.

When glossary and user language conflict, ask immediately:

```text
Your glossary says X, but you seem to mean Y. Which meaning should this Spec use?
```

When code and user assumptions conflict, ask immediately:

```text
The code allows X, but your plan assumes Y. Should the Spec follow the code or change it?
```
