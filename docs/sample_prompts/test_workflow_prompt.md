# Test Workflow Sample Prompt

## Core Instructions

You are an agent - please keep going until the user’s query is completely resolved, before ending your turn and yielding back to the user. Only terminate your turn when you are sure that the problem is solved.

If you are not sure about file content or codebase structure pertaining to the user’s request, use your tools to read files and gather the relevant information: do NOT guess or make up an answer.

You MUST plan extensively before each function call, and reflect extensively on the outcomes of the previous function calls. DO NOT do this entire process by making function calls only, as this can impair your ability to solve the problem and think insightfully.

## Quick Copy-Paste Template

```
I need to improve test coverage for [TARGET_CODE_OR_FEATURE].

**Context:**
- Project: [PROJECT_NAME]
- Language: [PROGRAMMING_LANGUAGE]
- Test framework: [TESTING_FRAMEWORK]
- Current coverage: [COVERAGE_PERCENTAGE]

**Testing Objectives:**
[SPECIFIC_TESTING_GOALS]

**Test Types Needed:**
- [TEST_TYPE_1]
- [TEST_TYPE_2]
- [TEST_TYPE_3]

**Coverage Goals:**
- Target coverage: [TARGET_PERCENTAGE]
- Critical paths: [CRITICAL_FUNCTIONALITY]

Please use the Structured Workflow MCP Server to guide this test development process.

Start by calling `mcp__structured-workflow__test_workflow` with this task description.
```

---

## Best Practices Template (Detailed)

### Project and Test Environment Context
```
**Project Overview:**
- Application: [APP_DESCRIPTION]
- Architecture: [SYSTEM_ARCHITECTURE]
- Primary language: [MAIN_LANGUAGE]
- Secondary languages: [OTHER_LANGUAGES]

**Test Infrastructure:**
- Test framework: [FRAMEWORK_NAME_AND_VERSION]
- Test runner: [RUNNER_DETAILS]
- Mocking library: [MOCKING_TOOLS]
- CI/CD integration: [PIPELINE_DETAILS]
- Coverage tools: [COVERAGE_MEASUREMENT]
```

### Testing Scope and Strategy
```
**Current Test State:**
- Overall coverage: [CURRENT_COVERAGE_STATS]
- Unit test coverage: [UNIT_TEST_PERCENTAGE]
- Integration coverage: [INTEGRATION_PERCENTAGE]
- E2E coverage: [E2E_PERCENTAGE]
- Known gaps: [UNTESTED_AREAS]

**Testing Priorities:**
1. **Critical Path Testing**: [BUSINESS_CRITICAL_FLOWS]
2. **Risk Areas**: [HIGH_RISK_COMPONENTS]
3. **Recent Changes**: [NEW_CODE_NEEDING_TESTS]
4. **Bug-Prone Areas**: [HISTORICALLY_BUGGY_CODE]
```

### Test Requirements and Goals
```
**Coverage Targets:**
- Overall target: [TARGET_COVERAGE_PERCENTAGE]
- Unit tests: [UNIT_TARGET]%
- Integration tests: [INTEGRATION_TARGET]%
- E2E tests: [E2E_TARGET]%

**Test Quality Requirements:**
- Test execution time: [PERFORMANCE_LIMITS]
- Test reliability: [FLAKINESS_TOLERANCE]
- Test maintainability: [MAINTENANCE_STANDARDS]
- Documentation: [DOCUMENTATION_REQUIREMENTS]
```

---

## Complete Example Usage

