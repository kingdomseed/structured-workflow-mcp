---
name: act-workflow-work
description: Deprecated legacy workflow skill. Prefer act-implement.
argument-hint: "[plan file] [lite|official|full] [--single-phase] [--do-not-commit] [--create-pr]"
tools: [Read, Write, Glob, Grep, Task, AskUserQuestion, Skill, Bash]
---

# Work Plan Execution Skill

Execute an implementation plan systematically, phase by phase, while keeping the plan file truthful.

## Usage

`/act-workflow-work <plan-file> [type] [--single-phase] [--do-not-commit] [--create-pr]`

## Arguments

**plan-file** (required): path to the plan file to execute

**type** (optional, defaults to `lite`): knowledge level to load before execution

- `official` - load official Flutter rules when working on a Flutter project; for Dart CLI projects, use the closest supported lightweight guidance
- `lite` - load essential patterns, principles, and breaking changes
- `full` - load broader setup and implementation guidance

`--single-phase` (optional): execute exactly the first incomplete phase, reconcile the plan, validate the phase, then stop. If all phases are already complete, skip to final validation and optional shipping.

`--do-not-commit` (optional): do not run `git add`, `git commit`, `git push`, or `gh pr create` anywhere in this workflow. This does not forbid writing plan updates to disk.

`--create-pr` (optional): after all phases are complete and final validation passes, push the branch and create a pull request. This flag is mutually exclusive with `--do-not-commit`.

## Hard Contract

`work` is not complete until the plan file has been reconciled with the work performed in this run.

Do not report a task or phase complete unless the corresponding checklist lines were updated in the plan file.

If `--do-not-commit` is set, do not run `git add`, `git commit`, `git push`, or `gh pr create` at any point, but still write plan updates to disk.

If execution is delegated to a subagent, the top-level controller remains responsible for plan reconciliation, workflow invariants, and final success criteria.

## Hard Invariants

Before `work` reports success:

- every completed checklist item in scope is marked `[x]` in the plan file
- every blocked item in scope is still unchecked
- every blocked item in scope has a blocker note in the plan file
- the correct analysis command for the inferred project type passed
- the correct test command for the inferred project type passed
- `--single-phase` did not start work from the next phase
- if `--do-not-commit` is false, successful completed phase work from this run is not left uncommitted
- `--do-not-commit` runs performed no `git add`, `git commit`, `git push`, or `gh pr create`

If any invariant fails, the workflow must fail instead of silently reporting success.

## Input

Parse arguments from `#$ARGUMENTS`:

- first argument -> `plan_file`
- remaining arguments:
  - if `official`, `lite`, or `full` is present, use it as `type`; otherwise default to `lite`
  - if `--single-phase` is present, set `single_phase = true`; otherwise `false`
  - if `--do-not-commit` is present, set `do_not_commit = true`; otherwise `false`
  - if `--create-pr` is present, set `create_pr = true`; otherwise `false`

If `create_pr = true` and `do_not_commit = true`, stop immediately and ask the user to remove one of those flags.

## Internal Stages

Execute the workflow in this order:

1. `load`
2. `prepare`
3. `determine_scope`
4. `execute_phase`
5. `reconcile_plan`
6. `validate_phase`
7. `commit_phase`
8. `decide_continue`
9. `final_validate`
10. `ship`
11. `report`

Keep these stages explicit. Do not collapse them into a single mixed execution block.

## Stage 1: `load`

Purpose:

- read the entire plan file
- if the plan contains a **Spec** reference such as `**Spec**: \`path/to/spec.md\``, read that spec file too
- review phase structure, checklist items, and dependencies
- read any files, examples, or references needed to understand the first in-scope phase
- infer the project type once for the entire run

Project type inference:

- if an existing `pubspec.yaml` clearly uses Flutter, set `project_type = flutter`
- if an existing `pubspec.yaml` represents a non-Flutter Dart package, set `project_type = dart_cli`
- otherwise infer from the plan and spec:
  - Flutter indicators: widgets, UI, screens, Material, Cupertino, app flows, robot tests
  - Dart CLI indicators: CLI, console, command-line, terminal workflow, executable commands
