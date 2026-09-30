# Dependency Audit

Goal: list third-party runtime dependencies per published package and reduce reliance on external code to a minimum. Only **runtime** deps (`dependencies` + `peerDependencies`) ship to consumers — `devDependencies` do not, so they matter less for "relying on others".

## Runtime dependencies per package

| Package | `dependencies` (bundled into the package) | `peerDependencies` (consumer must provide) |
|---|---|---|
| `@ghentcdh/authentication-api` | `tslib` | `@nestjs/common`, `@nestjs/axios`, `@nestjs/config`, `@nestjs/swagger`, `rxjs` |
| `@ghentcdh/authentication-vue` | — | `keycloak-js`, `vue` |
| `@ghentcdh/json-forms-api` | `tslib` | `@anatine/zod-nestjs`, `@anatine/zod-openapi`, `@ghentcdh/json-forms-core`, `@nestjs/common`, `zod` |
| `@ghentcdh/json-forms-core` | — | `@jsonforms/core`, `zod` |
| `@ghentcdh/json-forms-vue` | **`@jsonforms/core`**, `vee-validate`, `zod` | `@playwright/test` (opt), `@ghentcdh/json-forms-core`, `@ghentcdh/ui`, `vue`, `vue-router` |
| `@ghentcdh/tools-api` | `tslib`, `log4js` | `@nestjs/axios`, `@nestjs/common`, `@nestjs/config`, `@nestjs/terminus` |
| `@ghentcdh/tools-vue` | `axios` | `vue` |
| `@ghentcdh/ui` | **`@tiptap/pm`**, **`@tiptap/starter-kit`**, **`@tiptap/vue-3`**, **`tiptap-markdown`** | `@ghentcdh/json-forms-core`, `@playwright/test` (opt), `vue`, `vue-router` |

`tslib` is a TypeScript runtime helper (negligible) and is fine everywhere.

## Reduction opportunities

Ordered by impact / confidence.

### 1. Demote `@jsonforms/core` to a type-only dev dependency — high impact

`json-forms-vue` declares `@jsonforms/core` as a real runtime `dependency`, but across all 31 files the only **runtime** (value) usage is six trivial tester combinators:

```
rankWith, uiTypeIs, schemaTypeIs, isBooleanControl, and, or
```

Everything else (`JsonSchema`, `Layout`, `UISchemaElement`, `ControlElement`, `TextControl`, …) is `import type` — types add zero runtime weight. The project already ships its own renderer registry (`findRenderer`, `RendererEntry`, `renderers/tester.ts`), so it no longer needs the jsonforms framework at runtime.

**Action:** reimplement those ~6 helpers locally (≈30 LOC — they are one-liners over `uischema.type` / schema type), then move `@jsonforms/core` from `dependencies` to `devDependencies` (types only) in both `json-forms-vue` and `json-forms-core`. This removes a third-party framework from what consumers install.

### 2. Remove `@heroicons/vue` — unused, quick win

It is a **root `dependency`** but has **zero imports in source**. The UI library has its own icon system (`libs/ui/src/icons/icon-list.ts`). The only reference is two `optimizeDeps.include` lines in `libs/ui/vite.config.ts`.

**Action:** delete `@heroicons/vue` from root `package.json` and remove the two `@heroicons/vue/24/...` lines from `libs/ui/vite.config.ts`.

### 3. Remove `@types/lodash` and `@types/lodash-es` — unused

Neither `lodash` nor `lodash-es` is imported anywhere in `libs/`. Both `@types/*` packages in root `devDependencies` are dead weight. (Note: `CLAUDE.md` still mandates "lodash-es only" — that rule has no current consumers and could be dropped from the conventions too.)

**Action:** remove both `@types/lodash*` from root `devDependencies`.

### 4. Make TipTap optional in `@ghentcdh/ui` — biggest install-size win

All four TipTap packages (`@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/vue-3`, `tiptap-markdown`) exist for a **single component**: `libs/ui/src/form/text/Markdown.vue`. Today every consumer of the UI library is forced to install a full ProseMirror editor even if they never render Markdown.

**Action:** move the four packages from `dependencies` to `peerDependencies` with `peerDependenciesMeta` marking them `optional`, and lazy-load `Markdown.vue` (e.g. `defineAsyncComponent`) so the editor is only pulled in when used. Consumers who need Markdown opt in by installing TipTap themselves.

### 5. Pin `vee-validate` to a stable release — risk reduction

Root pins `vee-validate: 5.0.0-beta.1` (a **beta**), while `json-forms-vue` allows `>=4.0.0`. Depending on a beta of an external library is exactly the kind of fragile reliance to avoid.

**Action:** pin to the latest stable `vee-validate@4.x` at root and set a matching range (`^4.x`) in `json-forms-vue`. (Verify the v4 API matches current usage: `useForm`, `useField`, `useFieldArray`, `useFieldValue`, `useFormContext`.)

### 6. Lower priority / keep

- **`log4js` (tools-api)** — used only in `logging/logger.ts`. Legit, but heavyweight; if you want one fewer external dep you could fall back to Nest's built-in `Logger`. Optional.
- **`axios` (tools-vue)**, **`@anatine/zod-nestjs` / `zod-openapi` (json-forms-api)**, **`keycloak-js` (authentication-vue)**, **`@nestjs/*` peers**, **`zod`**, **`vue` / `vue-router`** — all genuinely used and reasonable to keep. They are already correctly declared as peers where appropriate.

## Summary of recommended removals

| Dependency | Where | Verdict |
|---|---|---|
| `@heroicons/vue` | root `dependencies` | **Remove** — unused |
| `@types/lodash` | root `devDependencies` | **Remove** — unused |
| `@types/lodash-es` | root `devDependencies` | **Remove** — unused |
| `@jsonforms/core` | `json-forms-vue` / `core` `dependencies` | **Demote to type-only** after inlining 6 helpers |
| `@tiptap/*` + `tiptap-markdown` | `ui` `dependencies` | **Move to optional peer** + lazy-load |
| `vee-validate@5.0.0-beta.1` | root | **Repin to stable 4.x** |

Net effect: the UI package stops forcing a ProseMirror editor on every consumer, the json-forms-vue package stops shipping a forms framework it barely uses, and three orphaned packages leave the tree.
