import { handlePhaseOutput } from '../phaseOutput';
import { SessionManager } from '../../session/SessionManager';
import { Phase } from '../../types';

describe('PhaseOutput Tool', () => {
  let sm: SessionManager;

  beforeEach(() => {
    sm = new SessionManager();
  });

  test('returns error when no session', async () => {
    const res = await handlePhaseOutput({ phase: 'TEST' as Phase, output: {} }, sm);
    expect(res).toHaveProperty('error');
    expect(res.message).toMatch(/Start a workflow/);
  });

  test('records output and updates session', async () => {
    sm.startSession('task', undefined, 'test');
    const out = { example: true, errors: ['e1'] };
    const res = await handlePhaseOutput({ phase: 'LINT' as Phase, output: out }, sm);
    expect(res.recorded).toBe(true);
    expect(res.phase).toBe('LINT');
    const session = sm.getSession()!;
    // phaseOutputs recorded
    expect(session.phaseOutputs.has('LINT')).toBe(true);
    // completedPhases include LINT
    expect(session.completedPhases).toContain('LINT');
    // metrics updated for lint
    expect(session.metrics.lintIssuesFound).toBe(out.errors.length);
  });
});
