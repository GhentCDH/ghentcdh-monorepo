# Select

A dropdown select component that allows users to pick a single option from a list.

## Usage

```vue
<SelectComponent
  v-model="model"
  label="The label"
  :options="options"
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `any` | — | The selected value |
| `options` | `Array` | **required** | List of selectable options |
| `label` | `String` | — | Label displayed above the select |
| `labelKey` | `String` | `'label'` | Key to use as the display label when options are objects |
| `valueKey` | `String` | `'value'` | Key to use as the stored value when options are objects |
| `placeholder` | `String` | — | Placeholder text |
| `description` | `String` | — | Helper text displayed below the input |
| `errors` | `String` | — | Error message to display |
| `required` | `Boolean` | `false` | Marks the field as required |
| `enabled` | `Boolean` | `true` | Whether the field is enabled |
| `isTouched` | `Boolean` | `false` | Whether the field has been interacted with (used to show errors) |
| `hideLabel` | `Boolean` | `false` | Hides the label visually |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `change` | selected value | Emitted when the selection changes |
| `focus` | `FocusEvent` | Emitted when the select receives focus |
| `blur` | `Event` | Emitted when the select loses focus |

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
import {SelectComponent} from '@ghentcdh/ui';
import {ref} from 'vue';

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

### Default

<SelectComponent
v-model="model"
label="The label"
:options="options"
/>

### Required

<SelectComponent
v-model="model"
label="The label"
:options="options"
:required="true"
/>

### With errors

<SelectComponent
v-model="model"
label="The label"
:options="options"
:is-touched="true"
errors="Please select an option"
/>

### Custom label and value keys

```vue
<SelectComponent
  v-model="model"
  label="The label"
  :options="customOptions"
  label-key="name"
  value-key="id"
/>
```

<SelectComponent
v-model="modelCustom"
label="The label"
:options="customOptions"
label-key="name"
value-key="id"
/>

</ClientOnly>