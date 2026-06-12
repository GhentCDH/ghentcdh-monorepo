---
Table
---

# Table

A data table component with sortable columns, row actions, loading state, and integrated pagination.

<script setup>import {
TableComponent, TextCell} from '@ghentcdh/ui';

const comp = TableComponent;

const displayColumns = [
  {
    component: TextCell,
    id: 'name',
    label: 'Name',
  },
  {
    component: TextCell,
    id: 'firstName',
    label: 'First Name',
  },
];

const data = [
  { name: 'Six', firstName: 'Joren' },
  { name: 'Vandersteene', firstName: 'Bo' },
];

const pageSize = 20;
const page = {
  count: pageSize * 5,
  pageSize,
  page: 1,
};

</script>

<TableComponent :loading="false"
:data="data"        
:displayColumns="displayColumns"
:page="page"/>

## Loading table

<TableComponent :loading="true"
:displayColumns="displayColumns"
:page="page"/>

## Props

| Prop             | Type             | Required | Default | Description                                    |
|------------------|------------------|----------|---------|------------------------------------------------|
| `data`           | `Object[]`       | false    | —       | Array of row objects; each must have an `id`   |
| `displayColumns` | `ColumnDef[]`    | false    | —       | Column definitions (see below)                 |
| `page`           | `PageInfo`       | false    | —       | Pagination state (`{ page, pageSize, count }`) |
| `loading`        | `Boolean`        | false    | `false` | Replaces rows with a loading indicator         |
| `actions`        | `TableAction[]`  | false    | —       | Extra action buttons rendered in each row      |
| `sort`           | `TableSort`      | false    | —       | Current sort state (`{ sortColumn, sortDir }`) |

## Events

| Event            | Payload    | Description                                        |
|------------------|------------|----------------------------------------------------|
| `updatePage`     | `number`   | Emitted when the user navigates to a page          |
| `updatePageSize` | `number`   | Emitted when the user changes the page size        |
| `sort`           | `string`   | Emitted with the column id when a header is clicked|
| `view`           | row object | Emitted when the View button is clicked (listener auto-enables the button) |
| `edit`           | row object | Emitted when the Edit button is clicked (listener auto-enables the button) |
| `delete`         | row object | Emitted when the Delete button is clicked (listener auto-enables the button) |

The View, Edit, and Delete buttons are only rendered when the corresponding event listener (`@view`, `@edit`, `@delete`) is bound on the component.

### `TableAction`

```ts
type TableAction = {
  label?: string;
  tooltip?: string;                    // aria-label / tooltip shown on hover
  icon?: IconEnum;
  action: <T>(data: T) => void;
  /** When provided, the button is only rendered for rows where this returns true. */
  visible?: <T>(data: T) => boolean;
};
```

### `ColumnDef`

```ts
type ColumnDef = TextCellType & {
  id: string;
  label: string;
  width?: string;   // CSS width applied to the column header and cells (e.g. '120px', '10%')
};
```

### `TextCell`

The built-in `TextCell` renders text values with overflow truncation. It supports several `options` on the column definition:

| Option       | Type     | Description                                                                                      |
|--------------|----------|--------------------------------------------------------------------------------------------------|
| `dataPath`   | `string` | Reads the cell value from `row[dataPath]` instead of `row[column.id]`. Useful for included relations. |
| `key`        | `string` | After resolving the value, reads `value[key]`. Combine with `dataPath` for nested objects.       |
| `format`     | `string` | Set to `'keyValue'` to read `value[options.key]` from a key/value map.                           |

Values that start with `http` are automatically rendered as `<a>` links (opens in a new tab).

### `BooleanCell`

`BooleanCell` renders a checkmark icon when the cell value is `true`, and nothing otherwise. Use it in place of `TextCell` for boolean columns.

```ts
import { BooleanCell } from '@ghentcdh/ui';

const columns = [
  { component: BooleanCell, id: 'active', label: 'Active' },
];
```

It reads the value using the same `column.id` lookup as `TextCell` and also supports the `keyValue` format option.
