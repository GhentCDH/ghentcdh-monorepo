# Readonly Form Display — Redesign Plan

Design + implementation spec for improving the readonly (view) rendering of
json-forms records, as seen in the `ViewModal` (Metadata config, Text, Author, …).

Decisions locked: **label-left definition list**, **full redesign across all
field types**.

## Implementation status

- ✅ **Phase 1** — `ReadonlyField.vue` primitive (label-left, container-query
  responsive), `ReadonlyWrapper` delegates to it, shared `EMPTY_VALUE` token.
- ✅ **Phase 2** — Boolean Yes/No state; `DateReadonlyRenderer` + `isDateControl`
  tester + `formatDate` util (UTC default, optional relative). Specs added.
- ✅ **Phase 3** — `SelectReadonlyRenderer` renders relations as one inline
  clickable chip (label + view icon), plain text when no `resource`.
- ⏭️ **Phase 4** — skipped for now (the readonly array/table path needs its own
  investigation; the screenshot tables may be app-level custom renderers).
- ✅ **Phase 5** — `GridLayout` is responsive (`grid-cols-1` → `md:grid-cols-12`).

Note on label-left: in **multi-column** grid layouts each field cell is narrow,
so `ReadonlyField`'s container query keeps the label stacked on top; fields only
go **label-left** when they have room (full-width / `col-span-12`). To get the
definition-list look everywhere, author the uischema with single-column rows.

> Suggested final home: `.claude/docs/readonly-form-redesign.md` (move there when
> ready; that path was write-protected in this session).

## Goal

Make readonly records dense, scannable, and consistent. Today every field is a
stacked `legend` + value box in a 12-col grid, producing excess whitespace,
misaligned columns, raw ISO dates, ambiguous booleans, and detached relation
controls.

## Current architecture (as-is)

| Concern | File |
|---|---|
| View modal shell | `libs/json-forms/vue/src/view/modal/ViewModal.vue` |
| Control wrapper (label + value) | `libs/ui/src/form/core/ControlWrapper.vue` |
| Readonly value box | `libs/ui/src/form/core/ReadonlyWrapper.vue` |
| Layout (grid/flex + colspan) | `libs/json-forms/vue/src/forms/renderers/layout/LayoutRenderer.vue`, `colspan.ts` |
| Readonly renderers + registry | `libs/json-forms/vue/src/forms/renderers/controls/readonly/` (`index.ts`) |
| One-to-many (arrays/tables) | `libs/json-forms/vue/src/forms/renderers/array/ArrayRenderer.vue` |
| Relation "view" event | `SelectReadonlyRenderer.vue` → `useFormEvents` → `ViewModal` re-emits `view` |

Renderer registry (`readonly/index.ts`): String, Number, Boolean, Select,
MultiSelect, Object, Markdown — keyed by testers in
`renderers/tester.ts`. Layout `GridLayout` = `grid grid-cols-12 gap-3`, children
wrapped in `COLSPAN[opts.colspan ?? 12]`.

### Problems

1. `ControlWrapper` stacks `legend mb-2` over a `p-2` value → ~3 lines per field.
2. Values across grid columns don't share a baseline → not scannable.
3. Dates render as raw ISO (`2026-02-06T07:53:03.159Z`); no formatter exists.
4. `BooleanReadonlyRenderer` shows a check when `true`, blank when `false` →
   indistinguishable from empty.
5. One-to-one / many-to-one: `SelectReadonlyRenderer` splits value (left) and eye
   button (right) into two cells → reads as unrelated.
6. Empty-state inconsistent (`-` in String, `—` in MultiSelect, blank in Boolean).
7. One-to-many tables overflow; content column truncates under action buttons.

## Target design

A **definition-list row**: muted fixed-width label column (~140px) on the left,
value on the right, subtle alternating row tint, rows aligned top-to-bottom.
Each field type gets a dedicated value treatment.

Row primitive (conceptual):

```
grid grid-cols-[140px_1fr]
  ├─ label cell:  text-sm text-base-content/60, bg-base-200 on alt rows
  └─ value cell:  text-sm, type-specific renderer
```

Density: ~9px vertical padding per row, no empty error `<p>` in readonly.

## Implementation

Centralized — most of the win comes from the wrapper + a few renderers.

### 1. Readonly row primitive — `libs/ui/src/form/core/`

