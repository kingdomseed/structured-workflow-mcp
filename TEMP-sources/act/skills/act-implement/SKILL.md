---
name: act-implement
description: Implement a Work Item or Spec. Use when the user asks to build, complete, or execute approved workflow work.
argument-hint: "[Work Item or Spec] [--do-not-commit]"
tools: [Read, Write, Edit, Glob, Grep, Bash, AskUserQuestion, Skill]
---

Implement the given Work Item or Spec.

Stop if blockers or blocking decisions are unresolved.

Use TDD at agreed seams when feasible.

Run static analysis and focused tests during work.

Run the full suite once before finishing.

Mark all acceptance criteria as completed if stored locally.

Unless `--do-not-commit` is passed, commit only intended files.
