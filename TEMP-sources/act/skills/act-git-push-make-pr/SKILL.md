---
name: act-git-push-make-pr
description: Push current branch to GitHub and create a pull request
tools: [Bash, Read, Glob, AskUserQuestion]
---

Push the current branch to GitHub and create a PR:

1. Check for uncommitted changes using `git status`
   - If uncommitted changes exist, warn the user and ask how to proceed (commit first, stash, or abort)

2. Determine branch and base context early:
   - Get current branch name: `git branch --show-current`
   - Detect base branch (prefer `main`, fallback `master`)
   - Collect branch evidence now (always):
     - `git diff <base-branch>...HEAD`
     - `git log <base-branch>..HEAD --oneline`

3. Push the current branch to GitHub using `git push -u origin <branch-name>`

4. Check if a PR already exists for this branch using `gh pr list --head <branch-name>`
   - If a PR exists, warn the user and abort

5. Use workflow context only when already known:
   - If the current session or branch clearly identifies a Work Item or Spec, use it as supporting context
   - Never use workflow context unless it matches the branch diff/log

6. Validate context lightly:
   - Treat `git diff` and `git log` as the source of truth
   - Use workflow artifacts only for intent, acceptance criteria, coverage, and test-plan hints
   - If context is missing, ambiguous, or weakly related, ignore it and generate the PR from git history only

7. Generate PR content based on available context:

   **PR title policy (strict):**
   - Maximum length: **100 characters**
   - Keep it concise and scan-friendly (prefer one line, no trailing punctuation)
   - Use a clear action-oriented style (for example: Add/Fix/Update/Refactor/Remove/Docs/Test/Chore)
   - It is acceptable to include multiple changes for large PRs, but keep only the highest-signal items
   - Avoid low-level implementation details unless they are the main point of the PR
   - If a generated title is too long, rewrite it until it fits within 100 characters

   **If relevant workflow context is known:**
   - Use branch git history and diff as the primary source of truth
   - Use the context only to enrich the PR title/body with intent, requirements, acceptance criteria, and coverage
   - Prefer Work Item acceptance criteria for the Test plan when they match the branch changes
   - Do not copy the artifact body literally unless every section is clearly relevant to this PR
   - Before creating the PR, run a sanity check that context keywords align with `git diff`/`git log`; if not, fall back to history-based PR content

   **If no relevant workflow context is known:**
   - Use only branch git history and diff for title/body generation
   - Infer the PR title and description from the changes:
      - Title: Summarize the main changes and enforce the PR title policy (e.g., "Add auth and profile onboarding", "Fix pagination and improve loading states")
      - Body: Generate a summary with:
        - **Summary**: 1-3 bullet points describing what changed and why
        - **Changes**: Key files/components modified
        - **Test plan**: Suggested testing steps based on the changes

8. Create the PR:
   - Base branch: Auto-detect (typically main or master)
   - Do not add labels or reviewers
   - Final guardrail: if title/body mention topics not present in this branch's diff/log, abort and regenerate from git history only
