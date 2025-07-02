# Quick Reference: MCP Server Test

## Quick Start
```
1. Navigate to: /refactor-test/src/UserService.ts
2. Use tool: mcp__structured-workflow__refactor_workflow
3. Follow the workflow phases
4. Create refactored code in: /refactor-test/refactor-test-attempt/
```

## Key MCP Tools to Use
- `mcp__structured-workflow__refactor_workflow` - Start here
- `mcp__structured-workflow__audit_inventory_guidance` - For analysis phase
- `mcp__structured-workflow__refactor_guidance` - For implementation
- `mcp__structured-workflow__workflow_status` - Check progress

## SOLID Checklist
- [ ] Single Responsibility: One class, one purpose
- [ ] Open/Closed: Extensible without modification
- [ ] Liskov Substitution: Consistent behavior
- [ ] Interface Segregation: No forced dependencies
- [ ] Dependency Inversion: Depend on abstractions

## File Structure
```
DO NOT MODIFY:
/refactor-test/src/UserService.ts

CREATE HERE:
/refactor-test/refactor-test-attempt/src/
  ├── services/
  ├── repositories/
  ├── interfaces/
  └── ...
```

## Remember
- Let the MCP server guide you
- Follow all workflow phases
- Don't skip ahead
- Document your findings
- Test the refactored code