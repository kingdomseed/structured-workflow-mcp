---
name: act-workflow-spec
description: Deprecated legacy workflow skill. Prefer act-interview followed by act-create-spec.
argument-hint: [task description or file path]
tools: [Read, Write, Glob, Grep, AskUserQuestion, SlashCommand, Skill]
---

<objective>
Transform a task description into a specification so clear and complete that implementation can proceed without confusion or guesswork.

**Goal**: When implementation begins, every user journey should be clear, edge cases accounted for, and critical questions are answered.

Task input: $ARGUMENTS
</objective>

<workflow>

<step_0_user_input>
<understand>
First, determine the input type:

**No input or vague request:**
Use AskUserQuestion:

- header: "What do you need?"
- question: "What type of work should this spec cover?"
- options:
  - "New feature" - Build something that doesn't exist yet
  - "Fix/improve" - Improve or fix existing functionality
  - "Investigation" - Research, analyze, or document

Then ask: "Describe what you want to accomplish" (user selects "Other" to provide free text).

**File path provided** (contains `/` or ends in `.md`, `.txt`):
Use Read tool to load the file and use its contents as the task description.

**Text description provided:**
Proceed directly to analysis.
</understand>

<analyze>
Before asking questions, gather context:

1. Use Glob/Grep/Read tools to examine any files mentioned or implied in the description
2. Look for reference implementations or examples in the codebase
3. Identify patterns or conventions to follow

From the description, extract:

- **Goal**: What outcome is expected
- **Scope**: What's in scope vs out of scope
- **Constraints**: Technology, patterns, dependencies
- **Gaps**: What needs clarification
  </analyze>

<map_flows>
Before creating the outline, map user flows (skip for non-user-facing tasks):

1. **Identify user journeys** - What actions can users take? What paths lead to success?
2. **Note decision points** - Where do users make choices? What branches exist?
3. **Consider user types** - Different roles, permission levels, first-time vs returning users
4. **Think through states** - Happy path, error states, partial completion, recovery flows
5. **Map entry/exit points** - How do users get here? Where do they go next?

For features with user interaction, briefly document:

- Primary flow (happy path)
- Alternative flows (different user types, different entry points)
- Error/recovery flows (what happens when things fail)
- Edge cases (cancellation, timeout, concurrent actions)

**Permutation checklist** - For each core flow, consider:

- First-time vs returning user behavior
- Different device/platform contexts
- Network conditions (offline, slow, fast)
- Partial completion and resumption
- Cancellation and rollback paths
- Concurrent user actions
  </map_flows>

<clarify>
Use AskUserQuestion to ask 2-4 questions that fill genuine gaps.

**Prioritize questions by impact:**

1. **Critical** - Blocks implementation or creates security/data risks

   - Ask these first. Do not proceed until answered.
   - Examples: authentication method, data persistence strategy, security boundaries

2. **Important** - Significantly affects UX or maintainability

   - Ask alongside critical questions when possible
   - Examples: error handling approach, state management, API design

3. **Nice-to-have** - Improves clarity but has reasonable defaults
   - State your assumption; ask only if time permits
   - Examples: naming conventions, minor UX details, logging verbosity

**Guidelines:**

- Address real unknowns, not things already stated or inferable
- Offer concrete options with brief explanations of implications
- Focus on decisions that would change the implementation
- Be specific: "What should happen when OAuth returns a 429?" not "What about errors?"
- User can always select "Other" for custom input
- Limit to 2-4 questions per round

**Typical areas needing clarification:**

- Which approach when multiple are valid
- Error handling and recovery strategies
- Edge case behavior (timeout, cancellation, partial state)
- Format or structure preferences
- Scope boundaries for complex requests
- Integration requirements or dependencies
  </clarify>

<preview_outline>
After answering initial questions, create a brief outline (DO NOT write the full spec yet):

Present this outline to the user:

