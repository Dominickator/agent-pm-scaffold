---
name: agent-pm
description: "Draft product specs, decompose work into developer tasks, spawn coding sub-agents, and verify deliverables for React Native iPhone projects. Use when you need an autonomous PM to turn a feature brief into implemented code with automated validation."
---

# agent-pm

This skill implements a Product Manager (PM) agent that:

- Drafts specs from feature briefs
- Decomposes work into developer tasks with acceptance criteria
- Generates developer-facing prompts and spawns coding sub-agents to implement tasks
- Runs automated checks (tests/lint/build) and approves or requests fixes
- Optionally opens pull requests and can auto-merge when CI passes

Triggers
- "Build a React Native iPhone screen for..."
- "Add profile editing with photo upload..."
- "Implement onboarding flow with 3 screens..."

Core files and templates are provided in the skill folder. Read templates/spec-template.md and agent-prompt-templates/coder-agent-prompt.md before spawning agents.

Usage
1. Prepare a feature brief (use templates/spec-template.md).
2. Run scripts/spawn_agent.py to create a PM session and spawn coder sub-agents for tasks.
3. Review generated PRs in GitHub (automation can auto-merge when CI passes).

Security notes
- Do NOT paste secrets into chat. Use environment variables for GitHub tokens.
- spawn_agent.py prepares prompts and attachments but does not push to GitHub by itself. Use scripts/create_github_repo.py (reads GITHUB_TOKEN from environment) to create/push repos.

Files added
- templates/, scripts/, references/, examples/

(See README in the skill folder for step-by-step instructions.)