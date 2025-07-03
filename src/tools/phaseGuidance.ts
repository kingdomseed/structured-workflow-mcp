import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SessionManager } from '../session/SessionManager';
import { PhaseGuidance } from '../types';

export function createPhaseGuidanceTools(): Tool[] {
  const phaseTools: Tool[] = [
    {
      name: 'audit_inventory_guidance',
      description: 'Get guidance for the AUDIT_INVENTORY phase - analyze code and catalog changes',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'compare_analyze_guidance',
      description: 'Get guidance for the COMPARE/ANALYZE phase - evaluating approaches',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'question_determine_guidance',
      description: 'Get guidance for the QUESTION_DETERMINE phase - clarify and finalize plan',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'refactor_guidance',
      description: 'Get guidance for the WRITE/REFACTOR phase - implementing changes',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'lint_guidance',
      description: 'Get guidance for the LINT phase - verifying code quality',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'iterate_guidance',
      description: 'Get guidance for the ITERATE phase - fixing issues',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'present_guidance',
      description: 'Get guidance for the PRESENT phase - summarizing work',
      inputSchema: { type: 'object', properties: {} }
    }
  ];

  return phaseTools;
}

export async function handlePhaseGuidance(
  phaseName: string,
  sessionManager: SessionManager
): Promise<PhaseGuidance> {
  const session = sessionManager.getSession();
  const isDirectiveMode = session?.workflowConfig !== undefined;
  const outputDir = session?.workflowConfig?.outputPreferences.outputDirectory || 'workflow-output';
  
  // Route to appropriate guidance based on mode
  if (isDirectiveMode) {
    return getDirectiveGuidance(phaseName, sessionManager, outputDir);
  } else {
    return getSuggestiveGuidance(phaseName, sessionManager);
  }
}

