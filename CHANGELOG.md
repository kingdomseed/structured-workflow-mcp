# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.7] - 2025-07-07

### 🚀 New Features
- **SETUP Phase**: Added new initial phase to establish workflow environment and file organization patterns before starting analysis
- **Simplified AUDIT_INVENTORY**: Reduced required documentation from 5 files to 2 files (01-audit-analysis.md and 01-inventory-changes.json)

### 🛠️ Improvements
- **Fixed ITERATE and PRESENT Phases**: Added missing `requiredOutputFiles` arrays to ensure consistent file output patterns
- **Clarified File Path Patterns**: Replaced ambiguous `${outputDir}` references with explicit `structured-workflow/{task-name}/` patterns throughout all phases
- **Updated Documentation Examples**: Fixed misleading file name examples (e.g., "analysis.md") to use correct numbered patterns (e.g., "01-audit-analysis.md")
- **Improved phase_output Guidance**: Clarified confusing "files OR structured JSON" phrasing to emphasize numbered file naming convention

### 🐛 Bug Fixes
- Fixed file creation inconsistencies where early phases created unnumbered files in project root while later phases correctly used numbered files in workflow-output directory
- Updated phase numbering to accommodate new SETUP phase (SETUP=0, AUDIT=1, etc.)

### 🔧 Internal
- Updated Phase type definition to include SETUP
- Updated validation criteria for all phases
- Updated workflow presets to include SETUP phase
- Enhanced file system utilities to support new phase numbering

## [0.2.6] - 2025-07-05

- ### 🛠️ Improvements
- **Phase Guidance Enhancements**: Inject universal tool-usage reminders into all suggestive and directive phases (audit, compare, write/refactor, lint, iterate, present).
- **Test Coverage**: Added normalization in Jest tests to handle Unicode hyphen variants in guidance instructions.

---

## [0.2.4] - 2025-07-04

### ♻️ Improvements
- **Automatic Output Directory Resolution**: Relative paths for `outputDirectory` are now resolved against the current project root via new `resolveOutputDirectory()` helper.
- **Pre-flight Directory Validation**: Workflow creation now validates & creates the resolved directory, avoiding ENOENT errors.
- **Robust Integration Tests**: Tests accept both relative and absolute default paths, ensuring CI stability across environments.
- **Code Clean-up**: Removed duplicate properties and tightened type checks in `buildCustomWorkflow`.

### 🐛 Bug Fixes
- Fixed workflow creation failure when default directory could not be created from outside repo working directory.

### 🔧 Internal
- Version bumped to 0.2.4.

---

## [0.2.3] - 2025-07-04

### 🚀 Major Features

#### Custom Output Directory Support
- **CLI Parameter**: Added `--output-dir` command line argument to specify custom workflow output directory
- **Automatic Directory Creation**: Workflow tools now automatically create output directories with proper error handling
- **MCP Configuration**: Updated MCP server configs to support custom directory parameters
- **File System Utilities**: New comprehensive file system utilities for directory validation and creation

### 🛠️ Improvements

#### Enhanced Installation & Configuration
- **NPM Package**: Simplified package configuration for easier npm publishing and installation
- **Global Installation**: Added support for global npm installation with `npm install -g structured-workflow-mcp`
- **CLI Binary**: Added `swmcp` as a short alias for the main command
- **Installation Documentation**: Streamlined README with clearer installation instructions for multiple platforms

#### Testing Infrastructure  
- **Comprehensive Test Suite**: Added 41 comprehensive tests covering CLI args, session management, and workflow integration
- **Jest Configuration**: Updated Jest configuration for TypeScript ES modules support
- **CI/CD Ready**: Tests now pass consistently and support continuous integration workflows

### 🔧 Technical Enhancements

#### File System & Directory Management
- **Sanitized File Names**: Automatic file name sanitization for cross-platform compatibility
- **Directory Validation**: Robust directory access validation with clear error messages
- **Numbered File Generation**: Automatic numbered file naming for workflow phase outputs
- **Path Resolution**: Enhanced path resolution for both relative and absolute directory paths

#### Development Experience
- **Test-Driven Development**: Implemented comprehensive testing patterns for future development
- **Error Handling**: Improved error messages and validation throughout the system
- **Documentation**: Enhanced inline documentation and usage examples

### 📚 Documentation

#### Installation & Setup
- **Multi-Platform Instructions**: Added installation guides for Claude Desktop, Cursor, and other MCP-compatible AI platforms
- **Configuration Examples**: Comprehensive examples showing custom output directory usage
- **Smithery Integration**: Added auto-install instructions via Smithery package manager

#### Developer Resources
- **Testing Guidelines**: Documented testing patterns and debugging approaches in CLAUDE.md
- **Architecture Documentation**: Updated technical documentation with new file system capabilities
- **Usage Examples**: Real-world configuration examples for different development environments

### 🐛 Bug Fixes

- **Package Binary Paths**: Fixed binary path configuration in package.json for proper npm installation
- **Jest Module Resolution**: Resolved TypeScript ES module import issues in test environment
- **Session State Management**: Fixed session singleton behavior in testing environments
- **Phase Validation**: Enhanced phase-specific content validation for workflow progression

### 🔄 Configuration Changes

#### MCP Configuration Examples
**Basic NPM Usage:**
```json
{
  "mcpServers": {
    "structured-workflow": {
      "command": "npx",
      "args": ["structured-workflow-mcp@latest"],
      "env": {}
    }
  }
}
```

**With Custom Output Directory:**
```json
{
  "mcpServers": {
    "structured-workflow": {
      "command": "npx", 
      "args": ["structured-workflow-mcp@latest", "--output-dir", "./my-workflows"],
      "env": {}
    }
  }
}
```

### ⚠️ Breaking Changes

None in this release - all changes are backward compatible.

### 📊 Statistics

- **Files Changed**: 9 core files enhanced
- **Lines Added**: 955+ lines of new functionality and tests
- **Test Coverage**: 41 comprehensive tests added
- **New Utilities**: 8+ new file system and CLI utility functions

---

## Previous Releases

### [0.2.2] - 2025-07-03

- Initial NPM package preparation
- Core MCP server functionality
- Basic workflow phase guidance tools

### [0.2.1] - 2025-07-02

- Foundation MCP server implementation
- Session management system
- Phase-based workflow guidance

---

**Full Changelog**: https://github.com/kingdomseed/structured-workflow-mcp/compare/v0.2.2...v0.2.6
