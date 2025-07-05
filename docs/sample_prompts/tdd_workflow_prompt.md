# Test-Driven Development (TDD) Workflow Sample Prompt

## Core Instructions

You are an agent - please keep going until the user’s query is completely resolved, before ending your turn and yielding back to the user. Only terminate your turn when you are sure that the problem is solved.

If you are not sure about file content or codebase structure pertaining to the user’s request, use your tools to read files and gather the relevant information: do NOT guess or make up an answer.

You MUST plan extensively before each function call, and reflect extensively on the outcomes of the previous function calls. DO NOT do this entire process by making function calls only, as this can impair your ability to solve the problem and think insightfully.

## Quick Copy-Paste Template

```
I want to implement [FEATURE_OR_FUNCTION] using Test-Driven Development methodology.

**Context:**
- Project: [PROJECT_NAME]
- Language: [PROGRAMMING_LANGUAGE]
- Test framework: [TESTING_FRAMEWORK]
- Feature scope: [FEATURE_BOUNDARIES]

**TDD Requirements:**
[DETAILED_FEATURE_SPECIFICATION]

**Acceptance Criteria:**
- [TESTABLE_CRITERIA_1]
- [TESTABLE_CRITERIA_2]
- [TESTABLE_CRITERIA_3]

**Technical Constraints:**
- [IMPLEMENTATION_CONSTRAINTS]
- [PERFORMANCE_REQUIREMENTS]

Please follow strict Red-Green-Refactor TDD cycles. Write the test first, make it pass, then refactor.

Start by calling `mcp__structured-workflow__tdd_workflow` with this task description.
```

---

## Best Practices Template (Detailed)

### TDD Context and Setup
```
**Project Overview:**
- Application: [DETAILED_APP_DESCRIPTION]
- Architecture: [SYSTEM_DESIGN_PATTERN]
- Existing codebase: [CURRENT_STATE_DESCRIPTION]
- TDD experience level: [TEAM_TDD_MATURITY]

**Test Environment:**
- Primary test framework: [MAIN_TESTING_TOOL]
- Assertion library: [ASSERTION_FRAMEWORK]
- Mocking framework: [MOCKING_SOLUTION]
- Test runner: [TEST_EXECUTION_TOOL]
- CI integration: [CONTINUOUS_INTEGRATION_SETUP]
```

### Feature Specification for TDD
```
**Feature Definition:**
- Feature name: [CLEAR_FEATURE_NAME]
- User story: As [USER_TYPE], I want [DESIRED_CAPABILITY] so that [BUSINESS_VALUE]
- Epic/parent feature: [LARGER_CONTEXT]
- Dependencies: [REQUIRED_COMPONENTS]

**Behavior Specification:**
Given [INITIAL_STATE]
When [ACTION_OR_EVENT]
Then [EXPECTED_OUTCOME]

**Edge Cases to Consider:**
- [EDGE_CASE_1_DESCRIPTION]
- [EDGE_CASE_2_DESCRIPTION]
- [ERROR_CONDITION_HANDLING]
```

### TDD Cycle Requirements
```
**Red Phase Requirements:**
- Write minimal failing test first
- Test should describe desired behavior
- Test names should be descriptive
- One test per specific behavior

**Green Phase Requirements:**
- Write simplest code to make test pass
- No premature optimization
- Focus on making test green quickly
- Add minimal production code

**Refactor Phase Requirements:**
- Improve code quality without changing behavior
- Remove duplication
- Improve naming and structure
- Ensure all tests still pass
```

---

## Complete Example Usage