- if still ambiguous, ask the user before continuing

Rules:

- do not edit the plan during `load`
- identify incomplete phases before execution starts
- if the plan is unclear or internally inconsistent, stop and ask the user

## Stage 2: `prepare`

Purpose:

- ensure the project exists
- load project knowledge needed for execution

Project setup:

1. Check whether `pubspec.yaml` already exists.
2. If no project exists yet:
   - if `project_type = flutter`, use:
     ```
     Skill: act-flutter-create
     Args: <project_name> [org_name]
     ```
   - if `project_type = dart_cli`, use:
     ```
     Skill: act-dart-create
     Args: <project_name>
     ```

Knowledge loading:

- if `project_type = flutter` or `project_type = dart_cli`, load knowledge based on `type`:
  ```
  Skill: act-flutter-development
  Action: prime-{type}
  ```
- for `dart_cli`, apply only the Dart-applicable guidance; do not treat Flutter-only official rules as required
- if the plan contains `TDD:` items, load:
  ```
  Skill: act-flutter-tdd
  ```
- if the plan contains robot journey test work or stable selector tasks, load:
  ```
  Skill: act-flutter-robot-testing
  ```

Rules:

- do not stop for a separate "knowledge loaded" confirmation
- remain autonomous unless the plan itself is unclear

## Stage 3: `determine_scope`

Determine the execution scope before implementation begins.

- if `single_phase = true`, select exactly the first incomplete phase
- otherwise, select all remaining incomplete phases in order

If `single_phase = true`, the contract is:

> Execute exactly one incomplete phase, then reconcile the plan, validate the phase, and stop.

If all phases are already complete, skip directly to `final_validate` and then `ship` if requested and allowed.

## Stage 4: `execute_phase`

For each phase in scope:

1. Read the files referenced by that phase.
2. Inspect existing patterns before adding or changing code.
3. Implement only the tasks in that phase.
4. Run relevant tests while working.
5. Record what was completed, blocked, tested, and changed.

Execution heuristics:

- prefer a thin end-to-end slice that proves the behavior before widening scope
- do not build broad horizontal layers in isolation when the behavior can be validated incrementally
- load and follow plan references, nearby examples, and existing project patterns rather than inventing fresh structure

For tasks prefixed with `TDD:`:

- follow one-test-at-a-time red-green-refactor cycles
- write exactly one failing test for the next behavior
- do not write implementation ahead of the failing test
- write the minimum code needed to pass that test
- refactor only while all tests remain green
- prefer fakes over mocks and test public behavior rather than internals

For non-TDD tasks:

- follow existing conventions and patterns
- match naming and structure already used by the project
- reuse existing components and helpers where possible
- validate the current slice before expanding the surrounding implementation

Before claiming a task complete, briefly consider system effects that may sit beyond the immediate code change, such as:

- async flows or error paths
- state persistence or cleanup behavior
- parity across entry points or surfaces
- widget or integration paths that tests should exercise

If execution is delegated, require a structured execution summary with:

- `phase_name`
- `completed_items`
- `blocked_items`
- `notes`
- `tests_run`
- `files_changed`

Important constraint:

- `execute_phase` reports outcomes; it does not decide final plan truth on its own

Stop and ask the user if:

- the phase is blocked by missing requirements or dependencies
- repeated verification failures suggest the plan or approach is wrong
- the plan requires a manual decision before implementation can continue

## Stage 5: `reconcile_plan`

This stage is mandatory after each completed phase, including `--do-not-commit` runs.

Purpose:

- re-read the plan file after phase execution
- match reported completed items to checklist lines in the current phase
- patch matching checklist lines from `- [ ]` to `- [x]`
- leave blocked items unchecked
- add a brief blocker note in the plan when needed
- mark the phase header complete only when all required items in that phase are complete

Required behavior:

- if execution claims a task is complete but no corresponding plan line was updated, fail
- if a task is blocked, it must remain unchecked
- if a blocked item has no blocker note, fail
- do not report the phase complete until reconciliation succeeds

Use this rule literally:

> A phase is not complete until the plan file has been re-read and the corresponding checklist lines have been updated to match the work performed.

## Stage 6: `validate_phase`

