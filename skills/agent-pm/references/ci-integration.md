# CI Integration (GitHub Actions)

This file describes a simple GitHub Actions workflow to run tests, lint, and auto-merge.

Suggested workflow (/.github/workflows/ci.yml):
- jobs:
  - build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install
        run: npm ci
      - name: Run tests
        run: npm test -- --ci
      - name: Lint
        run: npm run lint

Auto-merge
- Use a GitHub Action like pascalgn/automerge-action or rely on repository rules.
- Add a separate job that runs when CI passes to create/merge the pull request if the PR meets policy.

Secrets
- Store any tokens (for bot merges or API calls) in repository secrets, e.g., AUTO_MERGE_TOKEN.
