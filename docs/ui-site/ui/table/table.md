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
| `actions`        | `TableAction[]`  | false    | —       | Action buttons rendered in each row            |

### `TableAction`

```ts
type TableAction = {
  label?: string;
  tooltip?: string;   // tooltip text shown on hover
  icon?: IconEnum;
  action: <T>(data: T) => void;
};
```

### `TextCell`

The built-in `TextCell` component renders cell text with overflow truncation (`truncate`). Long values are clipped to the column width and shown in full on hover via the browser's native tooltip.