```
I need to improve test coverage for our user authentication and authorization system.

**Context:**
- Project: FinanceApp - Personal Finance Management SaaS
- Language: TypeScript (Node.js backend) + React (frontend)
- Test framework: Jest + React Testing Library + Supertest
- Current coverage: 45% overall, 30% for auth module

**Testing Objectives:**
Our authentication system is critical for security and compliance but severely undertested. We need comprehensive test coverage before our security audit next month. The auth system handles user registration, login, password reset, multi-factor authentication, role-based permissions, and session management.

**Current Gaps:**
- No tests for MFA flow
- Password reset only has happy path tests
- Role-based access control has no test coverage
- Session handling edge cases untested
- API rate limiting not tested
- Error scenarios mostly untested

**Test Types Needed:**
- Unit tests for individual auth functions
- Integration tests for complete auth flows
- API endpoint tests with various scenarios
- Security tests for common attack vectors
- Performance tests for login under load

**Coverage Goals:**
- Target coverage: 90% for auth module
- Critical paths: 100% coverage for login, registration, MFA
- Security functions: 100% coverage with edge cases
- All API endpoints: Full request/response testing

**Critical Requirements:**
- Tests must run in under 30 seconds total
- Must test against real database (not just mocks)
- Must validate JWT token security
- Must test rate limiting and brute force protection
- Must verify GDPR compliance in user data handling

**Test Environment:**
- Use Docker containers for test databases
- Mock external services (email, SMS)
- Test data should be deterministic and isolated
- Parallel test execution where possible

This is critical for our upcoming security audit and user trust. Please take a deep breath and work through this systematically to ensure we have robust, reliable test coverage.

Please use the Structured Workflow MCP Server to guide this test development process.

Start by calling `mcp__structured-workflow__test_workflow` with this task description.
```

---

## Template Customization Guide

### Fill in these placeholders:

1. **[TARGET_CODE_OR_FEATURE]** - What you're testing
   - Example: "payment processing module"
   - Example: "user dashboard components"
   - Example: "API authentication system"

2. **[PROJECT_NAME]** - Your project identifier
   - Example: "Healthcare Portal v3"
   - Example: "E-commerce Marketplace"

3. **[PROGRAMMING_LANGUAGE]** - Primary language
   - Example: "Python/Django"
   - Example: "Java/Spring Boot"
   - Example: "JavaScript/React"

4. **[TESTING_FRAMEWORK]** - Your test tools
   - Example: "pytest + Mock + coverage.py"
   - Example: "JUnit + Mockito + TestContainers"
   - Example: "Jest + React Testing Library + MSW"

5. **[COVERAGE_PERCENTAGE]** - Current test state
   - Example: "25% overall, 60% for core business logic"
   - Example: "No tests currently exist"
   - Example: "80% but missing integration tests"

### Detailed Placeholder Examples:

**[SPECIFIC_TESTING_GOALS]:**
```
Good: "Achieve 90% line coverage for payment processing, test all error scenarios, validate security against OWASP top 10, ensure performance under 500ms response time"

Poor: "Add more tests"
```

**[TARGET_PERCENTAGE]:**
```
Specific ranges work better than exact numbers:
- "85-90% for business logic"
- "70-80% overall (focusing on quality over quantity)"
- "100% for security-critical functions"
```

**[CRITICAL_FUNCTIONALITY]:**
```
Good: "User authentication flow, payment processing, data export/import, admin permission checks"

Poor: "Important features"
```

### Test Type Categories:

**Unit Tests:**
- Individual functions/methods
- Class behavior
- Edge cases and error conditions
- Pure logic without dependencies

**Integration Tests:**
- Database interactions
- API integrations
- Service-to-service communication
- External dependency interactions

**End-to-End Tests:**
- Complete user workflows
- Critical business processes
- Cross-system functionality
- Real browser/mobile testing

**Performance Tests:**
- Load testing
- Stress testing
- Memory usage validation
- Response time verification

**Security Tests:**
- Input validation
- Authentication/authorization
- XSS/SQL injection prevention
- Rate limiting effectiveness

### Tips for Better Test Prompts:

- **Risk-based approach**: Focus on high-risk, high-value code first
- **Business context**: Explain why testing matters for the business
- **Specific scenarios**: List actual user scenarios to test
- **Error conditions**: Don't forget unhappy path testing
- **Performance criteria**: Include speed and reliability requirements
- **Maintenance consideration**: Request maintainable, readable tests

### Advanced Testing Strategies:

1. **Test pyramid focus**: "Follow testing pyramid - mostly unit tests, some integration, few E2E"
2. **Behavior-driven**: "Write tests that describe user behavior, not implementation details"
3. **Fast feedback**: "Prioritize fast-running tests for development workflow"
4. **Production parity**: "Tests should run against production-like environment"

### Platform Note:
Some AI platforms add prefixes to MCP tool names. If you get "Unknown tool" errors, try:
- `mcp_structured-workflow__test_workflow`
- `mcp7_structured-workflow__test_workflow`

Use `mcp__structured-workflow__discover_workflow_tools` to check available tools on your platform.