function getSuggestiveGuidance(
  phaseName: string,
  sessionManager: SessionManager
): PhaseGuidance {
  const session = sessionManager.getSession();
  
  // Platform prefix note to be added to all guidance
  const platformPrefixNote = '\n\n**IMPORTANT**: If you get "Unknown tool" errors when calling the next phase tool, your platform may require a prefix (e.g., mcp7_[tool_name] or mcp_[tool_name]). Check how other MCP tools are named in your environment.';
  
  const phaseGuidanceMap: Record<string, PhaseGuidance> = {
    audit_inventory_guidance: {
      phase: 'AUDIT_INVENTORY',
      objective: 'Thoroughly analyze the codebase AND catalog all required changes',
      instructions: [
        '--- AUDIT PHASE (Analysis) ---',
        'Use your file reading tools to examine all relevant code',
        'Use your search tools to find patterns, dependencies, and references',
        'Map out the current implementation and data flow',
        'Identify code quality issues and improvement opportunities',
        '--- INVENTORY PHASE (Cataloging) ---',
        'List every file that needs to be modified',
        'For each file, specify exactly what changes are needed',
        'Assess the impact and risks of each change',
        'Create a priority order for implementation',
        'DO NOT modify any files during this combined phase'
      ],
      suggestedApproach: [
        'AUDIT: Start by reading the main files mentioned in the task',
        'AUDIT: Search for all references to key functions or classes',
        'AUDIT: Trace the flow of data through the system',
        'AUDIT: Document dependencies and potential impact areas',
        'INVENTORY: Based on your audit, list all required changes',
        'INVENTORY: Group related changes together',
        'INVENTORY: Identify which changes have dependencies',
        'INVENTORY: Consider what could break and plan accordingly'
      ],
      importantNotes: [
        'This combined phase gives you a complete understanding before any changes',
        'The audit informs the inventory - they work together',
        'Take detailed notes using any format (text, diagrams, etc.)',
        'The more thorough your analysis and cataloging, the smoother the implementation',
        '⚠️ CRITICAL: You MUST create actual documentation artifacts (like analysis.md, plan.json, etc.)',
        '⚠️ CRITICAL: When using phase_output, you MUST provide the outputArtifacts array with actual output content (files OR structured JSON)'
      ],
      expectedOutput: {
        // Audit outputs
        filesAnalyzed: 'Complete list of files examined',
        dependencies: 'Map of dependencies and imports',
        currentFlow: 'How the current implementation works',
        issues: 'Any problems or code smells identified',
        // Inventory outputs
        changesList: 'Detailed list of all modifications needed',
        fileToChangesMap: 'Map of files to specific changes',
        impactAnalysis: 'What each change affects',
        risks: 'Potential issues or breaking changes',
        priority: 'Suggested order of implementation'
      },
      nextPhase: 'After completing analysis and cataloging, use compare_analyze_guidance. REMEMBER: You cannot proceed to the next phase without calling phase_output with actual outputArtifacts (your analysis documents, JSON files, etc.)'
    },
    
    compare_analyze_guidance: {
      phase: 'COMPARE_ANALYZE',
      objective: 'Evaluate different ways to implement the refactoring',
      instructions: [
        'Consider at least 2-3 different approaches',
        'Think about trade-offs for each approach',
        'Consider factors like complexity, risk, and maintainability',
        'Choose the approach that best fits the requirements',
        'Document why you chose your approach'
      ],
      suggestedApproach: [
        'Start with the simplest approach that could work',
        'Consider a more comprehensive approach',
        'Think about edge cases and error handling',
        'Evaluate performance implications if relevant',
        'Consider future extensibility'
      ],
      expectedOutput: {
        approaches: 'Description of each approach considered',
        prosAndCons: 'Advantages and disadvantages of each',
        recommendation: 'Your chosen approach',
        justification: 'Why this approach is best',
        alternativesIfNeeded: 'Fallback options if issues arise'
      },
      nextPhase: 'Use question_determine_guidance to clarify and finalize your strategy'
    },
    
    question_determine_guidance: {
      phase: 'QUESTION_DETERMINE',
      objective: 'Clarify any ambiguities AND determine your final implementation plan',
      instructions: [
        '--- QUESTION PHASE (Clarification) ---',
        'Review your understanding from the analysis and inventory',
        'Identify any ambiguous requirements or unclear aspects',
        'Formulate specific, answerable questions',
        'Document assumptions you\'re making',
        'If critical questions need user input, consider using user_input_required_guidance',
        '--- DETERMINE PHASE (Planning) ---',
        'Based on all clarifications, create a detailed implementation plan',
        'Break down your chosen approach into specific steps',
        'Order the steps logically based on dependencies',
        'Define clear success criteria for each step',
        'Plan validation points throughout the implementation'
      ],
      suggestedApproach: [
        'QUESTION: Be specific with questions - vague questions get vague answers',
        'QUESTION: Prioritize questions that would block progress',
        'QUESTION: Document assumptions clearly if answers aren\'t available',
        'DETERMINE: Start with foundation changes that others depend on',
        'DETERMINE: Keep implementation steps small and focused',
        'DETERMINE: Plan to test after each major change',
        'DETERMINE: Include rollback strategies for risky changes'
      ],
      importantNotes: [
        'Questions and planning go hand-in-hand',
        'A clear plan requires all ambiguities to be resolved',
        'This phase finalizes your strategy before any code changes',
        'If you need user input for critical questions, don\'t hesitate to escalate'
      ],
      expectedOutput: {
        // Question outputs
        questions: 'List of specific questions (if any)',
        assumptions: 'What you\'re assuming if not clarified',
        clarifications: 'Any resolved ambiguities',
        // Determine outputs
        implementationSteps: 'Numbered list of specific changes to make',
        dependencies: 'Which steps depend on others',
        validation: 'How to verify each step',
        successCriteria: 'Definition of completion',
        rollbackPlan: 'How to undo changes if needed'
      },
      nextPhase: 'Use refactor_guidance to begin implementation'
    },
    
    refactor_guidance: {
      phase: 'WRITE_OR_REFACTOR',
      objective: 'Implement the planned changes',
      instructions: [
        'Follow your implementation plan from DETERMINE_PLAN',
        'Use your file editing tools to make changes',
        'Remember: you must read files before modifying them',
        'Make changes incrementally',
        'Test frequently if possible',
        'Keep track of what you\'ve changed'
      ],
      suggestedApproach: [
        'Start with one logical unit of change',
        'Verify it works before moving on',
        'Make related changes together',
        'Use version control effectively',
        'Comment on any non-obvious changes'
      ],
      importantNotes: [
        'If you haven\'t read a file yet, read it first',
        'Don\'t try to change everything at once',
        'Keep a list of files you\'ve modified'
      ],
      expectedOutput: {
        filesModified: 'Complete list of changed files',
        changesPerFile: 'Summary of changes in each file',
        testsRun: 'Any tests executed during refactoring',
        issues: 'Any problems encountered',
        deviations: 'Any changes from the original plan'
      },
      nextPhase: 'Use lint_guidance to verify your changes',
      prerequisites: {
        completed: ['AUDIT_INVENTORY', 'QUESTION_DETERMINE'],
        warning: session && !session.completedPhases.includes('AUDIT_INVENTORY') 
          ? 'Consider completing AUDIT_INVENTORY phase first to avoid unexpected issues' 
          : null
      }
    },
    
    lint_guidance: {
      phase: 'LINT',
      objective: 'Verify code quality and catch any issues',
      instructions: [
        'Run all relevant linters for your language/framework',
        'Run type checkers if using a typed language',
        'Execute any available test suites',
        'Check for common issues like unused imports',
        'Document all issues found'
      ],
      suggestedApproach: [
        'Start with syntax and type checking',
        'Then run style/formatting linters',
        'Run tests if available',
        'Check for security issues if relevant',
        'Prioritize errors over warnings'
      ],
      expectedOutput: {
        lintResults: 'Output from all linters run',
        errors: 'List of errors that must be fixed',
        warnings: 'List of warnings to consider',
        testResults: 'Results from any tests run',
        metrics: 'Code quality metrics if available'
      },
      nextPhase: 'If issues found, use iterate_guidance. Otherwise, use present_guidance'
    },
    
    iterate_guidance: {
      phase: 'ITERATE',
      objective: 'Fix issues discovered during the LINT phase',
      instructions: [
        'Address errors first, then warnings',
        'Fix one issue at a time',
        'Re-run linters after each fix',
        'Don\'t introduce new issues while fixing',
        'Document what you changed and why'
      ],
      suggestedApproach: [
        'Start with syntax/type errors',
        'Then fix logical errors',
        'Address style issues last',
        'Test after each significant fix',
        'Consider if the fix reveals a design issue'
      ],
      expectedOutput: {
        fixesApplied: 'List of all fixes made',
        fixDescription: 'What each fix addressed',
        remainingIssues: 'Any issues you couldn\'t fix',
        verificationStatus: 'Results after fixes',
        lessonsLearned: 'Insights from the issues found'
      },
      nextPhase: 'Re-run lint_guidance or proceed to present_guidance when clean'
    },
    
    present_guidance: {
      phase: 'PRESENT',
      objective: 'Create a comprehensive summary of your refactoring work',
      instructions: [
        'Summarize what was refactored and why',
        'List all files that were modified',
        'Highlight key improvements made',
        'Document any remaining issues or future work',
        'Provide metrics on the refactoring'
      ],
      suggestedApproach: [
        'Start with a high-level summary',
        'Then provide specific details',
        'Include before/after comparisons if relevant',
        'Mention any challenges overcome',
        'Suggest next steps or future improvements'
      ],
      expectedOutput: {
        executiveSummary: 'Brief overview of the refactoring',
        detailedChanges: 'Comprehensive list of modifications',
        improvements: 'Benefits achieved by the refactoring',
        metrics: 'Quantifiable improvements (if any)',
        recommendations: 'Suggestions for future work'
      },
      nextPhase: 'Workflow complete! Use workflow_status to see final metrics'
    }
  };

  const guidance = phaseGuidanceMap[phaseName];
  if (!guidance) {
    throw new Error(`Unknown phase guidance: ${phaseName}`);
  }

  // Update session phase if we have an active session
  if (session) {
    sessionManager.updatePhase(guidance.phase);
  }

  // Add platform prefix note to nextPhase if it exists
  if (guidance.nextPhase) {
    guidance.nextPhase += platformPrefixNote;
  }

  return guidance;
}

