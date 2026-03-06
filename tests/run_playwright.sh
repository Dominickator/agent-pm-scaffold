#!/usr/bin/env bash
set -euo pipefail

BRANCH=${1:-tests/merge-run-$(date +%Y%m%d-%H%M%S)}

echo "Creating local branch: $BRANCH"
git checkout -b "$BRANCH"

echo "Merge your PR branches into this branch locally, e.g.:
  git fetch origin pull/123/head:pr-123
  git merge --no-ff pr-123
Repeat for each PR you want merged."

echo "When ready, push the branch to trigger CI:"

echo "  git push origin $BRANCH"

echo "Or run: git push --set-upstream origin $BRANCH"

