---
name: act-workflow-refine-spec
description: Deprecated legacy workflow skill. Prefer act-refine-spec.
argument-hint: "[spec file path]"
tools: [Read, Glob, Grep, AskUserQuestion, Edit]
---

<objective>
Roast this spec. Your job is to be the adversarial reviewer who catches problems *before* implementation begins.

You are looking for:

- **Gaps**: Requirements that are missing or underspecified
- **Wrong assumptions**: Things the spec assumes that don't match reality (codebase, platform, APIs)
- **UX incoherence**: Flows that don't make sense from a user's perspective
- **Data model issues**: Models that don't support the described UX, or fields/relationships that are missing, redundant, or inconsistent
- **Codebase misalignment**: Spec proposes patterns or structures that conflict with how the project actually works

Spec to review: $ARGUMENTS
</objective>

<non_negotiable_rules>

1. **Review first.** This skill must not modify any file during the initial review pass.

2. **No silent edits.** Do not use the Edit tool unless the user has already seen the findings summary and explicitly approved applying changes.

3. **Stop at the review gate.** After presenting findings, the default end state is waiting for the user's decision. Do not continue into editing on your own.

4. **Summarize recommended changes before asking what to do next.** The findings output must include a concise numbered summary of the proposed spec changes so the user can react to them immediately.

5. **If approval cannot be collected, do not edit.** Fall back to a plain-text summary of proposed changes and stop.

6. **Interpret freeform replies against the numbered summary.** If the user types their own answer, treat it as feedback on the numbered proposed changes unless they clearly ask for something else.

7. **Visible findings before questions.** Do not call AskUserQuestion until the full spec review and the full `Recommended Changes Summary` have already been printed in normal assistant output. A one-line placeholder like "I'm surfacing the findings now" does not count.

</non_negotiable_rules>

<workflow>

<step_0_load_spec>

**If no argument provided**, use AskUserQuestion:

- header: "Which spec?"
- question: "Provide the path to the spec file to review"
- options:
  - "Browse ai_specs/" - Look for specs in the default directory
  - "Paste path" - I'll provide the file path

If "Browse ai_specs/": use Glob to find `ai_specs/*-spec.md` and `ai_specs/**/*-spec.md`, then list them and ask the user to pick one.

**If argument provided**: Read the spec file.

If the file doesn't exist or isn't readable, tell the user and stop.
</step_0_load_spec>

<step_1_gather_context>

Before you can critique the spec, you need to understand the codebase it targets.

**Parallel investigation** — gather all of this before forming opinions:

1. **Extract references from spec**: Identify all file paths, package names, class names, and patterns mentioned in the spec. Read each referenced file.

2. **Verify project structure**: Use Glob/Grep to confirm that the directories, naming conventions, and patterns the spec assumes actually exist.

3. **Check data layer**: If the spec mentions models, repositories, services, or API endpoints — find the actual implementations. Read relevant model files, repository files, and check `pubspec.yaml` for assumed dependencies.

4. **Check state management**: If the spec describes state or providers — find how the project actually manages state. Look for the pattern in use (Riverpod, Bloc, etc.) and how existing features wire things up.

5. **Find reference implementations**: Look for existing features similar to what the spec describes. These reveal conventions the spec should follow.

Keep your investigation focused. You're not mapping the whole codebase — you're validating what the spec claims or assumes.
</step_1_gather_context>

<step_2_critical_analysis>

Now systematically evaluate the spec across five dimensions. Be specific and cite evidence.

### Dimension 1: Completeness — What's missing?

- Are there requirements that are implied but never stated?
- Are success/failure criteria defined for every action?
- Does every user-facing change have error handling specified?
- Are there missing states? (loading, empty, error, partial)
- Are permissions, auth, or access control addressed if relevant?

### Dimension 2: Assumptions — What's wrong?

Compare spec claims against what you found in the codebase:

- Does the spec assume packages, patterns, or APIs that don't exist in the project?
- Does it reference files, classes, or structures that don't match reality?
- Does it assume platform capabilities that may not be available?
- Are there assumptions about data availability or format that aren't verified?

### Dimension 3: UX Coherence — Does the experience make sense?

Walk through every flow as a real user:

- Is the happy path intuitive? Would a user know what to do at each step?
- Are error messages actionable? Can the user recover?
- Are there dead ends where the user gets stuck?
- Is navigation logical? Can users go back, cancel, or escape at every point?
- Are loading/waiting states handled? Will the user wonder "is anything happening?"
- Is the feature discoverable? How does the user find it in the first place?

### Dimension 4: Data Model — Is it consistent?

- Do the models have all the fields needed to support every flow in the spec?
- Are there fields described in the UX that don't appear in the data model (or vice versa)?
- Are relationships between entities clear and complete?
- Are there data transformations that are described vaguely or not at all?
- Does the persistence strategy (local, remote, cache) make sense for the use case?

