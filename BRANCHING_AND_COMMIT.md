# Branching Strategy & Commit Conventions

## Branches

- `main` — production-ready, protected branch.
- `develop` — (optional) integration branch for ongoing development.
- Feature branches: `feat/<short-desc>-<issue#>`
- Bugfix branches: `fix/<short-desc>-<issue#>`
- Hotfix branches: `hotfix/<short-desc>`
- Chore branches: `chore/<short-desc>`

## Branch rules

- Branch off latest `develop`.
- Keep PRs small and scoped.
- Require at least one approval and passing CI to merge.

## Commit messages (Conventional Commits)

Use the following format:

Common `type` values:

- `feat` — new feature
- `fix` — bug fix
- `chore` — maintenance
- `docs` — documentation
- `style` — formatting, no code change
- `refactor` — refactor code
- `test` — adding/updating tests
- `perf` — performance improvement

Examples:

- `feat(guest): add bulk-import endpoint`
- `fix(auth): return 401 on invalid token`

## Pull Request Titles

Start PR titles with the same `type(scope): short summary` as commit messages where possible.

## PR Review & Merge

- Rebase or squash commits as project policy requires.
- Ensure branch has up-to-date main before merging.
