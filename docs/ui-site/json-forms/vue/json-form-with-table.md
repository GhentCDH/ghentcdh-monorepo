# Form with table

A full CRUD component that combines a data table with a modal form for creating and editing records. It displays a heading, an **Add new record** button, and a `TableComponent` inside a `Card`. Records are created and edited via `VeeFormModalService` and persisted through `FormStore`.

## Usage

::: tabs

@tab Vue

```vue
<template>
  <JsonFormWithTable
    id="users"
    table-title="Users"
    create-title="Create user"
    update-title="Edit user"
    :form="formLayout"
    :table="tableLayout"
    :filter="filterLayout"
    uri="/api/users"
    @save="onSave"
    @delete="onDelete"
  />
</template>

<script setup>
import { JsonFormWithTable } from '@ghentcdh/json-forms-vue';

const formLayout = {
  schema: formJsonSchema,
  uiSchema: formUiSchema,
  modalSize: 'sm',
};

const tableLayout = {
  schema: tableJsonSchema,
  uiSchema: tableUiSchema,
};

const filterLayout = {
  schema: filterJsonSchema,
  uiSchema: filterUiSchema,
};

const onSave = ({ id, data }) => {
  console.log('saved', id, data);
};

const onDelete = (data) => {
  console.log('deleted', data);
};
</script>
```

:::

## Props

