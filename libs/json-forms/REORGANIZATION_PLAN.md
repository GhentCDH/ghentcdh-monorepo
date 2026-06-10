# json-forms-vue & json-forms-api — File organization review & plan

Reviewed against `CLAUDE.md` conventions (file naming, composables, import order, barrels).

## Summary

`json-forms-api` is small and mostly fine (one barrel gap). `json-forms-vue` has
real inconsistencies: three competing file-naming styles, a `composable/` folder
that breaks the `useX` convention, a confusing double `renderers` tree, and several
typo'd public exports.

---

## json-forms-api

Current:
```
api/src/index.ts
api/src/lib/json-forms-api.module.ts
api/src/lib/request.model.ts
api/src/lib/response.model.ts
```

Issues:
- `index.ts` exports `response.model` and `request.model` but **not** `json-forms-api.module` — either dead code or a missing export.
- Barrel order is reversed (response before request); convention is alphabetized.

Fix (low effort):
1. Decide whether `json-forms-api.module.ts` is public; export it or remove it.
2. Alphabetize the barrel (`request` before `response`).

---

## json-forms-vue

### 1. Inconsistent file naming (3 styles in one lib)

CLAUDE.md says components are `ComponentName.vue` (PascalCase) and props live in
`ComponentName.properties.ts`. Current tree mixes PascalCase, dot-case and kebab-case:

| Current | Style | Should be |
|---|---|---|
| `forms/FormComponent.vue` | PascalCase ✓ | keep |
| `forms/modal/FormModal.vue` | PascalCase ✓ | keep |
| `table/table.component.vue` | dot-case ✗ | `table/TableComponent.vue` |
| `table/table.component.properties.ts` | dot-case ✗ | `table/TableComponent.properties.ts` |
| `table/filter/table-filter.vue` | kebab ✗ | `table/filter/TableFilter.vue` |
| `table/filter/FilterRowInput.vue` | PascalCase ✓ | keep |
| `view/modal/ViewModalProperties.ts` | missing `.properties` ✗ | `view/modal/ViewModal.properties.ts` |
| `repository/crud.repository.ts` | dot-case ✗ | `repository/CrudRepository.ts` (or keep `.ts` lowercase if treated as plain module) |

### 2. Composables don't follow `useFeatureName.ts` in `composables/`

Convention: composables named `useX.ts`, co-located in a `composables/` folder.

Good: `composables/useFormEvents.ts`, `composables/useHttpClient.ts`,
`forms/renderers/controls/readonly/useDisplayValue.ts`.

Broken — PascalCase `Use*` in a singular `composable/` folder:
```
forms/renderers/controls/composable/UseControlBinding.ts   → useControlBinding.ts
forms/renderers/controls/composable/UseFetchOption.ts      → useFetchOption.ts
forms/renderers/controls/composable/UseInput.ts            → useInput.ts
forms/renderers/controls/composable/UseSelectBinding.ts    → useSelectBinding.ts
forms/renderers/controls/composable/resource.ts            → (helper, not a composable — move/rename)
```
Rename to `useX.ts` and rename the folder `composable/` → `composables/`.

### 3. Typos in public exports & filenames

These leak into the public API (`index.ts`) and are easy to misuse:
- `customRenderes` → `customRenderers`
- `layoutRenderes` / `LayoutRenders.ts` → `layoutRenderers` / `LayoutRenderers.ts`
- `forms/renderers/array/ArrayRenderers.ts` exports `arrayRenderers` ✓ (keep as the naming template)
- `forms/renderers/controls/index.ts` exports `export const index = [...]` — rename to
  `controlRenderers` (an export literally named `index` is a footgun).

### 4. Confusing double `renderers` tree + ambiguous barrel

Two unrelated things both called "renderers":
```
vue/src/renderers/            ← testers only (tester.ts, jsonforms-testers.ts)
vue/src/forms/renderers/      ← actual Vue renderer components
```
Plus three overlapping aggregation files:
```
forms/renderers.ts            ← exports customRenderes / readonlyRenderers
forms/renderers/index.ts      ← exports the same pieces again
forms/renderer-registry.ts    ← findRenderer + RendererEntry type
```
Having both `forms/renderers.ts` (file) and `forms/renderers/` (dir) is ambiguous —
`./renderers` resolves to the file, shadowing the dir barrel.