```
I want to implement a shopping cart calculation system using Test-Driven Development methodology.

**Context:**
- Project: E-commerce Platform - Order Management Service
- Language: TypeScript with Node.js
- Test framework: Jest with TypeScript support
- Feature scope: Cart totals, discounts, tax calculation, shipping costs

**TDD Requirements:**
Implement a ShoppingCartCalculator class that handles:
1. Adding/removing items with quantities and prices
2. Applying percentage-based discount codes
3. Calculating tax based on customer location
4. Adding shipping costs based on cart weight and destination
5. Handling free shipping thresholds
6. Supporting multiple currency formats

The calculator must be pure (no side effects), easily testable, and handle edge cases gracefully.

**Acceptance Criteria:**
- Cart can calculate subtotal for multiple items with quantities
- Discount codes apply correctly and validate expiration dates
- Tax calculation supports different rates for different regions
- Shipping costs calculated based on weight tiers
- Free shipping applies automatically when threshold met
- Currency formatting matches locale requirements
- Invalid inputs throw descriptive errors
- Calculations are accurate to 2 decimal places
- Performance handles 100+ items without lag

**Technical Constraints:**
- Must be framework-agnostic (pure TypeScript classes)
- No external API calls during calculation
- All business rules configurable via dependency injection
- Must support future expansion for complex discount rules
- Thread-safe for concurrent usage
- Memory efficient for large carts

**Business Rules:**
- Tax rate: 8.25% for California, 6.5% for Texas, 0% for Montana
- Shipping: $5 base + $2 per pound, free over $75
- Discounts: Max 30% off, cannot combine multiple codes
- Currency: USD with proper comma/decimal formatting

**Expected TDD Approach:**
1. Start with simplest test: "should calculate subtotal for single item"
2. Progress to: "should handle quantities correctly"  
3. Build up to: "should apply discounts properly"
4. Add complexity: "should calculate tax by region"
5. Finish with: "should handle all features together"

This is a core business feature that needs bulletproof reliability. Please follow strict Red-Green-Refactor cycles and take time to write meaningful test names that describe the business behavior.

Please follow strict Red-Green-Refactor TDD cycles. Write the test first, make it pass, then refactor.

Start by calling `mcp__structured-workflow__tdd_workflow` with this task description.
```

---

## Template Customization Guide

### Fill in these placeholders:

1. **[FEATURE_OR_FUNCTION]** - What you're building with TDD
   - Example: "user authentication service"
   - Example: "file upload validation system"
   - Example: "data transformation pipeline"

2. **[PROJECT_NAME]** - Your project context
   - Example: "Healthcare Records System"
   - Example: "Mobile Banking App"

3. **[PROGRAMMING_LANGUAGE]** - Development language
   - Example: "Python with pytest"
   - Example: "Java with JUnit 5"
   - Example: "C# with xUnit"

4. **[TESTING_FRAMEWORK]** - TDD tools
   - Example: "pytest + pytest-mock + coverage"
   - Example: "Jest + @testing-library + MSW"
   - Example: "RSpec + FactoryBot + WebMock"

5. **[FEATURE_BOUNDARIES]** - Scope limits
   - Example: "core calculation logic only, no UI components"
   - Example: "API layer only, database integration separate"

### TDD-Specific Guidance:

**[TESTABLE_CRITERIA_1], [TESTABLE_CRITERIA_2], [TESTABLE_CRITERIA_3]:**
```
Good TDD Criteria:
- "Function returns correct tax amount for California addresses"  
- "Throws InvalidEmailException when email format is invalid"
- "Processes 1000 records in under 2 seconds"

Poor Criteria:
- "Works correctly"
- "Handles errors"
- "Is fast enough"
```

**[DETAILED_FEATURE_SPECIFICATION]:**
Focus on behaviors, not implementation:
```
Good: "When user submits valid payment info, system charges card and sends confirmation email"

Poor: "Create PaymentProcessor class with processPayment method"
```

### TDD Best Practices to Emphasize:

**Test Naming Conventions:**
- `should_calculate_correct_total_when_multiple_items_added`
- `should_throw_exception_when_discount_code_expired`
- `should_apply_free_shipping_when_total_exceeds_threshold`

**Red-Green-Refactor Cycle:**
1. **Red**: Write a failing test that describes one specific behavior
2. **Green**: Write minimal code to make that test pass
3. **Refactor**: Improve code quality while keeping tests green

**TDD Mindset Phrases:**
- "Write the test first, always"
- "Make it work, then make it right"
- "Let the tests drive the design"
- "One failing test at a time"
- "Refactor fearlessly with test coverage"

### Advanced TDD Techniques:

**Triangulation:**
"Write multiple test cases to force generalization of the solution"

**Fake It Till You Make It:**
"Start with hardcoded values, then gradually make them dynamic"

**Test Doubles:**
"Use mocks, stubs, and spies to isolate units under test"

**Mutation Testing:**
"Verify test quality by introducing bugs and ensuring tests catch them"

### Common TDD Antipatterns to Avoid:

❌ Writing tests after implementation
❌ Testing implementation details instead of behavior  
❌ Writing too many tests at once
❌ Skipping the refactor phase
❌ Making tests too complex

### Platform Note:
Some AI platforms add prefixes to MCP tool names. If you get "Unknown tool" errors, try:
- `mcp_structured-workflow__tdd_workflow`
- `mcp7_structured-workflow__tdd_workflow`

Use `mcp__structured-workflow__discover_workflow_tools` to check available tools on your platform.

### TDD Success Indicators:
- Tests are written before production code
- Each test focuses on one specific behavior
- Test names clearly describe expected behavior
- Red-Green-Refactor cycles are followed strictly
- Code emerges from test requirements, not preconceived design
