# Autocomplete with Resource

The autocomplete control supports a **resource-based** configuration that connects to a REST API resource. Instead of providing static options or a raw URI, you point the control at a resource endpoint. The resource descriptor defines available CRUD operations, a lookup endpoint, and optionally a JSON Schema for inline creation of new entries.

## How it works

1. The `ControlBuilder.autocomplete()` method accepts a `resource` option pointing to a resource descriptor URI.
2. At runtime, the resource descriptor is fetched and validated against `ResourceSchema`.
3. The `lookup` operation is used to search for autocomplete suggestions.
4. If the resource supports `create` and includes a JSON Schema, a modal form is rendered allowing inline creation of new entries directly from the dropdown.
5. When no UI schema is provided in the resource, one is auto-generated as a `GridLayout` via `uiFromJsonSchema`.

## Resource descriptor

The API must return a JSON object matching the following shape:

```json
{
  "id": "author",
  "uri": "/api/authors",
  "operations": {
    "findAll": true,
    "findOne": true,
    "create": true,
    "update": true,
    "delete": true,
    "lookup": { "uri": "/api/authors/search?q={text}", "method": "get" }
  },
  "schema": {
    "data": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "email": { "type": "string" }
      },
      "required": ["name"]
    }
  }
}
```

### Operations

Each operation can be:

| Value | Behavior |
|-------|----------|
| `true` | Uses the base `uri` with the default HTTP method |
| `false` or omitted | Disabled |
| `string` | Custom URI, defaults to `GET` |
| `{ uri, method }` | Fully custom endpoint |

Default HTTP methods per operation:

| Operation | Default method |
|-----------|---------------|
| `findAll` | `GET` |
| `findOne` | `GET` |
| `create` | `POST` |
| `update` | `GET` |
| `delete` | `DELETE` |
| `lookup` | `GET` |

### Schema

| Field | Required | Description |
|-------|----------|-------------|
| `schema.data` | Yes (if schema provided) | JSON Schema describing the resource entity |
| `schema.ui` | No | UI schema for the create form. If omitted, auto-generated as a `GridLayout` |

## Usage

::: tabs

@tab Vue

```vue
<template>
  <JsonForm
    id="my-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :form-data="formData"
    @change="formData = $event"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JsonForm } from '@ghentcdh/json-forms-vue';
import { ControlBuilder, LayoutBuilder } from '@ghentcdh/json-forms-core';

type Book = {
  title: string;
  author: unknown;
};

const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    author: { type: 'object' },
  },
};

const uiSchema = LayoutBuilder.grid<Book>()
  .addControls(
    ControlBuilder.properties<Book>('title'),
    ControlBuilder.properties<Book>('author').autocomplete({
      resource: '/api/resources/author',
      labelKey: 'name',
      valueKey: 'id',
    }),
  )
  .build();

const formData = ref({});
</script>
```

:::

## Builder API

### Remote URI autocomplete

For simple search endpoints without a full resource descriptor:

```ts
ControlBuilder.properties<Book>('author').autocomplete({
  uri: '/api/authors/search?q=',
  labelKey: 'name',
  valueKey: 'id',
  dataField: 'data',
});
```

### Resource-based autocomplete

For full CRUD resource integration with inline create support:

```ts
ControlBuilder.properties<Book>('author').autocomplete({
  resource: '/api/resources/author',
  labelKey: 'name',
  valueKey: 'id',
});
```

### Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `resource` | `string` | Yes* | — | URI to the resource descriptor endpoint |
| `uri` | `string` | Yes* | — | Direct search URI (alternative to `resource`) |
| `labelKey` | `string` | No | — | Property name used as the display label |
| `valueKey` | `string` | No | — | Property name used as the value |
| `dataField` | `string` | No | `'data'` | Key in the API response containing the results array |
| `skipAuth` | `boolean` | No | `false` | Skip authenticated API client, use plain axios |
| `freeText` | `boolean` | No | `false` | Allow free-text entry |
| `enableCreate` | `boolean` | No | `false` | Enable inline create (auto-detected from resource) |

\* Either `resource` or `uri` must be provided.

## Auto-generated UI schema

When a resource descriptor includes `schema.data` (JSON Schema) but no `schema.ui`, the `uiFromJsonSchema` function generates a GridLayout automatically:

```ts
import { uiFromJsonSchema } from '@ghentcdh/json-forms-core';

const jsonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
  },
};

const uiSchema = uiFromJsonSchema(jsonSchema);
// Result:
// {
//   type: 'GridLayout',
//   elements: [
//     { type: 'Control', scope: '#/properties/name', options: { ... } },
//     { type: 'Control', scope: '#/properties/email', options: { ... } },
//   ],
//   options: {}
// }
```

Each control defaults to full width (`col-span-12`) within the 12-column grid.

## Inline create flow

When the resource supports a `create` operation and provides a JSON Schema:

1. User clicks the create action in the autocomplete dropdown.
2. A modal opens with a `JsonForm` rendered from the resource schema.
3. On submit, the `create` operation URI is called with the form data.
4. The newly created entity is set as the selected value.