Add a readonly layout mode rather than forking everything. Two viable shapes
(pick during impl):

- **A (preferred):** new `ReadonlyField.vue` that renders the label-left grid row
  and slots the value. `ReadonlyWrapper` delegates to it.
- **B:** add a `variant: 'inline' | 'stacked'` prop to `ControlWrapper`; readonly
  path passes `inline`.

Requirements:
- Label column fixed width, muted, `required` asterisk preserved.
- Drop the `min-h-8 p-2 pr-10` + empty `fieldset-label h-4` error line in
  readonly (already `hideErrors`, but the `<p>` still reserves height).
- Keep `label-action` slot (used by relation view button — see §2.3).
- Alternating row background handled by parent layout (nth-child) or a passed
  index — keep the primitive dumb.

### 2. Type-specific readonly renderers — `controls/readonly/`

**2.1 Boolean** (`BooleanReadonlyRenderer.vue`)
Explicit state, never blank: `Yes` (check, `text-success`) / `No` (x,
`text-base-content/50`). Empty → shared empty token.

**2.2 Date** (new `DateReadonlyRenderer.vue` + tester)
- Add `isDateFormat` / `isDateTimeFormat` tester in `renderers/tester.ts`.
- Register in `readonly/index.ts` (rank above generic string).
- Shared `formatDate(value, { withTime, relative })` util (place in
  `@ghentcdh/tools` or a `readonly/format.ts`). Output e.g.
  `5 Jun 2026, 07:27 · 4 days ago`. Locale via existing i18n if present.

**2.3 Select / one-to-one / many-to-one** (`SelectReadonlyRenderer.vue`)
Merge value + view affordance into one inline, clickable chip:
`<value> ⟶` (trailing `IconEnum.View`/external-link), emitting the existing
`view` event on click. Remove the separate right-aligned button column. Keep the
`appliedOptions.resource` guard for when no detail view exists.

**2.4 Empty-state token**
Single constant (`EMPTY = '— not set'` or just `'—'`) used by String, Number,
MultiSelect, Date, Select. Replace the current `-` / `—` / blank mix.

### 3. One-to-many — `array/ArrayRenderer.vue`

- Add a **readonly chip-list mode**: for short/simple item schemas, render items
  as clickable chips (avatar/initial + primary label + secondary origin +
  chevron) that fire the relation `view` event. Driven by an option, e.g.
  `options.readonlyDisplay: 'chips' | 'table'`.
- Keep table mode for rich rows but fix overflow: `table-layout: fixed`, move the
  action column out of the content flow, allow content to wrap instead of
  truncating under buttons.
- Standardize the empty state (`No data`) styling.

### 4. Layout — `layout/LayoutRenderer.vue`

- Make `GridLayout` responsive: `grid grid-cols-1 md:grid-cols-12 gap-3` so fixed
  colspans stop wrapping awkwardly in narrow modals.
- Ensure definition rows can align across columns (consistent label width).
- No change to flex Horizontal/Vertical layouts beyond gap review.

### 5. Modal shell — `view/modal/ViewModal.vue`

- Review default `modalSize` / width now that content is denser.
- Optional: header band with record title + id (the Text modal already shows
  `ID:` — make this a consistent pattern via a slot).

## Conventions to follow

- Vue 3.5 `<script setup lang="ts">`, `<template>` first.
- Props in `ComponentName.properties.ts` with `required: true as const`.
- daisyUI 5 + Tailwind 4 utility classes only; no inline styles. `ugent` theme.
- `lodash-es` only; `import type` for type-only imports; import order per CLAUDE.md.
- Co-locate `*.spec.ts` in `__tests__/`.

## Verification

- Vitest unit tests: new `DateReadonlyRenderer` (formatting + empty), Boolean
  false-state, empty-token consistency. Prefer `it.each` tabular form.
- Visual check the three reference modals: Metadata config, Text, Author —
  before/after.
- `npx nx run json-forms-vue:test` and `:lint`; check module-boundary tags
  (`scope:ui` must not pull `@nestjs/*`).

## Suggested phasing

1. Row primitive (§1) + empty token (§2.4) — lands the label-left layout.
2. Boolean (§2.1) + Date (§2.2) renderers + tests.
3. Select/relation inline chip (§2.3).
4. Array chip-list + table overflow fix (§3).
5. Responsive grid (§4) + modal polish (§5).
