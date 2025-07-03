import { handleDiscoverWorkflowTools } from '../discoverWorkflowTools';

describe('DiscoverWorkflowTools Tool', () => {
  test('returns expected tool categories and entries', async () => {
    const res = await handleDiscoverWorkflowTools();
    expect(res).toHaveProperty('workflowTypes');
    expect(res).toHaveProperty('phaseGuidanceTools');
    expect(res).toHaveProperty('managementTools');
    expect(Array.isArray(res.workflowTypes.workflows)).toBe(true);
    const names = res.workflowTypes.workflows.map(w => w.name);
    expect(names).toContain('test_workflow');
  });
});
