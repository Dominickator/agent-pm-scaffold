Pocket Bills - Agent PM Scaffold

This repository contains scaffold and examples for agent-driven PMs.

CI / PR workflow

- A GitHub Actions workflow (.github/workflows/ci.yml) runs on pull requests targeting master and will:
  - install dependencies (npm ci)
  - run linter (npm run lint)
  - run tests (npm test)

- Pull request template: .github/PULL_REQUEST_TEMPLATE.md
- CODEOWNERS: .github/CODEOWNERS

Branch protection suggestion (for repo admins):
- Require pull request reviews before merging
- Require status checks to pass (CI)
- Restrict who can push to protected branches

Automation notes:
- Use the repository secret GITHUB_TOKEN in Actions for any automation that needs push/PR permissions.
