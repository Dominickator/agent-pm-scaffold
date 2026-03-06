# Pocket Bills — Feature Spec (MVP)

Title: Pocket Bills — Subscription tracker & savings assistant (MVP)

Summary
- Small React Native (Expo) iOS app that helps users track recurring subscriptions, estimate monthly spend, and surface opportunities to save. Monetization via a small subscription (freemium). Goal: fast conversion by showing immediate value (found savings).

Goals
- Let users add recurring subscriptions quickly
- Show estimated monthly spend and highlight potential savings
- Provide a simple upgrade path for proactive cancellation assistance

User stories
- As a user, I want to add a subscription (name, cost, frequency) so I can see my monthly spend.
- As a user, I want to view a list of my subscriptions sorted by monthly cost.
- As a user, I want to flag a subscription as "review for cancellation" and see suggested actions.

Acceptance criteria (MVP)
- Expo + React Native TypeScript app boots and runs on iOS simulator
- Sign-up (local account) screen with basic validation
- Subscriptions list screen showing items with monthly normalization of cost
- Add-subscription flow with validation and unit tests for normalization logic
- Basic UI tests for list rendering using RNTL

Architecture notes
- Client-first app using Expo (managed workflow)
- Local storage using SecureStore or AsyncStorage for offline-first MVP
- Minimal backend: optional serverless function for analytics and subscription sync (deferred)

MVP Task list (decomposed by PM agent)

Task 1 — Project bootstrap (feature/pm-bootstrap)
- Create Expo + TypeScript project skeleton
- Add ESLint/Prettier, Jest, React Native Testing Library
- Add GitHub Actions CI to run tests and lint
- Branch: feature/pm-bootstrap
- Acceptance: project builds, npm test runs, linter passes

Task 2 — Sign-up screen + local account (feature/pm-signup)
- Implement SignUpScreen with email + password fields and validation
- Store simple local account (SecureStore or AsyncStorage)
- Unit tests for validation logic
- Acceptance: screen present, validation tests pass

Task 3 — Subscriptions list UI (feature/pm-subscriptions-list)
- Implement SubscriptionsList screen showing list of items with name, raw cost, normalized monthly cost
- Sorting by monthly cost descending
- Unit tests for normalization and sorting
- Acceptance: list renders with sample data in tests

Task 4 — Add-subscription flow (feature/pm-add-subscription)
- Implement AddSubscription screen/modal with fields: name, amount, frequency (monthly/annual/weekly)
- Normalize amounts to monthly for display and storage
- Add tests for normalization behavior and input validation
- Acceptance: add flow persists data locally and tests pass

Task 5 — QA & PR workflow (feature/pm-ci-setup)
- Ensure PR templates and branch-protection-friendly CI (tests + lint)
- Provide PR checklist and automerge guidance
- Acceptance: CI workflow YAML present in repo and referenced in README

Notes on monetization (deferred):
- Include a placeholder Upgrade screen linking to a Stripe Checkout flow (deferred until basic UX proven)

(End of spec)
