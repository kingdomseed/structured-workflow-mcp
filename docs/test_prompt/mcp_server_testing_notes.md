# MCP Server Testing Notes

## Test Evaluation Criteria

This document outlines what to observe when testing the Structured Workflow MCP Server with the refactor-test prompt.

### 1. Tool Discovery and Usage

**Expected Behavior:**
- AI should discover and use MCP workflow tools starting with `mcp__structured-workflow__refactor_workflow`
- AI should follow the phase progression naturally
- AI should request guidance for each phase

**What to Watch For:**
- Does the AI find and use the MCP tools?
- Does it follow the suggested workflow?
- Does it skip phases or try to jump ahead?

### 2. Phase Execution Quality

#### AUDIT Phase
- Should read files without modifying them
- Should identify all major code smells and SOLID violations
- Should document findings comprehensively

#### INVENTORY Phase
- Should create a detailed list of all violations
- Should categorize issues by SOLID principle
- Should prioritize refactoring tasks

#### COMPARE/ANALYZE Phase
- Should consider multiple refactoring approaches
- Should evaluate trade-offs
- Should justify chosen approach

#### WRITE/REFACTOR Phase
- Should implement clean, separated classes
- Should use proper abstractions
- Should maintain all functionality

### 3. SOLID Violations to Identify

The test UserService contains these violations:

**Single Responsibility Violations:**
- User management
- Authentication
- Logging
- Email service
- Notification system
- Data export/import
- Report generation
- Database operations
- Utility functions

**Open/Closed Violations:**
- Hardcoded email configuration
- Hardcoded export formats
- Hardcoded report templates

**Liskov Substitution Violations:**
- `getUserById` method with inconsistent behavior

**Interface Segregation Violations:**
- Admin functions mixed with user functions
- Unrelated utility methods

**Dependency Inversion Violations:**
- Direct dependency on fs module
- Direct dependency on nodemailer
- Hardcoded database operations

### 4. Expected Refactoring Outcomes

A successful refactoring should produce:

1. **Separate Services/Classes:**
   - UserRepository (data access)
   - AuthenticationService
   - Logger/ILogger interface
   - EmailService/IEmailService interface
   - NotificationService
   - DataExportService
   - ReportGenerator
   - PasswordHasher

2. **Proper Abstractions:**
   - Interfaces for all services
   - Dependency injection in constructors
   - Configuration objects instead of hardcoding

3. **Clean Architecture:**
   - Clear separation of concerns
   - Testable components
   - Extensible design

### 5. Red Flags

Watch for these anti-patterns:
- Skipping the AUDIT phase and jumping to refactoring
- Not using the MCP workflow tools
- Modifying the original files instead of creating new ones
- Incomplete refactoring (fixing some but not all violations)
- Breaking existing functionality

### 6. Success Metrics

Rate the MCP server's performance on:
1. **Guidance Quality** (1-5): How helpful were the phase instructions?
2. **Workflow Flow** (1-5): How smooth was the phase progression?
3. **Violation Detection** (1-5): How well did it help identify issues?
4. **Refactoring Quality** (1-5): How good was the final refactored code?
5. **User Experience** (1-5): How easy was it to follow the guidance?

### 7. Testing Variations

Consider testing with:
- Different AI models (Claude, Cursor, Windsurf)
- Skipping phases intentionally
- Trying to modify files before reading
- Requesting help mid-workflow
- Starting over after partial completion

## Reporting Issues

If the MCP server fails to guide properly, note:
- Which phase failed
- What guidance was missing or unclear
- What the AI did instead
- How it could be improved

This test is designed to validate that the MCP server successfully guides AI assistants through professional refactoring workflows while maintaining AI autonomy and tool flexibility.