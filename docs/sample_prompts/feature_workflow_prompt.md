# Feature Development Workflow Sample Prompt

## Core Instructions

You are an agent - please keep going until the user’s query is completely resolved, before ending your turn and yielding back to the user. Only terminate your turn when you are sure that the problem is solved.

If you are not sure about file content or codebase structure pertaining to the user’s request, use your tools to read files and gather the relevant information: do NOT guess or make up an answer.

You MUST plan extensively before each function call, and reflect extensively on the outcomes of the previous function calls. DO NOT do this entire process by making function calls only, as this can impair your ability to solve the problem and think insightfully.

## Quick Copy-Paste Template

```
I need to implement [FEATURE_NAME] for [TARGET_SYSTEM].

**Context:**
- Project: [PROJECT_NAME]
- Language: [PROGRAMMING_LANGUAGE]
- Framework: [FRAMEWORK_STACK]
- Integration points: [EXISTING_SYSTEMS]

**Feature Requirements:**
[DETAILED_FEATURE_DESCRIPTION]

**Acceptance Criteria:**
- [CRITERIA_1]
- [CRITERIA_2] 
- [CRITERIA_3]

**Constraints:**
- [TECHNICAL_CONSTRAINTS]
- [BUSINESS_CONSTRAINTS]

Please use the Structured Workflow MCP Server to guide this feature development with integrated testing.

Start by calling `mcp__structured-workflow__create_feature_workflow` with this task description.
```

---

## Best Practices Template (Detailed)

### Context and Project Setup
```
**Project Overview:**
- Application: [APP_NAME_AND_PURPOSE]
- Current version: [VERSION_NUMBER]
- Tech stack: [DETAILED_TECH_STACK]
- Architecture: [ARCHITECTURAL_PATTERN]
- Team size: [TEAM_CONTEXT]

**Codebase Context:**
- Repository structure: [REPO_ORGANIZATION]
- Key directories: [IMPORTANT_PATHS]
- Existing patterns: [CODE_PATTERNS_TO_FOLLOW]
- Dependencies: [MAJOR_DEPENDENCIES]
```

### Feature Specification
```
**Feature Overview:**
- Feature name: [DESCRIPTIVE_NAME]
- User story: As a [USER_TYPE], I want [CAPABILITY] so that [BENEFIT]
- Priority: [HIGH/MEDIUM/LOW]
- Estimated complexity: [SIMPLE/MODERATE/COMPLEX]

**Functional Requirements:**
1. [REQUIREMENT_1_WITH_DETAILS]
2. [REQUIREMENT_2_WITH_DETAILS]
3. [REQUIREMENT_3_WITH_DETAILS]

**Non-Functional Requirements:**
- Performance: [PERFORMANCE_EXPECTATIONS]
- Security: [SECURITY_REQUIREMENTS]
- Scalability: [SCALABILITY_NEEDS]
- Accessibility: [ACCESSIBILITY_REQUIREMENTS]
```

### Technical Specifications
```
**Integration Requirements:**
- APIs to integrate: [EXTERNAL_APIS]
- Database changes: [SCHEMA_MODIFICATIONS]
- UI components: [FRONTEND_COMPONENTS]
- Background jobs: [ASYNC_PROCESSING]

**Testing Strategy:**
- Unit tests: [UNIT_TEST_REQUIREMENTS]
- Integration tests: [INTEGRATION_TEST_SCOPE]
- E2E tests: [END_TO_END_SCENARIOS]
- Performance tests: [PERFORMANCE_TEST_TARGETS]
```

---

## Complete Example Usage