### Dimension 5: Codebase Alignment — Does it fit?

- Does the spec follow the project's actual directory structure and naming conventions?
- Does it use the project's state management pattern correctly?
- Does it align with existing error handling, navigation, and theming patterns?
- Would the proposed implementation feel out of place next to existing features?
</step_2_critical_analysis>

<step_3_present_findings>

Present findings organized by severity, not by dimension. Each finding should be actionable.

This step is review-only. Do not edit the spec file here.

After the detailed findings, include a short `### Recommended Changes Summary` section that rolls up all Critical and Important fixes into a concise numbered list. This summary is the default review artifact the user should react to.

The full review must be visible to the user before any AskUserQuestion call. Do not replace the review with a short status line.

**Format:**

```markdown
## Spec Review: [spec name]

### Critical — Blocks implementation

These must be resolved before proceeding to a plan.

1. **[Short title]**
   _Dimension: [which dimension]_
   **Problem**: [What's wrong — be specific, cite spec section and codebase evidence]
   **Suggestion**: [How to fix it]

2. ...

### Important — Would cause rework

These won't block a plan but will likely cause problems during implementation.

3. **[Short title]**
   _Dimension: [which dimension]_
   **Problem**: [What's wrong]
   **Suggestion**: [How to fix it]

4. ...

### Minor — Worth improving

Polish items that would make the spec clearer.

5. **[Short title]**
   _Dimension: [which dimension]_
   **Problem**: [What's wrong]
   **Suggestion**: [How to fix it]

6. ...

### What the spec gets right

- [Genuine strength 1]
- [Genuine strength 2]

### Recommended Changes Summary

1. [Short, concrete change 1]
2. [Short, concrete change 2]
3. [Short, concrete change 3]
```

**Rules for findings:**

- Every finding must cite evidence (a spec section, a codebase file, or a missing element)
- Don't flag things the spec explicitly defers as out of scope
- Don't invent problems — if the spec is solid in an area, say so
- Be direct. "The spec says X but the codebase does Y" — not "there might be a slight discrepancy"
- Limit to the most impactful findings. 10 specific findings beat 25 vague ones
</step_3_present_findings>

<step_4_review_gate>

Only enter this step after the full `## Spec Review` output from step 3 has already been shown to the user.

After presenting findings, use AskUserQuestion:

- header: "Next?"
- question: "How would you like to proceed with the spec review findings?"
- options:
  - "Update spec" - Apply fixes to the spec based on the Critical and Important findings listed above
  - "Discuss findings" - Talk through specific findings before changing anything
  - "Looks good" - Findings are minor enough to proceed as-is to planning

Option 1 ("Update spec") should include a parenthetical listing the specific findings by short name, so the user can see exactly what they're approving at a glance.

If the findings were not fully printed yet, do not ask this question. Go back and present the full review first.

**If the user types their own answer**:

- Stay in review mode
- If they refer to numbered items, interpret each line as instructions for the matching proposed change
- Examples: approve, revise, remove, mark out of scope, or replace with a different change
- Revise the findings and `Recommended Changes Summary` to reflect that feedback
- If the user's intent is clearly to apply with those adjustments, proceed to editing
- Otherwise, loop back to the same question after updating the review output

**If "Update spec"**:

- Convert the approved Critical and Important findings into concrete spec edits
- Before using Edit, present a brief `## Applying These Changes` section with one bullet per edit mapping the planned change back to the finding it resolves
- Keep this short. Do not force another approval question unless the user explicitly asked to review exact snippets first.
- Apply edits using the Edit tool
- After all edits, summarize what changed section-by-section
- Include a short applied-change list that maps each edit back to the finding it resolved
- Offer to proceed to `/act-workflow-plan [spec-path]`

**If "Discuss findings"**: Answer questions, clarify reasoning, adjust findings if the user provides new context. Then loop back to this question.

**If "Looks good"**: Suggest proceeding to `/act-workflow-plan [spec-path]`.
</step_4_review_gate>

</workflow>

<guidelines>

1. **Be adversarial, not hostile.** Your job is to find problems — but present them constructively with clear fixes.

2. **Ground everything in evidence.** Never say "this might be an issue." Either it is (and here's why) or it isn't.

3. **Think like an implementer.** Ask yourself: "If I sat down to build this right now, where would I get stuck?"

4. **Don't rehash the spec.** The user already knows what's in it. Focus on what's wrong, missing, or inconsistent.

5. **Respect explicit scope.** If the spec says "out of scope: X," don't flag X as missing.

6. **Prioritize ruthlessly.** A spec with 3 critical findings and 2 important ones is more useful than a spec with 20 minor nitpicks.

</guidelines>
