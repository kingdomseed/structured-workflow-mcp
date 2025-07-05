# Custom Workflow Sample Prompt

## Core Instructions

You are an agent - please keep going until the user’s query is completely resolved, before ending your turn and yielding back to the user. Only terminate your turn when you are sure that the problem is solved.

If you are not sure about file content or codebase structure pertaining to the user’s request, use your tools to read files and gather the relevant information: do NOT guess or make up an answer.

You MUST plan extensively before each function call, and reflect extensively on the outcomes of the previous function calls. DO NOT do this entire process by making function calls only, as this can impair your ability to solve the problem and think insightfully.

## Quick Copy-Paste Template

```
I need to create a custom workflow for [UNIQUE_TASK_DESCRIPTION].

**Context:**
- Project: [PROJECT_NAME]
- Language: [PROGRAMMING_LANGUAGE]
- Unique requirements: [SPECIAL_CONSTRAINTS]
- Timeline: [TIME_CONSTRAINTS]

**Custom Workflow Needs:**
[DETAILED_CUSTOM_REQUIREMENTS]

**Desired Phases:**
- [PHASE_1]: [PHASE_1_DESCRIPTION]
- [PHASE_2]: [PHASE_2_DESCRIPTION]
- [PHASE_3]: [PHASE_3_DESCRIPTION]

**Success Criteria:**
- [CRITERIA_1]
- [CRITERIA_2]

Please help me build a custom workflow that addresses these specific needs.

Start by calling `mcp__structured-workflow__build_custom_workflow` with this task description.
```

---

## Best Practices Template (Detailed)

### Custom Workflow Context
```
**Project Overview:**
- Application type: [APPLICATION_CATEGORY]
- Domain: [BUSINESS_DOMAIN]
- Team structure: [TEAM_COMPOSITION]
- Methodology: [DEVELOPMENT_APPROACH]
- Constraints: [ORGANIZATIONAL_CONSTRAINTS]

**Why Custom Workflow Needed:**
- Standard workflows don't fit because: [REASON_FOR_CUSTOMIZATION]
- Unique aspects of this project: [PROJECT_UNIQUENESS]
- Special requirements: [CUSTOM_REQUIREMENTS]
- Industry/domain considerations: [DOMAIN_SPECIFIC_NEEDS]
```

### Workflow Phase Design
```
**Phase Selection:**
Choose from available phases or explain custom needs:
- AUDIT_INVENTORY: [KEEP/MODIFY/SKIP - REASON]
- COMPARE_ANALYZE: [KEEP/MODIFY/SKIP - REASON]  
- QUESTION_DETERMINE: [KEEP/MODIFY/SKIP - REASON]
- WRITE_OR_REFACTOR: [KEEP/MODIFY/SKIP - REASON]
- TEST: [KEEP/MODIFY/SKIP - REASON]
- LINT: [KEEP/MODIFY/SKIP - REASON]
- ITERATE: [KEEP/MODIFY/SKIP - REASON]
- PRESENT: [KEEP/MODIFY/SKIP - REASON]

**Custom Phase Needs:**
- [CUSTOM_PHASE_NAME]: [CUSTOM_PHASE_PURPOSE]
- [SPECIAL_WORKFLOW_STEP]: [STEP_REQUIREMENTS]
```

### Advanced Configuration
```
**Iteration Limits:**
- Maximum overall iterations: [MAX_ITERATIONS]
- Test failure retry limit: [TEST_RETRY_LIMIT]
- Lint fix attempt limit: [LINT_RETRY_LIMIT]

**User Checkpoints:**
- Before major changes: [YES/NO]
- After failed iterations: [YES/NO]
- Before final presentation: [YES/NO]

**Output Preferences:**
- Documentation format: [MARKDOWN/JSON/BOTH]
- Include code snippets: [YES/NO]
- Generate diagrams: [YES/NO]
- Real-time updates: [YES/NO]
```

---

## Complete Example Usage

```
I need to create a custom workflow for migrating a legacy COBOL system to modern microservices.

**Context:**
- Project: Mainframe Banking System Modernization
- Language: COBOL → Java/Spring Boot + Node.js
- Unique requirements: Gradual migration, zero downtime, regulatory compliance
- Timeline: 18-month phased migration

**Custom Workflow Needs:**
This is not a typical development project. We're modernizing a 40-year-old COBOL banking system that processes millions of transactions daily. The migration must happen gradually while maintaining 100% uptime and meeting strict financial regulations.

We need a workflow that handles:
1. Legacy code analysis and documentation
2. Business logic extraction and mapping
3. Risk assessment for each migration phase  
4. Compliance validation at every step
5. Performance benchmarking against legacy
6. Rollback planning for each component
7. Staff training and knowledge transfer

**Why Standard Workflows Don't Fit:**
- Not building new features - extracting existing logic
- Can't break anything - financial transactions are critical
- Need regulatory approval at multiple checkpoints
- Team includes COBOL experts and modern developers
- Must maintain two systems in parallel during migration

**Desired Custom Phases:**
- LEGACY_ANALYSIS: Deep dive into COBOL codebase structure
- BUSINESS_MAPPING: Extract and document business rules
- RISK_ASSESSMENT: Identify migration risks and mitigation strategies
- COMPLIANCE_REVIEW: Validate regulatory requirements
- ARCHITECTURE_DESIGN: Design modern system architecture
- PROTOTYPE_BUILD: Create proof-of-concept for critical flows
- PERFORMANCE_BASELINE: Establish current system benchmarks
- MIGRATION_PLANNING: Create detailed migration roadmap
- STAKEHOLDER_REVIEW: Get approval from business and compliance teams

**Success Criteria:**
- All COBOL business logic documented and understood
- Modern architecture handles current transaction volume
- Zero data loss during migration
- Meets all SOX and banking regulatory requirements
- Team trained on new technologies
- Rollback procedures tested and documented
- Migration plan approved by all stakeholders

**Special Requirements:**
- Each phase needs compliance officer approval
- Performance testing must match production load
- All changes tracked for audit purposes
- Documentation must be audit-ready
- Two-week cooling period between major phases

**Team Structure:**
- 3 COBOL experts (retiring in 2 years)
- 5 Java developers (learning the business domain)
- 2 architects (designing modern system)
- 1 compliance officer (regulatory approval)
- 1 project manager (coordinating phases)

This is mission-critical work that could affect millions of customers. Please take a deep breath and help me design a workflow that ensures we migrate safely and successfully.

Start by calling `mcp__structured-workflow__build_custom_workflow` with this task description.
```

