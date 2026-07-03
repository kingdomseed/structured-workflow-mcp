# GitHub Workflow Storage

GitHub Workflow Storage writes Specs and derived Work Items as GitHub Issues. Use `gh`.

## References

Accept a full issue URL, `owner/repo#123`, or `#123`. Reject bare numbers. Resolve `#123` from the current working directory's `origin`; if unavailable or ambiguous, ask for a full issue URL or `owner/repo#123`.

When writing, infer the repository from git remotes. Stop when `gh` is missing or unauthenticated, the repository cannot be inferred, or the selected issue cannot be read or edited.

## Create Spec

Create one GitHub Issue for the Spec. Use the display title as the issue title. Use the Spec content as the body, with no YAML frontmatter and no duplicated H1. Omit empty optional sections.

Append the Interview Ledger to the same issue body under `## Interview Ledger`, wrapped in a details block:

```md
## Interview Ledger

<details>
<summary>Show Interview Ledger</summary>

...

</details>
```

Preserve inline `[L#]` references. For parsing, everything before the first `## Interview Ledger` heading is the Spec; everything from that heading onward is ledger content.

## Read Or Update Spec

Read the issue title and body. Parse the Spec and embedded Interview Ledger using the `## Interview Ledger` boundary. Apply approved Spec updates by editing the same issue body. Do not add a comment by default.

## Create Work Items

Create one GitHub Issue per approved Work Item. Do not use YAML frontmatter. Use `Parent: #123` for the parent Spec. Use final GitHub issue references such as `#123` in `## Blocked by`.

For blockers between newly created Work Items:

1. Create all Work Item issues with empty blocker references.
2. Map each proposal ID to its final issue number.
3. Patch each issue body with final `#123` blocker references.
4. Report any issue that was created but could not be patched.

Do not create or rely on GitHub labels. GitHub comments are not durable ACT workflow state.
