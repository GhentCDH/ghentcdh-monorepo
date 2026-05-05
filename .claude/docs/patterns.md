# Code Patterns Reference

Read this file when working on features that touch API calls, forms, notifications, or styling.

## API calls

`useApi()` from `@ghentcdh/tools-vue` — singleton axios instance with auth token injection and 401 redirect.

```ts
import { useApi } from '@ghentcdh/tools-vue';

useApi().get(uri);
useApi().post(uri, data);
useApi().patch(`${uri}/${id}`, data);
useApi().delete(`${uri}/${id}`);
```

Also available: `apiNoAuth` for public endpoints.

Runtime config loaded from `/config.json` (not build-time env vars):
```ts
import { getRuntimeConfig, loadRuntimeConfig } from '@ghentcdh/tools-vue';
// loadRuntimeConfig() called once at app startup
// getRuntimeConfig().API_URL used for base URL
```

## Notifications

`NotificationService` from `@ghentcdh/ui` — static singleton methods:

```ts
import { NotificationService } from '@ghentcdh/ui';

NotificationService.success('Data saved');
NotificationService.error('Error saving data');
NotificationService.warning('Warning message');
NotificationService.info('Info message');
```

## FormStore

Class-based store in `@ghentcdh/json-forms-vue`:

```ts
import { FormStore } from '@ghentcdh/json-forms-vue';

const store = new FormStore('/api/entities');
await store.save(id, data);    // POST (new) or PATCH (existing)
await store.delete(data);      // DELETE by data.id
```

## Provide/Inject

Auth: `createAuth()` installs as Vue plugin, provides via Symbol.
Form events: `provideFormEvents(dispatch)` / `useFormEvents()` from `@ghentcdh/json-forms-vue`.

## ControlBuilder / LayoutBuilder (UI Schema)

Fluent API from `@ghentcdh/json-forms-core`:

```ts
import { ControlBuilder, LayoutBuilder } from '@ghentcdh/json-forms-core';

const uiSchema = LayoutBuilder.vertical<MyType>().addControls(
  LayoutBuilder.horizontal<MyType>().addControls(
    ControlBuilder.properties('name'),
    ControlBuilder.properties('age').width('xs'),
  ),
  ControlBuilder.properties('select').select({
    options, labelKey: 'name', valueKey: 'id',
  }),
  ControlBuilder.properties('autocomplete').autocomplete({
    uri: '/api/search', labelKey: 'name', valueKey: 'id',
  }),
  ControlBuilder.properties('items').detail(
    LayoutBuilder.horizontal<ItemType>().addControls(
      ControlBuilder.properties('field'),
    ),
  ),
);
```

## Zod → JSON Forms flow

1. Define Zod schema (domain model + DTO)
2. `createSchema({ schema, dtoSchema, uiSchema, uri })` converts Zod → JSON Schema
3. Returns `FormSchemaModel` with `form`, `table`, `filter` layouts
4. NestJS side: `createZodDto(schema)` for API validation

## Barrel exports

Convention in `index.ts`:
- `.vue` files: `export { default as ComponentName } from './path/component.vue';`
- `.ts` files: `export * from './path/module';`
- Styles: `import './styles.scss';` (side-effect import)

## UGent Theme CSS Variables

```css
--ugent-corporate-blue: #1e64c8;
--ugent-corporate-blue-light: #e9f0fa;
--ugent-corporate-yellow: #ffd200;
--ugent-corporate-yellow-light: #fffae5;
--ugent-corporate-text-black: #202020;
--ugent-corporate-text-gray: #646464;
--ugent-border-gray: #CCCCCC;
--ugent-border-gray-light: #DDDDDD;
--ugent-inactive-gray: #B4B4B4;
```

daisyUI theme name: `ugent`. All border-radius set to `0rem` (sharp corners).