# Migration Plan: annotation-editor → ghentcdh monorepo

## Overview

Move all packages from `annotation-editor/packages/` into `ghentcdh/libs/annotation-editor/` and create a new docs site at `docs/annotation-editor-site/`.

## Target structure

```
libs/annotation-editor/
  annotation-api/
  annotation-core/
  annotation-editor/
  annotation-editor-e2e/
  annotation-vue/

docs/annotation-editor-site/
  .vuepress/
    config.js
    styles/
      config.scss
      index.scss
  annotation-api/
  annotation-core/
  annotation-editor/
  annotation-vue/
  README.md
```

---

## Step 1 — Copy packages to `libs/annotation-editor/`

Copy all 5 packages from `../annotation-editor/packages/*` into `libs/annotation-editor/`.

---

## Step 2 — Fix package.json files

### `annotation-api/package.json`
- `@ghentcdh/w3c-utils`: `"1.0.6"` → `"^1.0.10"`
- `@ghentcdh/annotation-core: "workspace:*"` — keep, pnpm resolves within monorepo
- Add `exports` field (missing) — follow pattern of other libs

### `annotation-core/package.json`
- `@ghentcdh/w3c-utils`: `"^1.0.6"` → `"^1.0.10"`
- `@ghentcdh/annotated-text`: `"^1.0.9"` → `"^1.0.10"`
- Add `exports` field (missing)

### `annotation-editor/package.json`
- Has `exports` ✓ but missing `"type": "module"`, `"main"`, `dependencies`, and `peerDependencies`
- Add dependencies: `annotation-core`, `annotation-vue`, `@ghentcdh/ui`, `@ghentcdh/json-forms-vue`

### `annotation-editor-e2e/package.json`
- Empty deps — add playwright devDependency to match `libs/ui-e2e`

### `annotation-vue/package.json`
- `@ghentcdh/annotated-text`: `"^1.0.9"` → `"^1.0.10"`
- `vue-router` peer: `"^4.0.0"` → `"^5.0.0"` (monorepo uses `5.0.3`)
- `@ghentcdh/w3c-utils`: `"*"` → `"^1.0.10"`
- Add `exports` field (missing)

---

## Step 3 — Merge `tsconfig.base.json` paths

Add to `ghentcdh/tsconfig.base.json` (paths updated from `packages/` to `libs/annotation-editor/`):

```json
"@ghentcdh/annotation-api":    ["libs/annotation-editor/annotation-api/src/index.ts"],
"@ghentcdh/annotation-core":   ["libs/annotation-editor/annotation-core/src/index.ts"],
"@ghentcdh/annotation-editor": ["libs/annotation-editor/annotation-editor/src/index.ts"],
"@ghentcdh/annotation-vue":    ["libs/annotation-editor/annotation-vue/src/index.ts"]
```

---

## Step 4 — Update `pnpm-workspace.yaml`

`libs/**` already covers the new nested paths — no change needed.

---

## Step 5 — Merge dev dependencies into root `package.json`

annotation-editor uses newer versions of some packages. Promote to monorepo root:
- `nx`: `22.7.1` (check current monorepo version)
- `vite`: `8.x`
- `typescript`: `~5.9.2`
- `@vitejs/plugin-vue`, `@vue/test-utils`, `vitest`, etc.

Run `pnpm install` after merging.

---

## Step 6 — Create `docs/annotation-editor-site/`

New VuePress site following the same pattern as `ui-site` and `core-site`:

- `.vuepress/config.js` with vite aliases pointing to `libs/annotation-editor/*/src/index.ts`
- `.vuepress/styles/config.scss` — theme color only (no UI style import)
- `.vuepress/styles/index.scss` — same sidebar width fixes as other sites
- Sidebar sections: annotation-core → annotation-api → annotation-vue → annotation-editor
- Empty `README.md` per package as starting point for docs

---

## Step 7 — Update `docs/project.json`

Add new target:
```json
"build:annotation-editor": {
  "executor": "nx:run-commands",
  "dependsOn": ["build:menu"],
  "options": {
    "command": "vuepress build docs/annotation-editor-site"
  }
}
```

Update `build` to depend on all three: `build:ui`, `build:core`, `build:annotation-editor`.

Update `serve` to run all three in parallel:
```json
"commands": [
  "vuepress dev docs/ui-site --port 8081",
  "vuepress dev docs/core-site --port 8082",
  "vuepress dev docs/annotation-editor-site --port 8083"
]
```

---

## Step 8 — Update `.github/workflows/publish-docs.yml`

Add third build+deploy step:
```yaml
- name: Build annotation-editor site
  run: DOCS_BASE=/ghentcdh-monorepo/annotation-editor npx nx run docs:build:annotation-editor

- name: Merge annotation-editor into dist-pages
  run: cp -r docs/annotation-editor-site/.vuepress/dist/. dist-pages/annotation-editor/
```

Update root `index.html` redirect or replace with a landing page linking all three sites.

---

## Status

- [ ] Step 1 — Copy packages
- [ ] Step 2 — Fix package.json files
- [ ] Step 3 — Merge tsconfig paths
- [ ] Step 4 — pnpm-workspace.yaml (no change needed)
- [ ] Step 5 — Merge dev dependencies
- [ ] Step 6 — Create annotation-editor-site
- [ ] Step 7 — Update docs/project.json
- [ ] Step 8 — Update publish-docs.yml
