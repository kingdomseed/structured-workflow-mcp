---
name: act-update-changelog
description: Add a new changelog section following Keep a Changelog conventions
allowed-tools: [Read, Edit, Write, Bash]
---

<objective>
Add a new version section to CHANGELOG.md, update the VERSION file, and keep `.cursor-plugin/plugin.json` in sync when present, following the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) conventions.
</objective>

<arguments>
- `[new_version]` (optional) - The version number to use (e.g., `0.2.0`). If omitted, increments the patch version of the current version in VERSION.
- `[since_commit]` (optional) - A commit SHA or ref to use as the starting point for collecting changes. If omitted, collects changes since the last version tag or the previous release commit.
</arguments>

<instructions>

## Step 1: Determine the New Version

1. Read the `VERSION` file to get the current version (this is the source of truth)
2. If `[new_version]` was provided, use that version
3. Otherwise, increment the patch version (e.g., `0.1.1` → `0.1.2`)

## Step 2: Collect Changes from Git History

1. If `[since_commit]` was provided, use: `git log <since_commit>..HEAD --oneline`
2. Otherwise, try to find the last version tag or use recent commits: `git log --oneline -20`
3. Group commits by type based on conventional commit prefixes:
   - `feat:` → **Added**
   - `fix:` → **Fixed**
   - `docs:` → **Documentation** (only include if significant)
   - `refactor:` → **Changed**
   - `perf:` → **Changed** (performance improvements)
   - `deprecate:` → **Deprecated**
   - `remove:` → **Removed**
   - `security:` → **Security**
   - Other commits → Review and categorize appropriately

## Step 3: Format the Changelog Entry

Use Keep a Changelog format with these change types (only include sections that have entries):

```markdown
## [x.y.z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Vulnerability fixes
```

## Step 4: Update CHANGELOG.md

1. Insert the new version section immediately after the header block (after line 6, before the first existing version)
2. Use today's date in `YYYY-MM-DD` format
3. Write clear, user-focused descriptions (not raw commit messages)
4. Use bullet points with proper markdown formatting

## Step 5: Update VERSION File

1. Write the new version number to the `VERSION` file
2. The file should contain only the version number (e.g., `0.2.0`) with no trailing newline
3. If `.cursor-plugin/plugin.json` exists, update its `version` field to match

## Step 6: Verify

1. Ensure the changelog follows Keep a Changelog conventions
2. Check that the version number is correct
3. Verify the date is today's date
4. Confirm the VERSION file matches the new changelog version
5. If `.cursor-plugin/plugin.json` exists, confirm its `version` field matches too

## Step 7: Commit the Release

1. Stage the release files:

```bash
git add CHANGELOG.md VERSION .cursor-plugin/plugin.json
```

2. Check if there are other uncommitted changes (modified or untracked files besides CHANGELOG.md and VERSION). If so, stash them while keeping staged files:

```bash
git stash push --keep-index -m "update-changelog: stash before release"
```

3. Commit the release:

```bash
git commit -m "chore(release): bump version to x.y.z"
```

4. If changes were stashed, restore them:

```bash
git stash pop
```

</instructions>

<example>
**Command:** `/act-update-changelog 0.2.0 abc1234`

**Result:** Updates VERSION to `0.2.0` and adds a new section to CHANGELOG.md:

```markdown
## [0.2.0] - 2026-01-22

### Added
- New `/act-update-changelog` command for automated changelog updates

### Fixed
- Resolved issue with symlink detection in install scripts
```
</example>

<example>
**Command:** `/act-update-changelog`

**Result:** If VERSION contains `0.1.1`, adds section for `0.1.2` to CHANGELOG.md and updates VERSION to `0.1.2`.
</example>
