export type Phase = 
  | 'PLANNING'
  | 'AUDIT_INVENTORY'
  | 'COMPARE_ANALYZE'
  | 'QUESTION_DETERMINE'
  | 'WRITE_REFACTOR'
  | 'TEST'
  | 'LINT'
  | 'ITERATE'
  | 'PRESENT'
  | 'USER_INPUT_REQUIRED';

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
  workflowConfig?: WorkflowConfiguration;
  iterationCounts: Map<Phase, number>;
  validationStates: Map<Phase, ValidationState>;
  workflowType?: 'refactor' | 'feature' | 'test' | 'tdd';
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
  validationCriteria?: ValidationCriteria;
  requiredOutputFiles?: OutputFileInstruction[];
  blockingMessages?: string[];
  directiveInstructions?: string[];
}

export interface WorkflowConfiguration {
  selectedPhases: Phase[];
  iterationLimits: IterationLimits;
  outputPreferences: OutputPreferences;
  userCheckpoints: UserCheckpointConfig;
  escalationTriggers: EscalationConfig;
}

export interface IterationLimits {
  TEST: number;
  LINT: number;
  ITERATE: number;
  maxTotalDuration?: string;
  maxPhaseAttempts?: number;
}

export interface OutputPreferences {
  formats: ('markdown' | 'json')[];
  realTimeUpdates: boolean;
  generateDiagrams: boolean;
  includeCodeSnippets: boolean;
  outputDirectory: string;
  createProgressReport: boolean;
  createPhaseArtifacts: boolean;
}

export interface UserCheckpointConfig {
  beforeMajorChanges: boolean;
  afterFailedIterations: boolean;
  beforeFinalPresentation: boolean;
  customCheckpoints?: Phase[];
}

export interface EscalationConfig {
  enableUserInput: boolean;
  escalateOnIterationLimit: boolean;
  escalateOnErrors: boolean;
  escalateOnTime: boolean;
}

export interface ValidationCriteria {
  minimumRequirements: Record<string, number | string | boolean>;
  blockingMessages: string[];
  expectedFiles: string[];
  selfCheckQuestions: string[];
  completionCriteria: string[];
  cannotProceedUntil: string[];
}

export interface ValidationState {
  isComplete: boolean;
  completedRequirements: string[];
  failedRequirements: string[];
  lastValidatedAt: number;
  attempts: number;
}

export interface OutputFileInstruction {
  path: string;
  description: string;
  required: boolean;
  format: 'markdown' | 'json' | 'text';
  template?: string;
  validationRules?: string[];
}

export interface EscalationContext {
  trigger: 'iteration_limit' | 'user_checkpoint' | 'validation_failure' | 'time_limit';
  failedPhase: Phase;
  attemptCount: number;
  lastError?: string;
  options: string[];
  context: Record<string, any>;
}