---

## Custom Workflow Categories

### Data Migration Projects
```
**Use Case**: Moving data between systems, format conversions, legacy migrations
**Custom Phases**: Data audit, mapping design, transformation testing, migration validation
**Special Needs**: Data integrity checks, rollback procedures, performance validation
```

### Security Implementation
```
**Use Case**: Adding security features, compliance updates, vulnerability remediation  
**Custom Phases**: Security audit, threat modeling, compliance review, penetration testing
**Special Needs**: Security officer approval, compliance documentation, audit trails
```

### Performance Optimization
```
**Use Case**: System performance improvements, scalability enhancements
**Custom Phases**: Performance profiling, bottleneck analysis, optimization implementation, load testing
**Special Needs**: Baseline measurements, A/B testing, rollback capabilities
```

### Integration Projects  
```
**Use Case**: Connecting systems, API integrations, third-party services
**Custom Phases**: Integration mapping, API design, compatibility testing, deployment coordination
**Special Needs**: Cross-team coordination, external vendor management, staging environments
```

### Compliance Projects
```
**Use Case**: GDPR, HIPAA, SOX, or other regulatory compliance
**Custom Phases**: Compliance gap analysis, policy implementation, audit preparation, certification
**Special Needs**: Legal review, documentation standards, audit trails, approval gates
```

## Template Customization Guide

### Fill in these placeholders:

1. **[UNIQUE_TASK_DESCRIPTION]** - What makes this workflow special
   - Example: "migrating legacy mainframe to cloud"
   - Example: "implementing ML model deployment pipeline"
   - Example: "coordinating multi-team API redesign"

2. **[SPECIAL_CONSTRAINTS]** - Unique limitations or requirements
   - Example: "zero downtime, regulatory approval required"
   - Example: "multiple programming languages, distributed teams"
   - Example: "tight deadline, limited budget, legacy dependencies"

3. **[CUSTOM_REQUIREMENTS]** - What standard workflows miss
   - Example: "need compliance checkpoints, risk assessment phases"
   - Example: "require A/B testing, gradual rollout phases"
   - Example: "must coordinate with external vendors, approval gates"

### Custom Phase Design Tips:

**Phase Naming:**
- Use domain-specific terms that your team understands
- Make phases actionable (verbs): ANALYZE, DESIGN, VALIDATE, DEPLOY
- Order phases logically based on dependencies

**Phase Purposes:**
- Each phase should have clear deliverables
- Include approval/checkpoint phases for high-risk projects
- Consider parallel phases for efficiency
- Plan rollback/recovery phases for critical systems

### Advanced Configuration Examples:

**High-Risk Projects:**
```
iterationLimits: {
  ITERATE: 3,  // Limited retries for stability
  TEST: 10,    // Extensive testing allowed
  LINT: 5      // Code quality enforcement
}

userCheckpoints: {
  beforeMajorChanges: true,    // Always check with user
  afterFailedIterations: true, // Get help when stuck
  beforeFinalPresentation: true // Final review
}
```

**Rapid Prototyping:**
```
iterationLimits: {
  ITERATE: 20,  // Allow many iterations
  TEST: 3,      // Quick testing only
  LINT: 2       // Minimal code quality
}

selectedPhases: ["AUDIT_INVENTORY", "WRITE_OR_REFACTOR", "PRESENT"]
// Skip extensive analysis for speed
```

### Tips for Custom Workflow Success:

- **Start simple**: Begin with standard phases and modify as needed
- **Document reasons**: Explain why custom phases are necessary
- **Consider team skills**: Design phases that match team capabilities
- **Plan checkpoints**: Include approval gates for stakeholder involvement
- **Think rollback**: Consider what happens if something goes wrong
- **Measure success**: Define clear criteria for each phase completion

### Platform Note:
Some AI platforms add prefixes to MCP tool names. If you get "Unknown tool" errors, try:
- `mcp_structured-workflow__build_custom_workflow`
- `mcp7_structured-workflow__build_custom_workflow`

Use `mcp__structured-workflow__discover_workflow_tools` to check available tools on your platform.
