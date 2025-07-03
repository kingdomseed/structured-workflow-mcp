import { 
  SessionState, 
  Phase, 
  FileHistory, 
  WorkflowMetrics, 
  PhaseOutput,
  WorkflowConfiguration,
  ValidationState,
  EscalationContext 
} from '../types';
import { generateId } from '../utils/helpers';

export class SessionManager {
  private session: SessionState | null = null;

  startSession(taskDescription: string, workflowConfig?: WorkflowConfiguration, workflowType?: 'refactor' | 'feature' | 'test' | 'tdd'): SessionState {
    this.session = {
      id: generateId(),
      taskDescription,
      startedAt: Date.now(),
      currentPhase: 'PLANNING',
      completedPhases: [],
      phaseOutputs: new Map(),
      fileHistory: new Map(),
      metrics: this.initializeMetrics(),
      workflowConfig,
      iterationCounts: new Map(),
      validationStates: new Map(),
      workflowType
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

  // Workflow Configuration Management
  setWorkflowConfiguration(config: WorkflowConfiguration): void {
    if (!this.session) return;
    this.session.workflowConfig = config;
  }

  getWorkflowConfiguration(): WorkflowConfiguration | undefined {
    return this.session?.workflowConfig;
  }

  // Iteration Tracking
  incrementIterationCount(phase: Phase): number {
    if (!this.session) return 0;
    
    const currentCount = this.session.iterationCounts.get(phase) || 0;
    const newCount = currentCount + 1;
    this.session.iterationCounts.set(phase, newCount);
    
    return newCount;
  }

  getIterationCount(phase: Phase): number {
    if (!this.session) return 0;
    return this.session.iterationCounts.get(phase) || 0;
  }

  hasReachedIterationLimit(phase: Phase): boolean {
    if (!this.session?.workflowConfig) return false;
    
    const currentCount = this.getIterationCount(phase);
    const limits = this.session.workflowConfig.iterationLimits;
    
    switch (phase) {
      case 'TEST':
        return currentCount >= limits.TEST;
      case 'LINT':
        return currentCount >= limits.LINT;
      case 'ITERATE':
        return currentCount >= limits.ITERATE;
      default:
        return false;
    }
  }

  // Validation State Management
  setValidationState(phase: Phase, state: ValidationState): void {
    if (!this.session) return;
    this.session.validationStates.set(phase, state);
  }

  getValidationState(phase: Phase): ValidationState | undefined {
    if (!this.session) return undefined;
    return this.session.validationStates.get(phase);
  }

  isPhaseValidationComplete(phase: Phase): boolean {
    const state = this.getValidationState(phase);
    return state?.isComplete || false;
  }

  // Escalation Management
  shouldEscalateToUserInput(phase: Phase, error?: string): EscalationContext | null {
    if (!this.session?.workflowConfig) return null;
    
    const config = this.session.workflowConfig.escalationTriggers;
    const iterationCount = this.getIterationCount(phase);
    
    // Check iteration limit escalation
    if (config.escalateOnIterationLimit && this.hasReachedIterationLimit(phase)) {
      return {
        trigger: 'iteration_limit',
        failedPhase: phase,
        attemptCount: iterationCount,
        lastError: error,
        options: [
          `Continue with ${iterationCount} more ${phase} iterations`,
          'Skip to next phase',
          'Modify requirements',
          'Request human intervention'
        ],
        context: {
          currentLimits: this.session.workflowConfig.iterationLimits,
          phase,
          iterationCount
        }
      };
    }

    // Check validation failure escalation
    const validationState = this.getValidationState(phase);
    if (config.escalateOnErrors && validationState && validationState.attempts >= 3) {
      return {
        trigger: 'validation_failure',
        failedPhase: phase,
        attemptCount: validationState.attempts,
        lastError: error,
        options: [
          'Modify validation criteria',
          'Skip validation for this phase',
          'Request human review',
          'Reset and try again'
        ],
        context: {
          validationState,
          phase
        }
      };
    }

    return null;
  }

  // Check if user checkpoint is required
  requiresUserCheckpoint(phase: Phase): boolean {
    if (!this.session?.workflowConfig) return false;
    
    const checkpoints = this.session.workflowConfig.userCheckpoints;
    
    // Check specific checkpoint configurations
    if (checkpoints.beforeMajorChanges && phase === 'WRITE_OR_REFACTOR') {
      return true;
    }
    
    if (checkpoints.afterFailedIterations && this.hasReachedIterationLimit(phase)) {
      return true;
    }
    
    if (checkpoints.beforeFinalPresentation && phase === 'PRESENT') {
      return true;
    }
    
    if (checkpoints.customCheckpoints?.includes(phase)) {
      return true;
    }
    
    return false;
  }

  // Get workflow progress summary
  getWorkflowProgress(): any {
    if (!this.session) return null;
    
    const config = this.session.workflowConfig;
    const selectedPhases = config?.selectedPhases || ['AUDIT', 'INVENTORY', 'WRITE_OR_REFACTOR', 'TEST', 'LINT', 'PRESENT'];
    
    return {
      sessionId: this.session.id,
      currentPhase: this.session.currentPhase,
      selectedPhases,
      completedPhases: this.session.completedPhases,
      totalPhases: selectedPhases.length,
      progressPercentage: Math.round((this.session.completedPhases.length / selectedPhases.length) * 100),
      iterationCounts: Object.fromEntries(this.session.iterationCounts),
      validationStates: Object.fromEntries(
        Array.from(this.session.validationStates.entries()).map(([phase, state]) => [
          phase, 
          {
            isComplete: state.isComplete,
            attempts: state.attempts,
            lastValidatedAt: new Date(state.lastValidatedAt).toISOString()
          }
        ])
      ),
      timeElapsed: Date.now() - this.session.startedAt,
      nextSuggestedPhase: this.getNextSuggestedPhase()
    };
  }

  private getNextSuggestedPhase(): Phase | null {
    if (!this.session?.workflowConfig) return null;
    
    const selectedPhases = this.session.workflowConfig.selectedPhases;
    const currentIndex = selectedPhases.indexOf(this.session.currentPhase);
    
    if (currentIndex === -1 || currentIndex === selectedPhases.length - 1) {
      return null;
    }
    
    return selectedPhases[currentIndex + 1];
  }
}