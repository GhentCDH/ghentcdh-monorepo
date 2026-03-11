# MultiSelect

A multi-select dropdown component that allows users to select multiple options from a list. Selected values are displayed as a comma-separated string in the trigger button.

## Usage

::: tabs

@tab Preview

<MultiSelect
v-model="model"
label="The label"
:options="options"
/>

@tab Vue

```vue

<template>
  <MultiSelect
    v-model="model"
    label="The label"
    :options="options"
  />
</template>

<script setup>
  import { MultiSelect } from "@ghentcdh/ui";
</script>
```

:::

## Props

| Prop          | Type      | Default      | Description                                                      |
|---------------|-----------|--------------|------------------------------------------------------------------|
| `v-model`     | `any[]`   | —            | Array of selected values                                         |
| `options`     | `Array`   | **required** | List of selectable options                                       |
| `label`       | `String`  | —            | Label displayed above the select                                 |
| `labelKey`    | `String`  | `'label'`    | Key to use as the display label when options are objects         |
| `valueKey`    | `String`  | `'value'`    | Key to use as the stored value when options are objects          |
| `placeholder` | `String`  | —            | Placeholder text                                                 |
| `description` | `String`  | —            | Helper text displayed below the input                            |
| `errors`      | `String`  | —            | Error message to display                                         |
| `required`    | `Boolean` | `false`      | Marks the field as required                                      |
| `enabled`     | `Boolean` | `true`       | Whether the field is enabled                                     |
| `isTouched`   | `Boolean` | `false`      | Whether the field has been interacted with (used to show errors) |
| `hideLabel`   | `Boolean` | `false`      | Hides the label visually                                         |
| `width`       | `String`  | `'w-48'`     | Tailwind width class for the trigger button                      |

## Keyboard navigation

| Key        | Action                              |
|------------|-------------------------------------|
| `ArrowDown`| Move to next option                 |
| `ArrowUp`  | Move to previous option             |
| `Enter`    | Select/deselect the highlighted option |
| `Escape`   | Close the dropdown                  |

## Events

| Event    | Payload         | Description                          |
|----------|-----------------|--------------------------------------|
| `change` | selected values | Emitted when the selection changes   |

## Options format

Options can be an array of objects with `label` and `value` keys (configurable via `labelKey` and `valueKey`):

```js
const options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];
```

Or an array of primitive values:

```js
const options = ['Option 1', 'Option 2', 'Option 3'];
```

<script setup>
//
import {MultiSelect} from '@ghentcdh/ui';
import {ref} from 'vue';

const comp = MultiSelect;
const model = ref(null);
const modelCustom = ref(null);
const options = [{
    value: 1,
    label: 'Option 1'
  },
  {
    value: 2,
    label: 'Option 2'
  },
  {
    value: 3,
    label: 'Option 3'
}];

const customOptions = [{
    id: 1,
    name: 'Option 1'
  },
  {
    id: 2,
    name: 'Option 2'
  },
  {
    id: 3,
    name: 'Option 3'
}];

</script>

<ClientOnly>

## Examples

### Required

::: tabs

@tab Preview

<MultiSelect
v-model="model"
label="The label"
:options="options"
:required="true"
/>

@tab Vue

```vue

<template>
  <MultiSelect
    v-model="model"
    label="The label"
    :options="options"
    :required="true"
  />
</template>

<script setup>
  import { MultiSelect } from "@ghentcdh/ui";
</script>
```

:::

### With errors

::: tabs

@tab Preview

<MultiSelect
v-model="model"
label="The label"
:options="options"
:is-touched="true"
errors="Please select at least one option"
/>

@tab Vue

```vue

<template>
  <MultiSelect
    v-model="model"
    label="The label"
    :options="options"
    :is-touched="true"
    errors="Please select at least one option"
  />
</template>

<script setup>
  import { MultiSelect } from "@ghentcdh/ui";
</script>
```

:::

### Custom label and value keys

::: tabs

@tab Preview

<MultiSelect
v-model="modelCustom"
label="The label"
:options="customOptions"
label-key="name"
value-key="id"
/>

@tab Vue

```vue

<template>
  <MultiSelect
    v-model="model"
    label="The label"
    :options="customOptions"
    label-key="name"
    value-key="id"
  />
</template>

<script setup>
  import { MultiSelect } from "@ghentcdh/ui";
</script>
```

:::

</ClientOnly>