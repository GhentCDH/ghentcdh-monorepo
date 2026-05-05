# Conventions

## Project overview

- NX monorepo (`nx@22.5.2`) with `pnpm@10.1.0`
- Build: Vite 7 + `vite-plugin-dts` for lib builds (CJS + ESM)
- Docs: VuePress 2 + `vuepress-theme-hope`

## Path aliases

```
@ghentcdh/authentication-api  → libs/authentication/api/src/index.ts
@ghentcdh/authentication-vue  → libs/authentication/vue/src/index.ts
@ghentcdh/core/types          → libs/core/types/src/index.ts
@ghentcdh/json-forms-api      → libs/json-forms/api/src/index.ts
@ghentcdh/json-forms-core     → libs/json-forms/core/src/index.ts
@ghentcdh/json-forms-vue      → libs/json-forms/vue/src/index.ts
@ghentcdh/tools-api           → libs/tools/api/src/index.ts
@ghentcdh/tools-vue           → libs/tools/vue/src/index.ts
@ghentcdh/ui                  → libs/ui/src/index.ts
```

## Library structure

Each lib follows:
```
lib-name/
├── src/index.ts          # barrel export
├── project.json          # NX project config
├── vite.config.ts
├── tsconfig.lib.json
└── package.json
```

## NX commands

```sh
npx nx run <project>:build        # build single lib
npx nx run <project>:test         # test single lib
npx nx run <project>:lint         # lint single lib
npx nx run-many -t build          # build all
npx nx affected -t test --base=origin/main  # test affected
```

## Module boundaries (ESLint scope tags)

| Source tag | Can depend on |
|---|---|
| `scope:shared` | `scope:shared` only. Banned: `@vue/*`, `@nestjs/*` |
| `scope:tool` | `scope:tool`, `scope:shared` |
| `scope:feature` | `scope:feature`, `scope:tool`, `scope:shared` |
| `scope:api` | `scope:api`, `scope:shared`, `scope:tool`. Banned: `@vue/*` |
| `scope:ui` | `scope:ui`, `scope:shared`, `scope:tool`, `scope:generated`. Banned: `@nestjs/*` |
| `app:api` | `scope:api`, `scope:shared`, `scope:tool`, `scope:feature`. Banned: `@vue/*` |
| `app:ui` | `scope:ui`, `scope:shared`, `scope:tool`, `scope:feature`. Banned: `@nestjs/*` |

## Code style

- TypeScript strict mode, prefer `type` over `interface`
- Prefer arrow functions: `const functionName = () => {}`
- Prettier: single quotes (`"singleQuote": true`)
- `lodash-es` only (not `lodash`) — enforced by ESLint
- `@typescript-eslint/consistent-type-imports`: use `import type` for type-only imports
- Import order: external → `@ghentcdh/**` → internal → index, alphabetized, newline between groups

## Vue

- Vue 3.5 + `<script setup lang="ts">`
- `<template>` first, then `<script setup>`
- File: `ComponentName.vue`, props in `ComponentName.properties.ts`
- Props use Vue object syntax + `PropType` (see `/component` skill for full pattern)
- Composables in `composables/` folder next to component, named `useFeatureName.ts`

## Styling

- Tailwind CSS 4 + daisyUI 5, custom `ugent` theme
- SCSS for theme vars/utilities (`_scss/` folder)
- Tailwind utility classes in templates; no inline styles

## Testing

- Vitest (jsdom, globals enabled), Playwright for e2e
- `describe`/`it` blocks, mock with `vi.fn()` / `vi.spyOn()`
- Prefer `it.each` tagged template literal for tabular data; array syntax only for complex objects
- Co-locate tests as `*.spec.ts` in `__tests__/` folder next to source
- See `/test-file` skill for full pattern

## Documentation (docs/)

- `::: tabs` / `@tab Preview` / `@tab Vue` for all code examples
- Structure: Usage (with tabs) → Props/Events → `<script setup>` + `<ClientOnly>` → Examples (with tabs)
- See `/doc` skill for full pattern

## Key dependencies

| Package | Version |
|---|---|
| Vue | 3.5.29 |
| TypeScript | 5.9.3 |
| Zod | 4.3.6 |
| TipTap | 3.20.0 |
| Tailwind CSS | 4.x |
| daisyUI | 5 |
| Vite | 7.3.1 |

## Common APIs (quick reference)

- `useApi()` from `@ghentcdh/tools-vue` — axios singleton with auth. Methods: `.get()`, `.post()`, `.patch()`, `.delete()`
- `NotificationService` from `@ghentcdh/ui` — static methods: `.success()`, `.error()`, `.warning()`, `.info()`
- `FormStore` from `@ghentcdh/json-forms-vue` — class-based CRUD store with `save(id, data)` and `delete(data)`
- `ControlBuilder` / `LayoutBuilder` from `@ghentcdh/json-forms-core` — fluent API for UI schemas
- Runtime config: `getRuntimeConfig()` from `@ghentcdh/tools-vue` (loaded from `/config.json`, not env vars)
- Barrel exports: `.vue` files use `export { default as Name }`, `.ts` files use `export * from`

For full patterns + examples: see `.claude/docs/patterns.md`

## Git

- Conventional Commits (enforced by commitlint + husky)