| Prop           | Type               | Required | Default    | Description                                                                                |
| -------------- | ------------------ | -------- | ---------- | ------------------------------------------------------------------------------------------ |
| `id`           | `String`           | true     | —          | Unique identifier used to generate the table id (`form_table_${id}`)                       |
| `tableTitle`   | `String`           | true     | —          | Heading displayed above the table                                                          |
| `createTitle`  | `String`           | true     | —          | Title shown in the create modal                                                            |
| `updateTitle`  | `String`           | false    | —          | Title shown in the edit modal. Falls back to `createTitle`                                 |
| `form`         | `JsonFormsLayout`  | false    | —          | Layout for the create/edit modal form (`{ schema, uiSchema, modalSize? }`)                 |
| `table`        | `JsonFormsLayout`  | false    | —          | Layout for the table columns (`{ schema, uiSchema }`)                                     |
| `filter`       | `JsonFormsLayout`  | false    | —          | Layout for the table filter controls (`{ schema, uiSchema }`)                              |
| `uri`          | `String`           | false    | —          | Base URI used by `FormStore` for CRUD operations and as the default table data source      |
| `dataUri`      | `String`           | false    | —          | Overrides `uri` as the data source for the table                                           |
| `tableActions` | `TableAction[]`    | false    | —          | Custom action buttons rendered in each table row                                           |
| `initialData`  | `Object`           | false    | `{}`       | Default data used when opening the create modal                                            |
| `operations`   | `Operations`       | false    | —          | Controls which CRUD actions are available (see [`Operations`](#operations))                |
| `errorMode`    | `ErrorMode`        | false    | `'onBlur'` | Controls when validation errors are displayed in the modal form (see [JsonForm error modes](./json-form.md#error-modes)) |

### `JsonFormsLayout`

```ts
type JsonFormsLayout = {
  uiSchema: Layout;
  schema: JsonSchema;
  modalSize?: 'xs' | 'sm' | 'lg' | 'xl';
};
```

### `Operations`

Fine-grained control over which actions are shown. All flags default to `true` when `operations` is not provided.

```ts
type Operations = {
  view?:   boolean;  // show a view (read-only) action per row
  update?: boolean;  // show an edit action per row
  create?: boolean;  // show the "Add new record" button
  delete?: boolean;  // show the delete action per row
};
```

```vue
<!-- hide create and delete, allow view and edit -->
<JsonFormWithTable
  :operations="{ create: false, delete: false, view: true, update: true }"
  ...
/>
```

## Events

| Event           | Payload                           | Description                                                                                          |
| --------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `save`          | `{ id?: string, data: Data }`    | Emitted after a record is successfully saved (created or updated)                                    |
| `delete`        | `data: Data`                      | Emitted after a record is successfully deleted                                                       |
| `editData`      | `data: Data`                      | Emitted when a table row is edited and a custom `@editData` listener is bound                        |
| `events`        | `payload: FormEventPayload`       | Forwards form events dispatched by custom renderers inside the modal                                 |
| `custom:edit`   | `data: Data`                      | Emitted when a custom edit handler is bound via `@custom:edit`                                       |
| `custom:create` | —                                 | Emitted when a custom create handler is bound via `@custom:create`                                   |
| `custom:view`   | `data: Data`                      | Emitted when a custom view handler is bound via `@custom:view`                                       |

## Behaviour

- The component renders a heading (`tableTitle`) with an **Add new record** button.
- The `TableComponent` is rendered inside a `Card` and fetches data from `dataUri ?? uri`.
- Clicking **Add new record** or a table row's edit action opens a `VeeFormModalService` modal with the `form` layout.
- On save, the component calls `FormStore.save()` (POST for new, PATCH for existing) and reloads the table.
- On delete, a confirmation dialog is shown via `ModalService.showConfirm()`. If confirmed, `FormStore.delete()` is called and the table reloads.
- If a custom `@editData` listener is bound, editing delegates to that handler instead of opening the modal.
- If a `@custom:edit` or `@custom:create` listener is bound, those take priority over the default modal behavior.

## Examples

### Basic CRUD table

::: tabs

@tab Vue

```vue
<template>
  <JsonFormWithTable
    id="books"
    table-title="Books"
    create-title="Add book"
    :form="formLayout"
    :table="tableLayout"
    uri="/api/books"
  />
</template>

<script setup>
import { JsonFormWithTable } from '@ghentcdh/json-forms-vue';
</script>
```

:::

### With custom edit handler

Use `@editData` to intercept edits and navigate to a detail page instead of opening the modal.

::: tabs

@tab Vue

```vue
<template>
  <JsonFormWithTable
    id="books"
    table-title="Books"
    create-title="Add book"
    :form="formLayout"
    :table="tableLayout"
    uri="/api/books"
    @edit-data="goToDetail"
  />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { JsonFormWithTable } from '@ghentcdh/json-forms-vue';

const router = useRouter();

const goToDetail = (data) => {
  router.push(`/books/${data.id}`);
};
</script>
```

:::

### With separate data URI

Use `dataUri` to fetch table data from a different endpoint than the one used for CRUD operations.

::: tabs

@tab Vue

```vue
<template>
  <JsonFormWithTable
    id="books"
    table-title="Books"
    create-title="Add book"
    :form="formLayout"
    :table="tableLayout"
    uri="/api/books"
    data-uri="/api/books/search?q=active"
  />
</template>

<script setup>
import { JsonFormWithTable } from '@ghentcdh/json-forms-vue';
</script>
```

:::

### With error mode on modal form

::: tabs

@tab Vue

```vue
<template>
  <JsonFormWithTable
    id="books"
    table-title="Books"
    create-title="Add book"
    :form="formLayout"
    :table="tableLayout"
    uri="/api/books"
    error-mode="onChange"
  />
</template>

<script setup>
import { JsonFormWithTable } from '@ghentcdh/json-forms-vue';
</script>
```

:::

### With operations — view-only rows

Use `operations` to show a view button per row and hide create/delete.

::: tabs

@tab Vue

```vue
<template>
  <JsonFormWithTable
    id="books"
    table-title="Books"
    create-title="Add book"
    :form="formLayout"
    :table="tableLayout"
    uri="/api/books"
    :operations="{ create: false, delete: false, update: false, view: true }"
  />
</template>

<script setup>
import { JsonFormWithTable } from '@ghentcdh/json-forms-vue';
</script>
```

:::

### With custom view handler

Intercept the view action to navigate to a detail page instead of opening the built-in read-only modal.

::: tabs

@tab Vue

```vue
<template>
  <JsonFormWithTable
    id="books"
    table-title="Books"
    create-title="Add book"
    :form="formLayout"
    :table="tableLayout"
    uri="/api/books"
    :operations="{ view: true }"
    @custom:view="goToDetail"
  />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { JsonFormWithTable } from '@ghentcdh/json-forms-vue';

const router = useRouter();

const goToDetail = (data) => {
  router.push(`/books/${data.id}`);
};
</script>
```

:::

## View modal

`JsonFormModalService.openViewModal()` opens a standalone read-only modal for any record without needing `JsonFormWithTable`. The modal renders the form in read-only mode and provides a single **Close** button.

```ts
import { JsonFormModalService } from '@ghentcdh/json-forms-vue';

JsonFormModalService.openViewModal({
  modalTitle: 'Book details',
  schema: bookSchema,
  uiSchema: bookUiSchema,
  data: selectedBook,
  modalSize: 'md',        // optional: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  onClose: () => { },     // optional callback
});
```

| Param        | Type                    | Required | Description                                                        |
|--------------|-------------------------|----------|--------------------------------------------------------------------|
| `modalTitle` | `String`                | true     | Title shown in the modal header                                    |
| `schema`     | `Object`                | true     | JSON schema for the displayed data                                 |
| `uiSchema`   | `Object`                | true     | UI schema controlling layout                                       |
| `data`       | `Object`                | true     | The record to display                                              |
| `modalSize`  | `SizeType`              | false    | Modal width (`'xs'`–`'xl'`)                                        |
| `onClose`    | `() => void`            | false    | Callback invoked when modal closes                                 |
| `onEdit`     | `(data: T) => void`     | false    | When provided, an **Edit** button appears and calls this on click  |
| `onDelete`   | `(data: T) => void`     | false    | When provided, a **Delete** button appears and calls this on click |