```
Based on our discussion, here's what the spec will cover:

**Goal:** [1-2 sentence summary]

**Key Requirements:**
- [Bullet point 1]
- [Bullet point 2]
- [Bullet point 3]

**User Flows Identified:** (for user-facing features)
- Primary: [Main happy path]
- Alternatives: [Other valid paths]
- Error handling: [Key failure scenarios covered]

**Implementation Approach:**
[High-level description of the approach]

**Potential Gaps:** (if any identified during flow analysis)
- [Gap 1 - and your proposed resolution]
- [Gap 2 - and your proposed resolution]
```

Then use AskUserQuestion:

- header: "Refine?"
- question: "What would you like to do with this outline?"
- options:
  - "Ask clarifying questions" - I need more details on specific areas
  - "Add/change something" - I want to modify the scope or approach
  - "Generate full spec" - This looks good, create the detailed specification

If "Ask clarifying questions" → first use AskUserQuestion to show which areas need clarification:

- header: "Clarify"
- question: "Which aspects need clarification? Select all that apply."
- multiSelect: true
- options:
  - "[Clarification area 1]" - [Brief explanation of what this clarifies]
  - "[Clarification area 2]" - [Brief explanation of what this clarifies]
  - "[Clarification area 3]" - [Brief explanation of what this clarifies]
  - "[Clarification area 4]" - [Brief explanation of what this clarifies]

Then use AskUserQuestion to ask focused questions only for the selected areas. Update outline and loop back
If "Add/change something" → collect input via "Other", update outline, loop back
If "Generate full spec" → announce: "Creating spec for: [one-line summary]" and proceed to full generation
</preview_outline>
</step_0_user_input>

<step_1_generation>

<before_writing>
Assess the task:

**Complexity:**

- Simple: Single file, clear path forward
- Moderate: Multiple files, some judgment calls
- Complex: Architecture decisions, exploration needed

**Depth needed:**

- Standard tasks → direct instructions
- Complex reasoning → add "analyze thoroughly" or "evaluate alternatives"
- Ambitious scope → add "aim for completeness"

**Special sections:**

- Exploration needed? → add `<discovery>` section
- Multiple stages? → add `<stages>` section
- Edge cases matter? → add `<boundaries>` section

For involved tasks, note the complexity to the user:

> "This task touches [areas]. The spec breaks it into stages for clarity."
> </before_writing>

<testing_strategy>
For features with testable logic (business rules, state management, services, or widget behavior), load TDD guidance before finalizing validation details:

```
Skill: act-flutter-tdd
```

Use the guidance to ensure the spec names:

- Behavior-first test slices (happy path → edge cases → error handling)
- Vertical-slice RED → GREEN → REFACTOR expectations for implementation
- Testability seams (constructor injection, interface boundaries, deterministic dependencies)
- Mocking policy expectations (prefer fakes; mock only true external boundaries)
- Any justified exceptions where strict TDD is not practical

For user-facing features with non-trivial journeys, load robot testing guidance before finalizing validation details:

```
Skill: act-flutter-robot-testing
```

Use the guidance to ensure the spec names:

- Baseline automated coverage outcomes across logic, UI behavior, and critical journeys
- Critical journeys that require robot-driven coverage
- Default mapping: robot tests for critical cross-screen happy paths; widget tests for screen-level edge/error/cancel states; unit tests for underlying logic/state transitions
- Stable selectors needed for robust tests
- Deterministic seams/test setup required to avoid flaky flows
- Any known testing risks or gaps to report explicitly
</testing_strategy>

<spec_template>
Structure the spec with these sections:

```xml
<goal>
[What to build/fix/analyze and why it matters]
[Who benefits and how they'll use it]
</goal>

<background>
[Tech stack, project context, relevant constraints]
[Files to examine: @path/to/relevant/files]
</background>

<user_flows>
<!-- Include for user-facing features -->
Primary flow:
1. [Step 1]
2. [Step 2]
3. [Success state]

Alternative flows:
- [Different user type]: [How their flow differs]
- [Different entry point]: [How this changes the journey]

Error flows:
- [Error condition]: [Expected behavior and recovery path]
</user_flows>

<requirements>
**Functional:**
1. [Core requirement - must be verifiable]
2. [Second requirement]

**Error Handling:**
3. [What happens when X fails]
4. [Recovery behavior for Y]

**Edge Cases:**
5. [Boundary condition handling]
6. [Concurrent action behavior]

**Validation:**
7. [Input constraints and feedback]
</requirements>

<boundaries>
<!-- Standard section for user-facing features -->
Edge cases:
- [Boundary condition]: [Expected behavior]
- [Unusual state]: [How to handle]

Error scenarios:
- [Failure type]: [User feedback and recovery]
- [Timeout/unavailable]: [Graceful degradation]

Limits:
- [Rate limits, size limits, etc.]: [Behavior when exceeded]
</boundaries>

<implementation>
[Files to create or modify]
[Patterns or libraries to use]
[What to avoid and the reason why]
</implementation>

<validation>
[How to test the implementation]
[Expected behavior for each test]
[Require baseline automated coverage outcomes: logic/business rules, UI behavior, and critical user journeys]
[For TDD-applicable work, specify behavior-first slices and testability seams needed to execute test-first safely]
[For user-facing features: identify robot-driven journey tests for critical flows, plus required selectors/seams]
[For user-facing flows, specify default test split: robot for critical happy path journeys; widget tests for screen-level edge cases (e.g., cancel, retry, validation errors); unit tests for business/state logic]
</validation>

<done_when>
[Measurable completion criteria]
</done_when>
```

</spec_template>

<additional_sections>
Add these for complex tasks as needed:

```xml
<discovery>
[What to explore before implementing]
[Questions to answer through code inspection]
[Patterns to identify in existing code]
</discovery>

<stages>
[Phase 1: description + how to verify completion]
[Phase 2: description + how to verify completion]
[Continue as needed]
</stages>

<illustrations>
[Examples of desired behavior]
[Counter-examples showing what to avoid]
</illustrations>
```

Note: `<boundaries>` is now a standard section for user-facing features, not optional.
</additional_sections>

<content_guidance>
**Always do:**

- Use XML tags with meaningful names
- Explain context: why this matters, who it's for
- Give explicit instructions, not vague direction
- Number requirements for easy reference
- Specify output paths: `./path/to/file`
- Include clear success criteria
- For user-facing features: include `<user_flows>` and `<boundaries>` sections
- Categorize requirements (Functional, Error Handling, Edge Cases, Validation)
- In `<validation>`, require baseline automated coverage outcomes for logic, UI behavior, and critical journeys
- For features with testable logic/state/service/widget behavior: require explicit TDD expectations in `<validation>` (behavior order, seams, and exception handling)
- For user-facing features with meaningful journeys: require robot-driven journey coverage in `<validation>`

**When appropriate:**

- For complex analysis: "examine thoroughly", "consider alternatives"
- For ambitious features: "make it complete and polished"
- For constraints: explain the reasoning, not just the rule
  - Instead of: "Don't use package X"
  - Write: "Avoid package X because it conflicts with our build system"
- For multi-step work: "verify each stage before continuing"
- For ambiguous requirements: include examples showing desired vs undesired behavior

**Think like a user:**

- Walk through flows as if you're actually using the feature
- Consider the unhappy paths—errors, failures, and edge cases are where most gaps hide
- Be specific about error scenarios: "What happens when the OAuth provider returns a 429?" not "Handle errors"
- Consider partial states: What if the user closes the browser mid-flow? What if the network drops?
  </content_guidance>

<guidelines>

1. **Ask Questions**: If anything is unclear, ask before proceeding. A few clarifying questions prevent wasted effort. Test: Would someone with minimal context understand what to build from this spec?

