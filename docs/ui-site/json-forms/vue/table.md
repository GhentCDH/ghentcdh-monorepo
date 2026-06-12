# Table

The `TableComponent` from `@ghentcdh/json-forms-vue` renders a data table whose columns are derived from a JSON `schema` and a `uiSchema`. It is a **controlled** component: it does not fetch or paginate data itself. The host supplies `data`, `page`, and `sort`, and the component emits `updatePage`, `updatePageSize`, `sort`, and `selectionChange` so the host can refetch.

Most applications use `JsonFormWithTable`, which wires the table to a repository for you. Reach for `TableComponent` directly when you need full control over data loading, or when composing your own toolbar.

## Usage

::: tabs

@tab Vue

```vue
<template>
  <TableComponent
    id="users-table"
    :schema="tableSchema"
    :ui-schema="tableUiSchema"
    :data="rows"
    :page="page"
    :sort="sort"
    @update-page="onUpdatePage"
    @update-page-size="onUpdatePageSize"
    @sort="onSort"
  />
</template>

<script setup>
import { ref } from 'vue';
import { TableComponent } from '@ghentcdh/json-forms-vue';

const rows = ref([]);
const page = ref({ page: 1, pageSize: 20, count: 0 });
const sort = ref(undefined);

const onUpdatePage = (p) => { page.value = { ...page.value, page: p }; fetchRows(); };
const onUpdatePageSize = (size) => { page.value = { ...page.value, pageSize: size }; fetchRows(); };
const onSort = (columnId) => { sort.value = nextSort(columnId); fetchRows(); };
</script>
```

:::

## Props

| Prop            | Type                   | Required | Default | Description                                                                 |
| --------------- | ---------------------- | -------- | ------- | --------------------------------------------------------------------------- |
| `id`            | `String`               | true     | —       | Unique identifier for the table instance                                    |
| `schema`        | `JsonSchema`           | true     | —       | JSON schema describing the data shape; column types are resolved from it    |
| `uiSchema`      | `Layout`               | true     | —       | UI schema whose `elements` define the displayed columns and their order     |
| `data`          | `any[]`                | false    | —       | Row objects to render. Each row should have an `id`                         |
| `page`          | `TablePage`            | false    | —       | Pagination state (`{ page, pageSize, count }`). Ignored when `hidePagination` is set |
| `sort`          | `TableSort`            | false    | —       | Current sort state, reflected in the column headers                         |
| `loading`       | `Boolean`              | false    | `false` | Replaces rows with a loading indicator                                      |
| `multiselect`   | `Boolean`              | false    | `false` | Renders selection checkboxes and emits `selectionChange`                    |
| `actions`       | `TableAction[]`        | false    | —       | Custom action buttons rendered in each row                                  |
| `cellRenderers` | `CellRendererEntry[]`  | false    | —       | Extra cell renderers, merged ahead of the defaults (see [Cell renderers](#cell-renderers)) |
| `hidePagination`| `Boolean`              | false    | `false` | Hides the pagination bar                                                     |
| `reload`        | `Number`               | false    | —       | Change this value (e.g. `Date.now()`) to force a re-render                   |

## Events

| Event            | Payload          | Description                                                  |
| ---------------- | ---------------- | ------------------------------------------------------------ |
| `updatePage`     | `page: number`   | Emitted when the user navigates to a different page          |
| `updatePageSize` | `size: number`   | Emitted when the user changes the page size                  |
| `sort`           | `columnId: string` | Emitted with the column id when a header is clicked        |
| `selectionChange`| `rows: any[]`    | Emitted when the selection changes (only when `multiselect`) |

## Columns

Columns come from `uiSchema.elements`. Each element is matched against the `schema` via `findColumnDef` to resolve the column type and id, and the element's `options.label` is used as the header label. A cell renderer is then chosen for each column from the renderer registry.

## Cell renderers

A cell renderer is an entry of `{ tester, renderer }`. The tester returns a numeric rank for a column element (or `-1` to opt out); the highest-ranked renderer wins. The defaults cover `TextCell` and `BooleanCell`:

```ts
import type { CellRendererEntry } from '@ghentcdh/json-forms-vue';
import { cellTypeIs, cellFormatIs } from '@ghentcdh/json-forms-vue';
import MyDateCell from './MyDateCell.vue';

const cellRenderers: CellRendererEntry[] = [
  // match by column element type
  { tester: cellTypeIs('TextCell', 10), renderer: MyTextCell },
  // match by options.format
  { tester: cellFormatIs('date', 20), renderer: MyDateCell },
];
```

Pass them via the `cellRenderers` prop. Custom entries are evaluated before the defaults, so a higher rank overrides a built-in renderer.

| Helper                  | Description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| `cellTypeIs(type, rank)`| Matches when the column element's `type` equals `type`             |
| `cellFormatIs(fmt, rank)`| Matches when the column element's `options.format` equals `fmt`   |
| `findCellRenderer(registry, element)` | Returns the highest-ranked renderer for a column     |

## Toolbar and filtering

`TableComponent` itself has no search box or filter UI. Render a `TableToolbar` above the table to add a debounced search field and a filter popover.

```vue
<template>
  <TableToolbar
    :search="search"
    :filters="filters"
    :filter-schema="filterSchema"
    @update-search="onUpdateSearch"
    @update-filters="onUpdateFilters"
  />
  <TableComponent
    id="users-table"
    :schema="tableSchema"
    :ui-schema="tableUiSchema"
    :data="rows"
    :page="page"
  />
</template>

<script setup>
import { TableToolbar, TableComponent } from '@ghentcdh/json-forms-vue';
</script>
```

### `TableToolbar` props

| Prop           | Type                  | Required | Description                                                |
| -------------- | --------------------- | -------- | ---------------------------------------------------------- |
| `filterSchema` | `Record<string, any>` | false    | JSON schema whose `properties` define the filterable fields|
| `filters`      | `string[]`            | false    | Active filters in wire format (see below)                  |
| `search`       | `string`              | false    | Current search query                                       |

### `TableToolbar` events

| Event           | Payload             | Description                                       |
| --------------- | ------------------- | ------------------------------------------------- |
| `updateSearch`  | `q: string`         | Emitted (debounced 300 ms) as the user types      |
| `updateFilters` | `filters: string[]` | Emitted when filters are applied or reset         |

`TableToolbar` also exposes `left` and `right` slots for custom toolbar content.

### Filter wire format

Filters are passed around as strings of the form `key:value:operator`, e.g. `"title:foo:contains"`. The filter popover (`TableFilter`) reads the available fields from `filterSchema.properties` (each property's `title` is the label) and lets the user build one row per filter with `FilterRowInput`.

Supported operators: `contains`, `not_contains`, `equals`, `not_equals`, `gt`, `lt`, `isnull`, `isnotnull`. The last two take no value.

Use the helpers from `@ghentcdh/json-forms-core` to convert between strings and objects, and to build a server-side filter payload:

| Helper                       | Description                                                            |
| ---------------------------- | ---------------------------------------------------------------------- |
| `filterToString(filter)`     | Serialize a `Filter` object to `"key:value:operator"`                  |
| `stringToFilter(s)`          | Parse a filter string into a `Filter` object                          |
| `extractFilters(strings)`    | Parse an array of filter strings into `Filter[]`                       |
| `buildFilter(strings)`       | Build a nested filter object suitable for a Prisma-style query         |
| `buildSort(key, dir)`        | Build a nested sort object for a column key and direction              |

```ts
type Filter = {
  key: string;
  value: any;
  operator: OperatorType;
  label?: string;
};
```
