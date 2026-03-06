Pocket Bills — Agent-PM notes

This folder contains the PM skill and templates used to decompose specs and spawn coder agents.

How to use
1. Edit examples/pocket-bills-spec.md to change the spec.
2. Use scripts/spawn_agent.py to prepare spawn payloads for coder sub-agents.
3. To enable full automation (PR creation and auto-merge):
   - Add repository secrets in GitHub (AUTO_MERGE_TOKEN or GITHUB_TOKEN as needed).
   - Enable GitHub Actions for the repo.

Workflows
- CI workflow is provided at .github/workflows/ci.yml. It runs on pushes to master and on PRs.

Notes
- This project is Expo + TypeScript first. Coder agents are instructed to prefer TypeScript and to include tests using Jest + RNTL.
