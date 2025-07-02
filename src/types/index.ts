export type Phase = 
  | 'PLANNING'
  | 'AUDIT'
  | 'INVENTORY'
  | 'COMPARE_ANALYZE'
  | 'QUESTION'
  | 'DETERMINE_PLAN'
  | 'WRITE_REFACTOR'
  | 'LINT'
  | 'ITERATE'
  | 'PRESENT';

export interface FileHistory {
  hasBeenRead: boolean;
  hasBeenModified: boolean;
  firstReadAt?: number;
  lastModifiedAt?: number;
}

export interface WorkflowMetrics {
  filesAnalyzed: number;
  filesModified: number;
  lintIssuesFound: number;
  lintIssuesFixed: number;
  phasesCompleted: number;
  totalDuration?: number;
}

export interface PhaseOutput {
  phase: Phase;
  completedAt: number;
  duration: number;
  output: any;
}

export interface SessionState {
  id: string;
  taskDescription: string;
  startedAt: number;
  currentPhase: Phase;
  completedPhases: Phase[];
  phaseOutputs: Map<Phase, PhaseOutput>;
  fileHistory: Map<string, FileHistory>;
  metrics: WorkflowMetrics;
}

export interface ToolContext {
  startDate: string;
  sessionId?: string;
}

export interface ValidationResult {
  allowed: boolean;
  error?: string;
  reason?: string;
  resolution?: string;
  currentPhase?: Phase;
  reminder?: string;
}

export interface PhaseGuidance {
  phase: Phase;
  objective: string;
  instructions: string[];
  suggestedApproach?: string[];
  importantNotes?: string[];
  expectedOutput: Record<string, string>;
  nextPhase?: string;
  prerequisites?: {
    completed: Phase[];
    warning?: string | null;
  };
  bestPractices?: string[];
}