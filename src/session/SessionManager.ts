import { SessionState, Phase, FileHistory, WorkflowMetrics, PhaseOutput } from '../types';
import { generateId } from '../utils/helpers';

export class SessionManager {
  private session: SessionState | null = null;

  startSession(taskDescription: string): SessionState {
    this.session = {
      id: generateId(),
      taskDescription,
      startedAt: Date.now(),
      currentPhase: 'PLANNING',
      completedPhases: [],
      phaseOutputs: new Map(),
      fileHistory: new Map(),
      metrics: this.initializeMetrics()
    };
    return this.session;
  }

  getSession(): SessionState | null {
    return this.session;
  }

  endSession(): void {
    this.session = null;
  }

  updatePhase(phase: Phase): void {
    if (!this.session) return;
    
    // Mark current phase as completed if it's not already
    if (this.session.currentPhase !== phase && 
        !this.session.completedPhases.includes(this.session.currentPhase)) {
      this.session.completedPhases.push(this.session.currentPhase);
    }
    
    this.session.currentPhase = phase;
    this.session.metrics.phasesCompleted = this.session.completedPhases.length;
  }

  recordPhaseOutput(phase: Phase, output: any): void {
    if (!this.session) return;
    
    const phaseOutput: PhaseOutput = {
      phase,
      completedAt: Date.now(),
      duration: Date.now() - this.session.startedAt,
      output
    };
    
    this.session.phaseOutputs.set(phase, phaseOutput);
  }

  recordFileRead(filePath: string): void {
    if (!this.session) return;
    
    const existing = this.session.fileHistory.get(filePath) || {
      hasBeenRead: false,
      hasBeenModified: false
    };
    
    this.session.fileHistory.set(filePath, {
      ...existing,
      hasBeenRead: true,
      firstReadAt: existing.firstReadAt || Date.now()
    });
    
    this.session.metrics.filesAnalyzed++;
  }

  recordFileModification(filePath: string): void {
    if (!this.session) return;
    
    const existing = this.session.fileHistory.get(filePath) || {
      hasBeenRead: false,
      hasBeenModified: false
    };
    
    this.session.fileHistory.set(filePath, {
      ...existing,
      hasBeenModified: true,
      lastModifiedAt: Date.now()
    });
    
    if (!existing.hasBeenModified) {
      this.session.metrics.filesModified++;
    }
  }

  getFileHistory(filePath: string): FileHistory {
    if (!this.session) {
      return { hasBeenRead: false, hasBeenModified: false };
    }
    
    return this.session.fileHistory.get(filePath) || {
      hasBeenRead: false,
      hasBeenModified: false
    };
  }

  updateMetrics(updates: Partial<WorkflowMetrics>): void {
    if (!this.session) return;
    
    this.session.metrics = {
      ...this.session.metrics,
      ...updates
    };
  }

  private initializeMetrics(): WorkflowMetrics {
    return {
      filesAnalyzed: 0,
      filesModified: 0,
      lintIssuesFound: 0,
      lintIssuesFixed: 0,
      phasesCompleted: 0
    };
  }
}