```
I need to implement a real-time notification system for our project management application.

**Context:**
- Project: TaskFlow - Team Project Management SaaS
- Language: TypeScript/Node.js + React
- Framework: Express.js backend, React frontend with Redux
- Integration points: PostgreSQL database, Redis cache, WebSocket connections

**Feature Requirements:**
Implement a real-time notification system that alerts users when:
- Tasks are assigned to them
- Project deadlines are approaching
- Team members comment on their tasks
- Project status changes

Users should be able to:
- Receive notifications in real-time while online
- View notification history
- Mark notifications as read/unread
- Configure notification preferences
- Receive email notifications when offline

**Acceptance Criteria:**
- Notifications appear within 2 seconds of triggering event
- Users can toggle notification types on/off
- Notification history persists for 30 days
- Email fallback works when user offline > 15 minutes
- System handles 1000+ concurrent users
- Mobile-responsive notification UI

**Technical Constraints:**
- Must use existing WebSocket infrastructure
- Cannot modify existing user authentication system
- Must be compatible with current Redux state management
- Database queries must not impact main app performance
- Must follow existing API versioning conventions

**Business Constraints:**
- Launch deadline: 3 weeks from today
- Must support existing premium/free tier permissions
- Cannot increase server costs by more than 15%

This feature is critical for user engagement and retention. Please take a deep breath and work through this systematically.

Please use the Structured Workflow MCP Server to guide this feature development with integrated testing.

Start by calling `mcp__structured-workflow__create_feature_workflow` with this task description.
```

---

## Template Customization Guide

### Fill in these placeholders:

1. **[FEATURE_NAME]** - Clear, descriptive feature name
   - Example: "user authentication system"
   - Example: "real-time chat functionality"

2. **[TARGET_SYSTEM]** - Where the feature goes
   - Example: "mobile iOS app"
   - Example: "admin dashboard"

3. **[PROJECT_NAME]** - Your project identifier
   - Example: "E-learning Platform v2"
   - Example: "Customer Support Portal"

4. **[PROGRAMMING_LANGUAGE]** - Primary development language
   - Example: "Python/Django", "Java/Spring", "JavaScript/React"

5. **[FRAMEWORK_STACK]** - Technical stack details
   - Example: "Next.js + Prisma + PostgreSQL"
   - Example: "Flutter + Firebase + Node.js"

6. **[EXISTING_SYSTEMS]** - Integration requirements
   - Example: "payment processor, email service, user management"
   - Example: "analytics system, content management, search engine"

### Detailed Placeholder Examples:

**[DETAILED_FEATURE_DESCRIPTION]:**
```
Good: "Users can upload profile pictures, crop them to standard sizes, and set privacy levels. The system should automatically optimize images for web display and generate thumbnails."

Poor: "Add image upload feature."
```

**[CRITERIA_1], [CRITERIA_2], [CRITERIA_3]:**
```
Good: 
- "File upload completes within 5 seconds for images up to 10MB"
- "Users can crop images with real-time preview"
- "Privacy settings are enforced across all image display contexts"

Poor:
- "Upload works"
- "Images display correctly"
```

**[TECHNICAL_CONSTRAINTS]:**
```
Good: "Must use existing S3 bucket infrastructure, cannot modify user table schema, must support IE11+"

Poor: "Use cloud storage"
```

### Tips for Better Results:

- **User-focused language**: Start with user benefits and business value
- **Specific acceptance criteria**: Make them testable and measurable
- **Technical context**: Include architecture decisions and constraints
- **Priority indicators**: Use phrases like "critical for launch" or "nice-to-have"
- **Timeline awareness**: Mention deadlines or urgency appropriately
- **Quality emphasis**: "This needs to be production-ready" vs "This is a prototype"

### Advanced Prompting Techniques:

1. **Emotional context**: "This feature is essential for our Q4 goals"
2. **Step-by-step request**: "Please work through this systematically"
3. **Quality focus**: "Take time to consider edge cases and error handling"
4. **Collaboration**: "I'll be available to clarify requirements as needed"

### Platform Note:
Some AI platforms add prefixes to MCP tool names. If you get "Unknown tool" errors, try:
- `mcp_structured-workflow__create_feature_workflow`
- `mcp7_structured-workflow__create_feature_workflow`

Use `mcp__structured-workflow__discover_workflow_tools` to check available tools on your platform.
