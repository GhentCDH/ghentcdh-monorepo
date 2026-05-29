# How to release a new version

A github workflow is triggered when a tag with following pattern is pushed: `v*.*.*` start automatically
with following steps

1. Run `npx nx release --skip-publish` locally. This will create a commit with the version and changelog updates, then create a tag for the new version.
2. Push the changes (including the new tag) to the remote repository with `git push && git push --tags`.
3. The publish workflow will automatically trigger and publish the packages to the npm registry.
