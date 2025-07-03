# Contributing

Thank you for your interest in contributing to the Structured Workflow MCP Server! Please follow these guidelines.

## Development Setup

1. Fork the repository on GitHub.
2. Clone your fork:
   ```bash
   git clone https://github.com/kingdomseed/structured-workflow-mcp.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development Workflow

1. Create a new branch for your changes:
   - For bug fixes: `git checkout -b bugfix/your-fix`
   - For new features: `git checkout -b feature/your-feature`
2. Make your changes, including tests if applicable.
3. Run tests:
   ```bash
   npm test
   ```
4. Check types:
   ```bash
   npm run typecheck
   ```
5. Run linter:
   ```bash
   npm run lint
   ```
6. Build project:
   ```bash
   npm run build
   ```
7. Ensure all CI checks pass.
8. Push to your branch:
   ```bash
   git push origin <branch-name>
   ```
9. Open a pull request describing your changes clearly.

## Code Style

- This project uses ESLint and Prettier. Code should be auto-formatted via `npm run lint`.
- Follow the existing code style and patterns in the codebase.

## Pull Request Process

1. Update documentation as needed.
2. Ensure tests cover your changes.
3. Maintain clear commit messages.
4. Maintain TypeScript types and interfaces.
5. The maintainers will review and provide feedback.

## Code of Conduct

Please note that this project is released with a Code of Conduct. By participating you agree to be respectful to all members of the community.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
