# Glossary Format

Use this shape when creating a new `GLOSSARY.md`. When editing an existing glossary document, preserve its structure instead of migrating it.

```md
# [Title]

[One or two sentences describing what this context covers.]

## Terminology

**[Term]**:
[A one or two sentence definition of the term in this project.]
_Avoid_: Confused term, overloaded use
```

## Rules

- Keep definitions tight: define what the term is, not what it does.
- Include only project-specific terms.
- List avoided wording only when it prevents real confusion.
- Group terms under subheadings only when natural clusters emerge.

## Writing Style

Good:

```md
**Spec-ready**:
The interview state where framing, blocking ambiguities, and direction-setting choices are resolved enough for `act-create-spec` to produce a useful Spec.
_Avoid_: done, ready, finalized
```

Too implementation-heavy:

```md
**Spec-ready**:
The state after the agent has called Grep, parsed the files, shown three options, and prepared the prompt payload for the next command.
```
