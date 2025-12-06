# Contributing to Wedding Management System

Thanks for wanting to contribute! This document explains how to get started, the contribution
workflow, and coding standards.

## Table of Contents

- Getting started
- How to contribute
- Branching & PR workflow
- Code style and commit messages
- Tests
- Reporting security issues

## Getting started

1. Fork the repository and clone your fork:

```bash
git clone git@github.com:<your-username>/<repo>.git
cd <repo>
```

2. Install dependencies:

```bash
npm install
```

3. Create a branch for your work (see Branching & Commits doc for naming rules):

```bash
git checkout -b feat/<short-desc>-<issue#>
```

## How to contribute

- Open an issue first for non-trivial features or bug reports, link to the relevant issue from your
  PR.
- Keep PRs small and focused — aim for a single logical change per PR.
- Add unit tests for new functionality where applicable.
- Update README/docs when changing behavior or configuration.

## Branching & PR workflow

- Create feature branches from `develop`.
- Push your branch and open a PR targeting `develop`.
- Include a meaningful PR description and link related issues. (Use PR Templates)
- Add reviewers and wait for at least one approving review and passing CI.
- For all the PRs to be merged in develop - Prefer Squash over Merge
- Forr the PRs to be merged in main - Use Merge
- Update branch before merging PR - For updating Prefer Rebase over Merge.

## Code style

- TypeScript for backend & frontend code.
- Use Prettier for formatting and ESLint for linting.
- Run npm run lint and npm run format before committing.

### Commit messages

Follow Conventional Commits. Example:

```
feat(auth): add login endpoint
fix(db): ensure FK cascade on delete
chore(deps): bump typescript to 5.x
```

See BRANCHING_AND_COMMITS.md for full rules.

## Tests

- Run unit tests locally: npm test or npm run test:unit
- Ensure tests pass before opening a PR.

### CI

CI runs lint, build and tests on PRs. Fix failures before merging.

## Reporting security issues

If you discover a security vulnerability, do not file a public issue. Contact the maintainers
privately via the repository SECURITY.md process.
