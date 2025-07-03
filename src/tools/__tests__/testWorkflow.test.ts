import { handleTestWorkflow } from '../testWorkflow';
import { SessionManager } from '../../session/SessionManager';

describe('TestWorkflow Tool', () => {
  let sm: SessionManager;
  beforeEach(() => {
    sm = new SessionManager();
  });

  test('handleTestWorkflow returns expected structure', async () => {
    const res = await handleTestWorkflow(
      { task: 'Do tests', context: { targetFiles: ['src/index.ts'] } },
      sm
    );
    expect(res).toHaveProperty('sessionId');
    expect(res.workflowType).toBe('test');
    expect(res.task).toBe('Do tests');
    expect(Array.isArray(res.phases)).toBe(true);
    expect(res.availableTools.workflowTools).toContain('test_guidance - Guidance for TEST phase');
  });
});
