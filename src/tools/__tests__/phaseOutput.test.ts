import { handlePhaseOutput } from '../phaseOutput';
import { SessionManager } from '../../session/SessionManager';
import { Phase } from '../../types';

describe('PhaseOutput Tool', () => {
  let sm: SessionManager;

  beforeEach(() => {
    sm = new SessionManager();
  });

  test('returns error when no session', async () => {
    const res = await handlePhaseOutput({ 
      phase: 'TEST' as Phase, 
      output: {},
      outputArtifacts: [{
        path: '/test/output.md',
        format: 'markdown',
        description: 'Test output',
        content: 'Test results here'
      }]
    }, sm);
    expect(res).toHaveProperty('error');
    expect(res.message).toMatch(/Start a workflow/);
  });

  test('records output and updates session', async () => {
    sm.startSession('task', undefined, 'test');
    const out = { example: true, errors: ['e1'] };
    const res = await handlePhaseOutput({ 
      phase: 'LINT' as Phase, 
      output: out,
      outputArtifacts: [{
        path: '/test/lint-results.json',
        format: 'json',
        description: 'Lint issues and errors found',
        content: JSON.stringify({ errors: ['error1'], warnings: ['warning1'] })
      }]
    }, sm);
    expect(res.recorded).toBe(true);
    expect(res.phase).toBe('LINT');
    expect(res.artifactsValidated).toBe(1);
    const session = sm.getSession()!;
    // phaseOutputs recorded
    expect(session.phaseOutputs.has('LINT')).toBe(true);
    // completedPhases include LINT
    expect(session.completedPhases).toContain('LINT');
    // metrics updated for lint
    expect(session.metrics.lintIssuesFound).toBe(out.errors.length);
  });

  test('accepts JSON response artifacts (not file-based)', async () => {
    sm.startSession('task', undefined, 'test');
    const analysisData = { 
      dependencies: ['react', 'lodash'], 
      issues: ['complex function', 'no tests'],
      recommendations: ['split function', 'add tests']
    };
    
    const res = await handlePhaseOutput({ 
      phase: 'AUDIT_INVENTORY' as Phase, 
      output: { summary: 'Analysis complete' },
      outputArtifacts: [{
        path: 'audit-analysis-results',
        format: 'json',
        description: 'Structured analysis results provided in response',
        content: JSON.stringify(analysisData)
      }]
    }, sm);
    
    expect(res.recorded).toBe(true);
    expect(res.phase).toBe('AUDIT_INVENTORY');
    expect(res.artifactsValidated).toBe(1);
    expect(res.artifacts).toBeDefined();
    // With new file saving functionality, path is now the actual saved file path
    expect(res.artifacts![0].path).toContain('structured-workflow');
    expect(res.artifacts![0].path).toContain('01-audit-inventory');
    expect(res.artifacts![0].path).toContain('.json');
    expect(res.artifacts![0].format).toBe('json');
  });
});
