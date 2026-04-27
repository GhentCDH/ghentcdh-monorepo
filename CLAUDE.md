Here's the compressed version:

# Conventions

## Project overview

- NX monorepo (`nx@22.5.2`) with `pnpm@10.1.0`
- Libs: `ui`, `authentication/{api,vue}`, `core/types`, `json-forms/{api,core,vue}`, `tools/{api,vue}`
- Build: Vite 7 + `vite-plugin-dts` for lib builds (CJS + ESM)
- Docs: VuePress 2 + `vuepress-theme-hope`

## Code style

- TypeScript strict mode
- pnpm package management
- NX monorepo conventions
- Prefer `type` over `interface`
- Prefer arrow functions: `const functionName = () => {}`
- Prettier: single quotes (`"singleQuote": true`)
- ESLint flat config, scope-based module boundary constraints

## Vue

- Vue 3.5 + `<script setup lang="ts">`
- `<template>` first, then `<script setup>`
- File: `ComponentName.vue`, props in `ComponentName.properties.ts`
- Props use Vue object syntax + `PropType`:

```ts
import type { PropType } from 'vue';

export const MyComponentProperties = {
  options: { type: Array as PropType<Array<any>>, required: true },
  labelKey: { type: String, default: 'label' },
};

export const MyComponentEmits = ['update:modelValue', 'select'];
```

- Composables in `composables/` folder next to component
- Naming: `useFeatureName.ts` (e.g., `useSearch.ts`, `useOptions.ts`)

## Styling

- Tailwind CSS 4 + daisyUI 5, custom `ugent` theme
- SCSS for theme vars/utilities (`_scss/` folder)
- Tailwind utility classes in templates; no inline styles

## Testing

- Vitest for unit tests (jsdom, globals enabled)
- Playwright for e2e
- `describe`/`it` block structure
- Mock: `vi.fn()` / `vi.spyOn()`
- Prefer table testing via `it.each` tagged template literal when input simple/tabular:

```ts
it.each`
  name           | style
  ${'error'}     | ${errorStyle}
  ${'warning'}   | ${warningStyle}
`('should handle "$name"', ({ name, style }) => {
  // ...
});
```

- Array syntax for `it.each` only when rows contain functions/complex objects
- Co-locate tests as `*.spec.ts` in `__tests__/` folder next to source

## Documentation (docs/)

- `::: tabs` / `@tab Preview` / `@tab Vue` for all code examples
- Structure: Usage (with tabs) → Props/Events/details → Examples (with tabs)
- Usage shows primary use case with Preview + Vue tabs
- Examples show variants (required, errors, custom keys, etc.) each with Preview + Vue tabs
- `<script setup>` block + `<ClientOnly>` wrapper between details and examples sections

## Git

- Conventional Commits (enforced by commitlint)
- Husky for pre-commit hooks