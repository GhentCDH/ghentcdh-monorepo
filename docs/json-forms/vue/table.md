# Table

The `TableComponent` renders a data table driven by a JSON schema and UI schema. It fetches paginated data from a URI, supports sorting, filtering, and custom row actions. It is typically used inside `FormWithTableComponent` but can also be used standalone.

## Usage

::: tabs

@tab Vue

```vue
<template>
  <TableComponent
    id="users-table"
    :ui-schema="tableUiSchema"
    :schema="tableSchema"
    :filter-ui-schema="filterUiSchema"
    :filter-schema="filterSchema"
    uri="/api/users"
    @edit="onEdit"
    @delete="onDelete"
  />
</template>

<script setup>
import { TableComponent } from '@ghentcdh/json-forms-vue';

const onEdit = (data) => {
  console.log('edit', data);
};

const onDelete = (data) => {
  console.log('delete', data);
};
</script>
```

:::

## Props

| Prop             | Type            | Required | Default | Description                                                       |
| ---------------- | --------------- | -------- | ------- | ----------------------------------------------------------------- |
| `id`             | `String`        | true     | —       | Unique identifier for the table store instance                    |
| `uiSchema`       | `Layout`        | true     | —       | UI schema defining the table columns                              |
| `schema`         | `JsonSchema`    | true     | —       | JSON schema describing the data shape                             |
| `filterUiSchema` | `Layout`        | false    | —       | UI schema for the filter controls above the table                 |
| `filterSchema`   | `JsonSchema`    | false    | —       | JSON schema for the filter data                                   |
| `uri`            | `String`        | true     | —       | URI to fetch paginated table data from                            |
| `reload`         | `Number`        | false    | —       | Change this value (e.g. `Date.now()`) to trigger a table reload   |
| `actions`        | `TableAction[]` | false    | —       | Custom action buttons rendered in each table row                  |

## Events

| Event    | Payload        | Description                                          |
| -------- | -------------- | ---------------------------------------------------- |
| `edit`   | `data: unknown` | Emitted when a row's edit action is triggered        |
| `delete` | `data: unknown` | Emitted when a row's delete action is triggered      |

## Behaviour

- The table uses `useTableStore` for state management (pagination, sorting, filters, data fetching).
- Column definitions are derived from the `uiSchema` elements mapped against the `schema` via `findColumnDef`.
- When `filterUiSchema` and `filterSchema` are both provided, a `TableFilter` bar is rendered above the table.
- Sorting and pagination are handled internally through the store and reflected in the API requests.
