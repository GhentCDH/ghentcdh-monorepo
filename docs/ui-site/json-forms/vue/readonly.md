---
Readonly
---

# Readonly / view mode

A `JsonForm` can render the same `schema` and `uiSchema` as a read-only view instead of an editable form. In view mode each control is replaced by a display-only renderer — text, formatted numbers, a checkmark for booleans, resolved select/relation labels, and rendered Markdown — while keeping the original layout.

This is what powers [`JsonFormModalService.openViewModal()`](./modal.md#jsonformmodalservice-openviewmodal) and the per-row **view** action of [`JsonFormWithTable`](./json-form-with-table.md).

## Enabling readonly mode

Set the `readonly` prop on `JsonForm`. Unlike `disabled`, readonly controls render as plain values rather than greyed-out inputs.

```vue
<template>
  <JsonForm
    id="book-view"
    :schema="schema"
    :ui-schema="uiSchema"
    :form-data="book"
    :readonly="true"
  />
</template>

<script setup lang="ts">
import { JsonForm } from '@ghentcdh/json-forms-vue';
</script>
```

Internally, when `readonly` is `true` the form swaps its renderer registry from the editable `customRenderers` to `readonlyRenderers`. No other configuration is required — the same UI schema drives both modes.

## Readonly renderers

`readonlyRenderers` is the registry used in view mode. It combines the layout and array renderers with a set of display-only control renderers, selected by the same tester/rank mechanism as the editable renderers:

| Control | Readonly renderer | Output |
| --- | --- | --- |
| string, text area, link | `StringReadonlyRenderer` | Plain text (links rendered as anchors) |
| number, integer | `NumberReadonlyRenderer` | Formatted number |
| boolean | `BooleanReadonlyRenderer` | Checkmark when true |
| markdown | `MarkdownReadonlyRenderer` | Rendered Markdown |
| select, autocomplete | `SelectReadonlyRenderer` | Resolved option label |
| multiselect | `MultiSelectReadonlyRenderer` | Resolved option labels |
| object | `ObjectReadonlyRenderer` | Nested object values |

You normally never reference these directly — `readonly` selects them automatically.

## Custom readonly renderers

To override or extend the read-only output, pass extra renderer entries via the `renderers` prop. In view mode they are merged **after** `readonlyRenderers`, so a higher-ranked tester wins.

```vue
<JsonForm
  id="book-view"
  :schema="schema"
  :ui-schema="uiSchema"
  :form-data="book"
  :readonly="true"
  :renderers="[myDateReadonlyRenderer]"
/>
```

The same `renderers` prop is forwarded by `openViewModal({ renderers })` and `ViewModal`.

## `useDisplayValue`

Custom readonly renderers can use `useDisplayValue` to resolve the value to show, including values that live on a nested or related object rather than directly under the control's key:

```ts
import { useDisplayValue } from '@ghentcdh/json-forms-vue';

// value:      the raw control value
// formValues: the full form data object
// opts:       { dataPath?: string; key?: string }
const display = useDisplayValue(value, formValues, {
  dataPath: 'author', // traverse formValues.author
  key: 'name',        // then read .name
});
```

| Option     | Description                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| `dataPath` | Dotted path traversed in `formValues` (e.g. `"author"` → `formValues.author`) |
| `key`      | After resolving an object, the property to read from it (e.g. `"name"`)       |

When the value is a primitive, it is returned as-is; the `dataPath`/`key` options only apply to object values.

## API

| Export             | Type                                          | Description                                          |
| ------------------ | --------------------------------------------- | ---------------------------------------------------- |
| `readonlyRenderers`| `RendererEntry[]`                             | The registry used when a form is in readonly mode    |
| `useDisplayValue`  | `(value, formValues, opts) => any`            | Resolves the display value for a readonly renderer   |