Also fragile: `forms/renderers/controls/index.ts` reaches up three levels into the
*other* tree (`../../../renderers/tester`).

Fix:
- Rename the testers folder `vue/src/renderers/` → `vue/src/testers/` to remove the name clash.
- Collapse `forms/renderers.ts` into `forms/renderers/index.ts` (single barrel).
- Keep `renderer-registry.ts` but move it under `forms/renderers/` as `registry.ts`.

### 5. Public barrel (`vue/src/index.ts`) ordering

Currently mixes deep paths, a `.properties` `export *`, and component exports in no
clear order. Convention: external → `@ghentcdh/**` → internal → index, alphabetized,
newline between groups. Re-group: types, composables, components, services, renderers.
Avoid `export *` from a `.properties` file — export only the intended public types.

### 6. Minor structure notes

- `view/` holds only `modal/ViewModal.*`; fold into a clearer location or keep but be consistent with `forms/modal/`.
- `table/cells/index.ts` and `table/index.ts` are fine; `testing/index.ts` is an empty placeholder — fill or remove.

---

## Proposed target layout (vue/src)

```
composables/                     # all useX.ts here
  useFormEvents.ts
  useHttpClient.ts
testers/                         # renamed from renderers/ (testers only)
  jsonforms-testers.ts
  tester.ts
  __tests__/
forms/
  FormComponent.vue
  FormComponent.properties.ts
  Dispatch.vue
  errorMessages.ts
  errorMode.ts
  scope.ts
  types.ts
  modal/
    FormModal.vue / .properties.ts / FormModalService.ts
  renderers/
    index.ts                     # single barrel (absorbs renderers.ts)
    registry.ts                  # renamed from ../renderer-registry.ts
    array/ ArrayRenderer.vue, ArrayRenderers.ts
    layout/ LayoutRenderer.vue, CollapseLayoutRenderer.vue, LayoutRenderers.ts, colspan.ts
    controls/
      index.ts                   # export const controlRenderers (not `index`)
      *ControlRenderer.vue
      composables/               # useControlBinding.ts, useFetchOption.ts, useInput.ts, useSelectBinding.ts
      readonly/ *ReadonlyRenderer.vue, useDisplayValue.ts, formatDate.ts, constants.ts, __tests__/
table/
  TableComponent.vue / .properties.ts
  TableToolbar.vue
  cells/ index.ts
  filter/ TableFilter.vue, FilterRowInput.vue
repository/
  CrudRepository.ts / index.ts
http-client.ts
index.ts
```

---

## Execution plan (phased, low-risk first)

**Phase 1 — zero-risk barrel/export cleanups**
1. api: fix barrel (alphabetize, decide on module export).
2. vue: fix typos `customRenderes`→`customRenderers`, `layoutRenderes`/`LayoutRenders`→`layoutRenderers`/`LayoutRenderers`, and `export const index`→`controlRenderers`. Update all references + `index.ts`.
3. vue: regroup and alphabetize `vue/src/index.ts`; stop `export *` from a `.properties` file.

**Phase 2 — composables**
4. Rename `forms/renderers/controls/composable/` → `composables/`, files `Use*.ts`→`use*.ts`; move `resource.ts` out (it's a helper, not a composable). Update imports.

**Phase 3 — renderers de-collision**
5. Rename `vue/src/renderers/` → `vue/src/testers/`; update imports.
6. Merge `forms/renderers.ts` into `forms/renderers/index.ts`; move `renderer-registry.ts` → `forms/renderers/registry.ts`.

**Phase 4 — component file renames**
7. `table.component.*`→`TableComponent.*`, `table-filter.vue`→`TableFilter.vue`, `crud.repository.ts`→`CrudRepository.ts`, `ViewModalProperties.ts`→`ViewModal.properties.ts`. Use `git mv` to preserve history.

**Verification after each phase**
- `npx nx run json-forms-vue:lint` and `:test`, `npx nx run json-forms-api:build`.
- `npx nx affected -t build,test --base=origin/main` before finishing.
- Grep for old identifiers/paths to confirm no stragglers.

Notes: every change is rename/move only — no behavior change. Do each phase as its own
Conventional Commit (`refactor(json-forms-vue): ...`) so it's easy to review and revert.
```
