---
Modal
---

# Form Modal

`JsonFormModalService` opens a `JsonForm` inside a modal dialog programmatically — no template required. There are two modes: an **edit modal** (with Save/Cancel) and a **view modal** (read-only, with optional Edit/Delete buttons).

The underlying `JsonFormModal` component is also available for direct use in templates.

## `JsonFormModalService.openModal()`

Opens an editable form modal. The result is passed to `onClose` when the user saves or cancels.

```ts
import { JsonFormModalService } from '@ghentcdh/json-forms-vue';

JsonFormModalService.openModal({
  modalTitle: 'Edit book',
  schema: bookSchema,
  uiSchema: bookUiSchema,
  initialData: { title: 'My book' },
  modalSize: 'sm',
  onClose: (result) => {
    if (result?.valid) {
      saveBook(result.data);
    }
  },
});
```

### Parameters

| Param          | Type                              | Required | Description                                                                 |
|----------------|-----------------------------------|----------|-----------------------------------------------------------------------------|
| `modalTitle`   | `string`                          | true     | Title shown in the modal header                                             |
| `schema`       | `object`                          | true     | JSON schema for the form data                                               |
| `uiSchema`     | `object`                          | true     | UI schema controlling layout                                                |
| `initialData`  | `object`                          | false    | Pre-populated form data                                                     |
| `modalSize`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | false | Modal width. Defaults to `'md'`                                      |
| `onClose`      | `(result: FormModalResult \| null) => void` | true | Called on save (with result) or cancel (`null`)            |
| `onEvents`     | `(payload: FormEventPayload) => void` | false | Receives events dispatched by custom renderers inside the form          |
| `http`         | `HttpClient`                      | false    | HTTP client for remote renderers (e.g. autocomplete)                        |
| `renderers`    | `any[]`                           | false    | Extra renderer entries merged with the default registry                     |

### `FormModalResult`

```ts
type FormModalResult<DATA = any> = {
  data: DATA;    // form data at time of submission
  valid: boolean;
};
```

## `JsonFormModalService.openViewModal()`

Opens a read-only modal. Edit and Delete buttons are only shown when the corresponding callbacks are provided.

```ts
import { JsonFormModalService } from '@ghentcdh/json-forms-vue';

JsonFormModalService.openViewModal({
  modalTitle: 'Book details',
  schema: bookSchema,
  uiSchema: bookUiSchema,
  data: selectedBook,
  modalSize: 'md',
  onClose: () => {},
  onEdit: (data) => openEditModal(data),
  onDelete: (data) => deleteBook(data),
});
```

### Parameters

| Param        | Type                              | Required | Description                                                                 |
|--------------|-----------------------------------|----------|-----------------------------------------------------------------------------|
| `modalTitle` | `string`                          | true     | Title shown in the modal header                                             |
| `schema`     | `object`                          | true     | JSON schema for the displayed data                                          |
| `uiSchema`   | `object`                          | true     | UI schema controlling layout                                                |
| `data`       | `object`                          | true     | Record to display (read-only)                                               |
| `modalSize`  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | false | Modal width. Defaults to `'md'`                                      |
| `onClose`    | `() => void`                      | false    | Called when the modal closes                                                |
| `onEdit`     | `(data: T) => void`               | false    | When provided, an **Edit** button is shown; called on click                 |
| `onDelete`   | `(data: T) => void`               | false    | When provided, a **Delete** button is shown; called on click                |
| `renderers`  | `any[]`                           | false    | Extra renderer entries passed to the inner `JsonForm`                       |

## `JsonFormModal` component

Use `JsonFormModal` directly in a template when you need finer control over modal lifecycle.

```vue
<template>
  <JsonFormModal
    modal-title="Edit book"
    :schema="schema"
    :ui-schema="uiSchema"
    :data="formData"
    modal-size="sm"
    :on-close="onClose"
    @events="onFormEvent"
  />
</template>

<script setup lang="ts">
import { JsonFormModal } from '@ghentcdh/json-forms-vue';
import type { FormModalResult } from '@ghentcdh/json-forms-vue';

const onClose = (result: FormModalResult | null) => {
  if (result?.valid) saveBook(result.data);
};
</script>
```

### Props

| Prop           | Type        | Required | Default    | Description                                                     |
|----------------|-------------|----------|------------|-----------------------------------------------------------------|
| `modalTitle`   | `string`    | true     | —          | Title shown in the modal header                                 |
| `schema`       | `object`    | true     | —          | JSON schema for the form data                                   |
| `uiSchema`     | `object`    | true     | —          | UI schema controlling layout                                    |
| `data`         | `object`    | true     | —          | Initial form data                                               |
| `onClose`      | `function`  | true     | —          | Callback invoked on save or cancel                              |
| `modalSize`    | `SizeType`  | false    | `'md'`     | Modal width (`'xs'`–`'xl'`)                                     |
| `saveLabel`    | `string`    | false    | `'Save'`   | Label for the save button                                       |
| `cancelLabel`  | `string`    | false    | `'Cancel'` | Label for the cancel button                                     |
| `errorMode`    | `ErrorMode` | false    | `'onBlur'` | When validation errors are shown                                |
| `http`         | `HttpClient`| false    | `null`     | HTTP client for remote renderers                                |
| `renderers`    | `any[]`     | false    | `null`     | Extra renderer entries merged with the default registry         |
| `onEvents`     | `function`  | false    | —          | Callback for events dispatched by custom renderers              |

### Events

| Event        | Payload               | Description                              |
|--------------|-----------------------|------------------------------------------|
| `closeModal` | —                     | Emitted when the modal closes            |
| `events`     | `FormEventPayload`    | Forwarded from inner `JsonForm`          |
| `errors`     | validation errors     | Emitted when validation errors change    |
| `valid`      | `boolean`             | Emitted when form validity changes       |
