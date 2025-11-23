# Release Process

This document describes how releases are prepared and published.

## Versioning

We follow [Semantic Versioning](https://semver.org/): MAJOR.MINOR.PATCH.

## Steps to create a release

1. Ensure `main` is up-to-date and all PRs merged.
2. Update `CHANGELOG.md` with a summary of changes under a new version heading.
3. Update package versions (if applicable) and commit.
4. Create a git tag:

```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z
```

5. Create a GitHub Release from the tag and paste the changelog entry.
6. Deploy using your deployment pipeline.

## Hotfixes

For urgent fixes, create a hotfix </desc> branch from main, apply fix, run tests, and create a PR to main. After merge, bump version and release.

## Rollback

If a release needs rollback, follow the emergency process:

- Revert the release commit or tag
- Create a new release with a fix
- Notify stakeholders