After reconciliation, validate the current phase.

Validation commands by project type:

- Flutter:
  - `flutter analyze`
  - `flutter test`
- Dart CLI:
  - `dart analyze`
  - `dart test`

Also verify:

- completed subtasks for the phase are checked in the plan
- blocked items are still unchecked and documented
- if `single_phase = true`, no next-phase work was started

If any validation fails, the phase does not succeed.

## Stage 7: `commit_phase`

After a phase passes reconciliation and validation, decide whether a local commit is required.

If `do_not_commit = true`, skip this stage entirely.

Otherwise:

- if the completed phase produced file changes in this run, create a local commit for that phase before continuing or reporting success
- include the reconciled plan file in that commit when the phase changed plan checkboxes or blocker notes
- use a conventional commit message that describes the completed phase or logical slice

Required behavior:

- do not leave successful completed phase work uncommitted on normal runs
- if a phase succeeded and relevant file changes remain uncommitted, this stage must fail instead of silently continuing
- do not defer a completed phase commit to a later phase

## Stage 8: `decide_continue`

After a phase passes reconciliation, validation, and any required phase commit:

- if `single_phase = true`, stop after this phase
- otherwise continue to the next incomplete phase in scope

When stopping because `single_phase = true`, report clearly:

- which phase was completed
- which items, if any, remain blocked
- which validation commands ran
- whether changes remain uncommitted because `--do-not-commit` was used
- which phase will run next on the next invocation

Do not start the next phase during a `--single-phase` run.

## Stage 9: `final_validate`

After all in-scope phases complete:

1. Re-run the correct analysis and test commands for the inferred project type.
2. Verify the plan file reflects reality for the scope completed in this run.
3. If the full plan is now complete, verify there are no remaining unchecked items unless they are explicitly documented blockers or approved exceptions.
4. Verify that `--do-not-commit` runs performed no git side effects.

Do not continue to shipping if final validation fails.

## Stage 10: `ship`

Shipping is a final stage, not part of phase execution.

If `do_not_commit = true`, skip this stage entirely.

If commits are allowed:

- a completed phase with file changes must be committed after reconciliation and validation
- optional extra incremental commits are allowed only if each one is a working, validated slice
- any final cleanup commit must happen only after `final_validate` passes

Commit requirements:

- every commit must be in a working state
- use conventional commit format
- do not create commits that knowingly include failing analysis or tests

If `create_pr = true`:

- only push and create a PR after all phases are complete and final validation passed
- never create a PR from an incomplete `--single-phase` run
- use `gh pr create` with a summary and testing section

If `create_pr = false`, stop after local commits are in a truthful, validated state.

## Stage 11: `report`

Report the outcome truthfully.

Include:

- phases completed in this run
- completed items and blocked items
- validation commands run
- whether commits were created
- whether a PR was created
- what remains next, if anything

Do not report success if any invariant failed.

## Pitfalls to Avoid

- **Batching tests** - for `TDD:` tasks, do not write many tests up front and implement later; write one failing test, implement, then repeat
- **80% done syndrome** - do not move on early; finish the current in-scope phase truthfully before starting the next one
- **Analysis paralysis** - once the plan, references, and scope are clear, execute the next in-scope slice instead of re-planning the same work

## Commit Guidance

If commits are enabled, each completed phase that changed files must end with a local commit.

Beyond that requirement, prefer small logical units of work rather than large mixed commits.

Use this heuristic:

- commit when a meaningful slice is complete, reconciled, and validated
- do not commit partial work that would only justify a `WIP` message

When `--do-not-commit` is set:

- leave implementation changes and plan updates in the working tree
- do not stage anything
- do not create local commits
- do not push
- do not create a PR

## Manual Verification

Only pause for manual verification when the plan explicitly requires it.

If the plan explicitly calls for manual verification, tell the user exactly what to verify and stop until they respond.

Do not invent extra manual checkpoints outside that rule, except for the natural stop after `--single-phase`.

## Minimal Rule

If the workflow implements or verifies a checklist item, it must update the corresponding line in the plan file before finishing unless the item is blocked, in which case the item must remain unchecked and the blocker must be documented in the plan.
