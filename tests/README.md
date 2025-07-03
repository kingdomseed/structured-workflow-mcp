# Test Suite Overview

This project uses Jest for unit tests under various `__tests__` folders. Below is a summary of existing tests and their focus.

## src/tools/__tests__

- **phaseOutput.test.ts**
  - Verifies `handlePhaseOutput` behavior:
    - Error when no session active.
    - Successful phase output recording updates metrics correctly.

- **testWorkflow.test.ts**
  - Tests `handleTestWorkflow` tool:
    - Returns correctly structured workflow test response with expected properties.

- **workflowStatus.test.ts**
  - Covers `handleWorkflowStatus`:
    - Error when no session.
    - Complete session status includes phase outputs, metrics, file ops, next steps.

- **discoverWorkflowTools.test.ts**
  - Smoke-test for `handleDiscoverWorkflowTools`:
    - Ensures tool categories and workflow names are present.

- **validation.test.ts**
  - Validates safety and phase-completion checks:
    - `handleValidateAction`: Enforces read-before-write and records file history.
    - `handleValidatePhaseCompletion`: Errors without session; verifies minimal requirement pass.

## src/session/__tests__

- **SessionManager.test.ts**
  - Exercises `SessionManager` class:
    - Session lifecycle (start/end).
    - Phase updates and validation state management.
    - File read/modify history tracking.
    - Metrics recording and escalation logic.


---

*Additions:* As our test suite grows, update this README to reflect new tests and their purposes.