function getDirectiveGuidance(
  phaseName: string,
  sessionManager: SessionManager,
  outputDir: string
): PhaseGuidance {
  const session = sessionManager.getSession();
  
  // Platform prefix note to be added to all guidance
  const platformPrefixNote = '\n\n**IMPORTANT**: If you get "Unknown tool" errors when calling the next phase tool, your platform may require a prefix (e.g., mcp7_[tool_name] or mcp_[tool_name]). Check how other MCP tools are named in your environment.';
  
  const phaseGuidanceMap: Record<string, PhaseGuidance> = {
    audit_inventory_guidance: {
      phase: 'AUDIT_INVENTORY',
      objective: 'Thoroughly analyze the codebase AND catalog all required changes - CRITICAL FOUNDATION PHASE',
      
      directiveInstructions: [
        '--- AUDIT REQUIREMENTS ---',
        '🔴 MANDATORY: You MUST read the target file completely',
        '🔍 REQUIRED: You MUST identify distinct responsibilities and concerns',
        '📊 CRITICAL: You MUST map all dependencies and imports',
        '📋 ESSENTIAL: You MUST analyze architectural principle adherence (based on user context)',
        '--- INVENTORY REQUIREMENTS ---',
        '🔴 MANDATORY: You MUST catalog at least 10 specific changes',
        '📊 REQUIRED: You MUST analyze impact of each change',
        '🎯 CRITICAL: You MUST prioritize changes by risk and dependencies',
        '--- OUTPUT REQUIREMENTS ---',
        '📁 BLOCKING: You MUST create all required analysis and catalog files'
      ],

      instructions: [
        '--- AUDIT PHASE (Analysis) ---',
        'Read the target file(s) specified in the programming task',
        'Examine all imports, dependencies, and external references',
        'Identify every distinct responsibility within the code',
        'Analyze architectural principle adherence based on project context',
        'Create visual dependency diagram showing code relationships',
        '--- INVENTORY PHASE (Cataloging) ---',
        'Review audit findings to identify all needed changes',
        'List every file that requires modification',
        'Specify exact changes needed for each file',
        'Analyze dependencies between changes and assess risks',
        'Create implementation priority order'
      ],

      blockingMessages: [
        '⛔ CANNOT PROCEED: Target file has not been read',
        '⛔ CANNOT PROCEED: Insufficient responsibilities identified',
        '⛔ CANNOT PROCEED: Dependency analysis incomplete',
        '⛔ CANNOT PROCEED: Architectural principle analysis not documented',
        '⛔ CANNOT PROCEED: Insufficient changes cataloged (need minimum 10)',
        '⛔ CANNOT PROCEED: Impact analysis not completed',
        '⛔ CANNOT PROCEED: Required output files not created'
      ],

      requiredOutputFiles: [
        {
          path: `${outputDir}/01-audit-findings.md`,
          description: 'Comprehensive audit findings and analysis',
          required: true,
          format: 'markdown',
          validationRules: [
            'Must list distinct responsibilities and concerns',
            'Must include architectural principle analysis (based on user context)',
            'Must contain dependency mapping',
            'Must identify code smells and issues'
          ]
        },
        {
          path: `${outputDir}/01-audit-dependency-diagram.md`,
          description: 'Visual dependency diagram (Mermaid or text-based)',
          required: true,
          format: 'markdown',
          validationRules: [
            'Must show external dependencies',
            'Must show internal module relationships',
            'Must include data flow visualization'
          ]
        },
        {
          path: `${outputDir}/01-audit-principle-analysis.json`,
          description: 'Structured architectural principle analysis',
          required: true,
          format: 'json',
          validationRules: [
            'Must analyze principles specified by user/context',
            'Must provide specific examples for each violation or adherence',
            'Must be valid JSON format'
          ]
        },
        {
          path: `${outputDir}/02-inventory-changes.json`,
          description: 'Structured catalog of all required changes',
          required: true,
          format: 'json',
          validationRules: [
            'Must contain at least 10 specific changes',
            'Must include file, type, description, risk, dependencies for each',
            'Must be valid JSON with consistent structure'
          ]
        },
        {
          path: `${outputDir}/02-inventory-impact.md`,
          description: 'Impact analysis and risk assessment',
          required: true,
          format: 'markdown',
          validationRules: [
            'Must analyze breaking changes',
            'Must identify cascade effects',
            'Must include priority ordering'
          ]
        }
      ],

      validationCriteria: {
        minimumRequirements: {
          responsibilitiesIdentified: true,
          architecturalPrinciplesAnalyzed: true,
          dependenciesMapped: true,
          changesIdentified: 10,
          impactAnalyzed: true,
          risksAssessed: true,
          prioritiesSet: true,
          filesCreated: 5
        },
        blockingMessages: [
          '⛔ CANNOT PROCEED: Target file has not been read',
          '⛔ CANNOT PROCEED: Insufficient responsibilities identified',
          '⛔ CANNOT PROCEED: Architectural principle analysis incomplete',
          '⛔ CANNOT PROCEED: Insufficient changes cataloged',
          '⛔ CANNOT PROCEED: Impact analysis incomplete',
          '⛔ CANNOT PROCEED: Required output files missing'
        ],
        expectedFiles: [
          `${outputDir}/01-audit-findings.md`, 
          `${outputDir}/01-audit-dependency-diagram.md`, 
          `${outputDir}/01-audit-principle-analysis.json`,
          `${outputDir}/02-inventory-changes.json`,
          `${outputDir}/02-inventory-impact.md`
        ],
        selfCheckQuestions: [
          'Have I read the target file completely?',
          'Have I identified distinct responsibilities and concerns?',
          'Have I analyzed architectural principles based on user/project context?',
          'Have I created a dependency diagram?',
          'Have I cataloged at least 10 specific changes?',
          'Have I analyzed the impact of each change?',
          'Have I assessed risks and created priority ordering?',
          'Have I created all 5 required output files?'
        ],
        completionCriteria: [
          'Target file read and understood',
          'Responsibilities and concerns documented',
          'Architectural principles analyzed with examples',
          'Dependency diagram created',
          'Minimum 10 changes cataloged',
          'Impact analysis complete',
          'Risk assessment documented',
          'Priority ordering established',
          'All output files generated'
        ],
        cannotProceedUntil: [
          'All validation criteria are met',
          'All required files are created',
          'Self-check questions answered positively'
        ]
      },

      expectedOutput: {
        // Audit outputs
        filesAnalyzed: 'Complete list of files examined',
        responsibilities: 'Distinct responsibilities and concerns identified',
        dependencies: 'Comprehensive dependency mapping',
        principleAnalysis: 'Detailed architectural principle analysis based on context',
        codeSmells: 'Issues and improvement opportunities',
        // Inventory outputs
        changesList: 'Detailed catalog of all modifications needed',
        impactAnalysis: 'Assessment of each change\'s effects',
        riskAssessment: 'Risk levels and mitigation strategies',
        priorityOrder: 'Implementation sequence based on dependencies',
        outputFiles: '5 required documentation files created'
      },

      nextPhase: 'After completing validation, use compare_analyze_guidance',
      
      prerequisites: {
        completed: [],
        warning: null
      }
    },

    refactor_guidance: {
      phase: 'WRITE_OR_REFACTOR',
      objective: 'Implement planned changes systematically - CRITICAL EXECUTION PHASE',

      directiveInstructions: [
        '🔴 MANDATORY: You MUST read files before modifying them (ENFORCED)',
        '📝 REQUIRED: You MUST implement changes according to the determined plan',
        '📊 CRITICAL: You MUST document every modification made',
        '🧪 ESSENTIAL: You MUST test changes incrementally when possible',
        '📁 BLOCKING: You MUST create comprehensive change documentation'
      ],

      instructions: [
        'Follow the implementation plan from DETERMINE_PLAN phase',
        'Read each target file completely before making changes',
        'Implement changes one logical unit at a time',
        'Test functionality after each significant change',
        'Document all modifications with before/after comparisons',
        'Track any deviations from the original plan'
      ],

      blockingMessages: [
        '⛔ CANNOT PROCEED: Files modified without being read first (SAFETY VIOLATION)',
        '⛔ CANNOT PROCEED: Implementation plan not followed',
        '⛔ CANNOT PROCEED: Changes not documented',
        '⛔ CANNOT PROCEED: Required refactoring files not created'
      ],

      requiredOutputFiles: [
        {
          path: `${outputDir}/03-refactor-progress.md`,
          description: 'Real-time refactoring progress and changes',
          required: true,
          format: 'markdown',
          validationRules: [
            'Must list all files modified',
            'Must describe changes made to each file',
            'Must include timestamps of modifications'
          ]
        },
        {
          path: `${outputDir}/03-refactor-changes.json`,
          description: 'Structured log of all modifications',
          required: true,
          format: 'json',
          validationRules: [
            'Must be valid JSON format',
            'Must include file paths and change descriptions',
            'Must track plan adherence vs deviations'
          ]
        }
      ],

      validationCriteria: {
        minimumRequirements: {
          filesModified: true,
          changesDocumented: true,
          planFollowed: true,
          safetyRuleObserved: true
        },
        blockingMessages: [
          '⛔ CANNOT PROCEED: Files not read before modification',
          '⛔ CANNOT PROCEED: Changes not documented',
          '⛔ CANNOT PROCEED: Implementation incomplete',
          '⛔ CANNOT PROCEED: Required files not created'
        ],
        expectedFiles: [`${outputDir}/03-refactor-progress.md`, `${outputDir}/03-refactor-changes.json`],
        selfCheckQuestions: [
          'Have I read all files before modifying them?',
          'Have I implemented the planned changes?',
          'Have I documented all modifications?',
          'Have I tested changes when possible?',
          'Have I created all required output files?'
        ],
        completionCriteria: [
          'All planned changes implemented',
          'Files read before modification (safety)',
          'Changes documented comprehensively',
          'Output files created and validated'
        ],
        cannotProceedUntil: [
          'Implementation plan fully executed',
          'All safety rules followed',
          'Documentation files complete'
        ]
      },

      expectedOutput: {
        filesModified: 'Complete list of changed files',
        changesDescription: 'Detailed description of modifications',
        planAdherence: 'How closely implementation followed plan',
        deviations: 'Any changes from original plan with rationale',
        outputFiles: '2 required documentation files created'
      },

      nextPhase: 'After validation complete, use test_guidance',
      
      prerequisites: {
        completed: ['QUESTION_DETERMINE'],
        warning: !session?.completedPhases.includes('QUESTION_DETERMINE') 
          ? '⚠️ WARNING: QUESTION_DETERMINE phase not completed. Implementation may lack clear direction and clarifications.' 
          : null
      }
    },

    lint_guidance: {
      phase: 'LINT',
      objective: 'Verify code quality and catch issues - QUALITY ASSURANCE PHASE',

      directiveInstructions: [
        '🔴 MANDATORY: You MUST run all relevant linters and type checkers',
        '📊 REQUIRED: You MUST document all errors and warnings',
        '🎯 CRITICAL: You MUST prioritize errors over warnings',
        '📋 ESSENTIAL: You MUST prepare for ITERATE phase if issues found',
        '📁 BLOCKING: You MUST create comprehensive lint report'
      ],

      instructions: [
        'Identify and run all relevant code quality tools',
        'Execute linters, type checkers, and style checkers',
        'Document all errors with specific error messages',
        'Catalog warnings and assess their importance',
        'Prepare prioritized list for iteration if needed'
      ],

      requiredOutputFiles: [
        {
          path: `${outputDir}/05-lint-results.md`,
          description: 'Comprehensive linting and quality check results',
          required: true,
          format: 'markdown',
          validationRules: [
            'Must include all linter outputs',
            'Must separate errors from warnings',
            'Must include specific error messages'
          ]
        }
      ],

      expectedOutput: {
        lintResults: 'Complete output from all quality tools',
        errorCount: 'Number of errors that must be fixed',
        warningCount: 'Number of warnings to consider',
        toolsUsed: 'List of linters and checkers executed',
        outputFiles: '1 required documentation file created'
      },

      nextPhase: 'If errors found, use iterate_guidance. If clean, use present_guidance'
    },

    iterate_guidance: {
      phase: 'ITERATE',
      objective: 'Fix issues systematically - PROBLEM RESOLUTION PHASE',

      directiveInstructions: [
        '🔴 MANDATORY: You MUST fix errors before warnings',
        '📝 REQUIRED: You MUST fix one issue at a time',
        '🔄 CRITICAL: You MUST re-run linters after each fix',
        '📊 ESSENTIAL: You MUST document all fixes applied',
        '📁 BLOCKING: You MUST create iteration progress report'
      ],

      instructions: [
        'Address errors in priority order (compilation, then logic, then style)',
        'Fix one issue at a time to avoid introducing new problems',
        'Re-run relevant linters after each fix',
        'Document what was fixed and how',
        'Track progress toward clean code state'
      ],

      expectedOutput: {
        fixesApplied: 'List of all issues resolved',
        fixDescription: 'How each issue was addressed',
        verificationStatus: 'Results after fixes applied',
        remainingIssues: 'Any issues not yet resolved',
        outputFiles: '1 required documentation file created'
      },

      nextPhase: 'Re-run lint_guidance to verify fixes, or present_guidance when clean'
    },

    present_guidance: {
      phase: 'PRESENT',
      objective: 'Summarize refactoring work - COMPLETION PHASE',

      directiveInstructions: [
        '🔴 MANDATORY: You MUST create comprehensive summary',
        '📊 REQUIRED: You MUST include before/after metrics',
        '🎯 CRITICAL: You MUST document all improvements made',
        '📋 ESSENTIAL: You MUST provide future recommendations',
        '📁 BLOCKING: You MUST create final presentation report'
      ],

      instructions: [
        'Create comprehensive executive summary of the refactoring work',
        'Document all changes made with before/after comparisons',
        'Quantify improvements achieved (code quality, maintainability, etc.)',
        'Provide metrics on files modified, tests updated, issues resolved',
        'Include recommendations for future improvements',
        'Create final summary presentation document'
      ],

      expectedOutput: {
        executiveSummary: 'High-level overview of refactoring',
        detailedChanges: 'Comprehensive list of modifications',
        improvements: 'Benefits achieved through refactoring',
        metrics: 'Quantifiable before/after comparisons',
        recommendations: 'Suggestions for future work',
        outputFiles: '1 required final summary file created'
      },

      nextPhase: 'Workflow complete! Check workflow_status for final metrics'
    },

    // Default phases not fully implemented in directive mode
    compare_analyze_guidance: {
      phase: 'COMPARE_ANALYZE',
      objective: 'Complete the COMPARE_ANALYZE phase with directive guidance',
      instructions: ['Follow directive approach for COMPARE_ANALYZE phase'],
      expectedOutput: {
        completed: 'COMPARE_ANALYZE phase requirements met'
      },
      nextPhase: 'Use next appropriate phase guidance tool'
    },

    question_determine_guidance: {
      phase: 'QUESTION_DETERMINE',
      objective: 'Clarify ambiguities AND determine final implementation plan - CRITICAL DECISION PHASE',

      directiveInstructions: [
        '--- QUESTION REQUIREMENTS ---',
        '🔴 MANDATORY: You MUST identify all ambiguous requirements',
        '📋 REQUIRED: You MUST formulate specific, answerable questions',
        '📊 CRITICAL: You MUST document assumptions for unclear aspects',
        '--- DETERMINE REQUIREMENTS ---',
        '🔴 MANDATORY: You MUST create detailed step-by-step implementation plan',
        '🎯 REQUIRED: You MUST define success criteria for each step',
        '📊 CRITICAL: You MUST plan validation and rollback strategies',
        '--- OUTPUT REQUIREMENTS ---',
        '📁 BLOCKING: You MUST create all required planning files'
      ],

      instructions: [
        '--- QUESTION PHASE (Clarification) ---',
        'Review all findings from AUDIT_INVENTORY and COMPARE_ANALYZE',
        'Identify any ambiguous requirements or unclear aspects',
        'Formulate specific questions that need answers',
        'Document assumptions you\'re making',
        'Consider if user input is needed for critical decisions',
        '--- DETERMINE PHASE (Planning) ---',
        'Based on all information and clarifications, finalize implementation plan',
        'Break down chosen approach into specific, ordered steps',
        'Define success criteria and validation points for each step',
        'Plan rollback strategies for risky changes',
        'Create comprehensive implementation roadmap'
      ],

      blockingMessages: [
        '⛔ CANNOT PROCEED: Ambiguities not properly identified',
        '⛔ CANNOT PROCEED: Implementation plan not detailed enough',
        '⛔ CANNOT PROCEED: Success criteria not defined',
        '⛔ CANNOT PROCEED: Validation strategy not planned',
        '⛔ CANNOT PROCEED: Required output files not created'
      ],

      requiredOutputFiles: [
        {
          path: `${outputDir}/04-question-clarifications.md`,
          description: 'Questions, assumptions, and clarifications',
          required: true,
          format: 'markdown',
          validationRules: [
            'Must identify any ambiguous requirements',
            'Must list specific questions (if any)',
            'Must document assumptions being made',
            'Must indicate if user input is needed'
          ]
        },
        {
          path: `${outputDir}/04-determine-implementation-plan.json`,
          description: 'Detailed step-by-step implementation plan',
          required: true,
          format: 'json',
          validationRules: [
            'Must contain ordered implementation steps',
            'Must include success criteria for each step',
            'Must define validation points',
            'Must include rollback strategies'
          ]
        },
        {
          path: `${outputDir}/04-determine-roadmap.md`,
          description: 'Visual implementation roadmap',
          required: true,
          format: 'markdown',
          validationRules: [
            'Must show implementation sequence',
            'Must highlight dependencies',
            'Must indicate risk points',
            'Must include validation checkpoints'
          ]
        }
      ],

      validationCriteria: {
        minimumRequirements: {
          ambiguitiesReviewed: true,
          questionsFormulated: true,
          assumptionsDocumented: true,
          implementationStepsCreated: true,
          successCriteriaDefined: true,
          validationPlanned: true,
          rollbackStrategies: true,
          filesCreated: 3
        },
        blockingMessages: [
          '⛔ CANNOT PROCEED: Clarifications incomplete',
          '⛔ CANNOT PROCEED: Implementation plan not finalized',
          '⛔ CANNOT PROCEED: Success criteria missing',
          '⛔ CANNOT PROCEED: Required files not created'
        ],
        expectedFiles: [
          `${outputDir}/04-question-clarifications.md`,
          `${outputDir}/04-determine-implementation-plan.json`,
          `${outputDir}/04-determine-roadmap.md`
        ],
        selfCheckQuestions: [
          'Have I reviewed all ambiguities from previous phases?',
          'Have I formulated specific questions where needed?',
          'Have I documented all assumptions?',
          'Have I created a detailed implementation plan?',
          'Have I defined success criteria for each step?',
          'Have I planned validation and rollback strategies?',
          'Have I created all 3 required output files?'
        ],
        completionCriteria: [
          'All ambiguities addressed or documented',
          'Questions formulated where clarification needed',
          'Assumptions clearly documented',
          'Step-by-step implementation plan created',
          'Success criteria defined for each step',
          'Validation strategy planned',
          'Rollback approach documented',
          'All output files generated'
        ],
        cannotProceedUntil: [
          'All clarifications complete',
          'Implementation plan finalized',
          'All required files created'
        ]
      },

      expectedOutput: {
        // Question outputs
        questions: 'Specific questions needing answers',
        assumptions: 'Documented assumptions for unclear aspects',
        clarifications: 'Any resolved ambiguities',
        userInputNeeded: 'Whether critical decisions need user input',
        // Determine outputs
        implementationSteps: 'Detailed, ordered list of changes',
        successCriteria: 'Definition of completion for each step',
        validationStrategy: 'How to verify each step',
        rollbackPlan: 'How to undo changes if needed',
        outputFiles: '3 required documentation files created'
      },

      nextPhase: 'After validation complete, use refactor_guidance',
      
      prerequisites: {
        completed: ['AUDIT_INVENTORY', 'COMPARE_ANALYZE'],
        warning: !session || !session.completedPhases.includes('AUDIT_INVENTORY') || !session.completedPhases.includes('COMPARE_ANALYZE')
          ? '⚠️ WARNING: Previous phases not completed. Planning may lack necessary context.'
          : null
      }
    }
  };

  const guidance = phaseGuidanceMap[phaseName];
  if (!guidance) {
    throw new Error(`Unknown phase guidance: ${phaseName}`);
  }

  // Update session phase if we have an active session
  if (session) {
    sessionManager.updatePhase(guidance.phase);
  }

  // Add platform prefix note to nextPhase if it exists
  if (guidance.nextPhase) {
    guidance.nextPhase += platformPrefixNote;
  }

  return guidance;
}