2. **Context Matters**: Always include WHY the task matters, WHO benefits, and WHAT the outcome will be used for. Specs without context lead to technically correct but practically wrong implementations.

3. **Be Explicit**: Generate specs with specific, unambiguous instructions. For ambitious results, say "aim for completeness." For specific formats, state exactly what's needed. Don't leave room for interpretation on critical details.

4. **Adaptive Complexity**: Simple tasks get concise specs. Complex tasks need comprehensive structure with exploration phases and "analyze thoroughly" triggers. Match spec depth to task difficulty.

5. **Selective File Reading**: Only request file reading when implementation requires understanding existing code:

   - "Examine @pubspec.yaml for dependencies" (when adding packages)
   - "Review @lib/services/\* for patterns" (when extending existing code)
   - Skip file reading for greenfield features

6. **Precision Over Brevity**: Default to precision. A longer, clear spec beats a short, ambiguous one. Concise is fine only when the task is genuinely simple.

7. **Output Paths Required**: Every spec must specify exactly where outputs should be saved using relative paths.

8. **Validation Required**: Every spec needs clear success criteria and verification steps. If you can't describe how to test it, the requirement isn't specific enough.

9. **Pure Content**: Spec files contain only the specification—no preamble, no meta-commentary, no explanations about the spec itself.

10. **Plan Handoff Concision**: Write requirements and phases in crisp, atomic statements so downstream `/act-workflow-plan` can produce extremely concise, telegraphic plans without losing meaning.
    </guidelines>

<save_spec>
Use Write tool to save the spec:

**If input was a file** (e.g., `docs/feature-idea.md`):
→ Save beside it: `docs/feature-idea-spec.md`

**If input was text:**
→ Ask where to save, or use: `./ai_specs/[descriptive-name].md`
</save_spec>

<next_steps>
After saving, announce: "Spec saved: [path]"

Then use AskUserQuestion.
Use the options in this exact order, with labels exactly as written (do not reorder, do not rename):

- header: "Next step"
- question: "What would you like to do next?"
- options:
  - "Review spec" - Critically review the spec with /act-workflow-refine-spec
  - "Commit spec" - Stash and commit the spec with /act-git-commit
  - "Create plan" - Create plan with /act-workflow-plan [spec-path]
  - "Create plan (deep)" - Create plan with /act-workflow-plan [spec-path] --use-subagents (deeper research, slower)

If "Review spec", use SlashCommand tool: `/act-workflow-refine-spec [spec-path]`
If "Commit spec", use SlashCommand tool: `/act-git-commit`
If "Create plan", use SlashCommand tool: `/act-workflow-plan [spec-path]`
If "Create plan (deep)", use SlashCommand tool: `/act-workflow-plan [spec-path] --use-subagents`
</next_steps>

</step_1_generation>

</workflow>

<success_criteria>
Your spec is successful if:

- The `/act-workflow-plan` skill can consume it without ambiguity
- All requirements are verifiable
- Context is clear (why, who, what)
- Output paths are specified
- Validation steps are included
- Validation defines baseline automated coverage outcomes for logic, UI behavior, and critical journeys
- For features with testable logic/state/service/widget behavior:
  - Validation includes TDD-first expectations (behavior ordering and vertical-slice cycles)
  - Validation identifies required seams to keep tests deterministic and maintainable
- For user-facing features with meaningful journeys:
  - Validation includes robot-driven test coverage for critical flows
  - Validation includes explicit test-type mapping (robot happy-path journeys, widget screen edge cases, unit logic coverage) or justified deviations
  - Required stable selectors and deterministic Test Seams are specified
- For user-facing features:
  - All user flows are mapped (happy path, alternatives, errors)
  - Edge cases and error scenarios are explicitly addressed
  - Boundaries section covers failure modes and limits
    </success_criteria>
