import { Phase } from '../types';

export function generateId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function isModificationAction(action: string): boolean {
  const modificationKeywords = [
    'edit', 'write', 'modify', 'update', 'change', 
    'delete', 'remove', 'create', 'add', 'append',
    'replace', 'alter', 'fix', 'refactor'
  ];
  
  const actionLower = action.toLowerCase();
  return modificationKeywords.some(keyword => actionLower.includes(keyword));
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

export function getNextPhase(currentPhase: Phase): Phase | null {
  const phaseOrder: Phase[] = [
    'PLANNING',
    'AUDIT_INVENTORY',
    'COMPARE_ANALYZE',
    'QUESTION_DETERMINE',
    'WRITE_OR_REFACTOR',
    'TEST',
    'LINT',
    'ITERATE',
    'PRESENT'
  ];
  
  const currentIndex = phaseOrder.indexOf(currentPhase);
  if (currentIndex === -1 || currentIndex === phaseOrder.length - 1) {
    return null;
  }
  
  return phaseOrder[currentIndex + 1];
}

export function generateNextStepSuggestions(_completedPhases: Phase[], currentPhase: Phase): string[] {
  const suggestions: string[] = [];
  
  const phaseGuidanceMap: Record<Phase, string> = {
    PLANNING: 'Use audit_inventory_guidance to begin understanding and cataloging',
    SETUP: 'Use audit_inventory_guidance to begin analyzing the codebase',
    AUDIT_INVENTORY: 'Use compare_analyze_guidance to evaluate different approaches',
    COMPARE_ANALYZE: 'Use question_determine_guidance to clarify and finalize your strategy',
    QUESTION_DETERMINE: 'Use refactor_guidance to start implementing changes',
    WRITE_OR_REFACTOR: 'Use test_guidance to verify functionality after changes',
    TEST: 'Use lint_guidance to verify code quality',
    LINT: 'Use iterate_guidance if issues were found, or present_guidance if ready',
    ITERATE: 'Use lint_guidance again to verify fixes, or present_guidance when done',
    PRESENT: 'Your workflow is complete! Review the summary and share results',
    USER_INPUT_REQUIRED: 'Provide user input to resolve escalation and continue workflow'
  };
  
  const nextPhase = getNextPhase(currentPhase);
  if (nextPhase && phaseGuidanceMap[currentPhase]) {
    suggestions.push(phaseGuidanceMap[currentPhase]);
  }
  
  // Add reminders based on current phase
  if (currentPhase === 'WRITE_OR_REFACTOR') {
    suggestions.push('Remember to read files before modifying them');
    suggestions.push('Test your changes incrementally');
  }
  
  if (currentPhase === 'LINT' || currentPhase === 'ITERATE') {
    suggestions.push('Run all relevant linters and type checkers');
    suggestions.push('Fix issues systematically, one at a time');
  }
  
  return suggestions;
}