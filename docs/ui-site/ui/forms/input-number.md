# Input Number

A numeric input component with configurable step increments.

## Usage

::: tabs

@tab Preview

<InputNumber
v-model="model"
label="The label"
/>

@tab Vue

```vue

<template>
  <InputNumber
    v-model="model"
    label="The label"
  />
</template>

<script setup>
  import { InputNumber } from "@ghentcdh/ui";
</script>
```

:::

## Props

| Prop          | Type      | Default   | Description                                                      |
|---------------|-----------|-----------|------------------------------------------------------------------|
| `v-model`     | `any`     | —         | The input value                                                  |
| `steps`       | `Number`  | `1`       | Step increment for the number input                              |
| `label`       | `String`  | —         | Label displayed above the input                                  |
| `placeholder` | `String`  | —         | Placeholder text                                                 |
| `description` | `String`  | —         | Helper text displayed below the input                            |
| `errors`      | `String`  | —         | Error message to display                                         |
| `required`    | `Boolean` | `false`   | Marks the field as required                                      |
| `enabled`     | `Boolean` | `true`    | Whether the field is enabled                                     |
| `isTouched`   | `Boolean` | `false`   | Whether the field has been interacted with (used to show errors) |
| `hideLabel`   | `Boolean` | `false`   | Hides the label visually                                         |
| `width`       | `String`  | `'w-48'`  | Tailwind width class                                             |

## Events

| Event    | Payload      | Description                            |
|----------|--------------|----------------------------------------|
| `change` | `Event`      | Emitted when the input value changes   |
| `focus`  | `FocusEvent` | Emitted when the input receives focus  |
| `blur`   | `Event`      | Emitted when the input loses focus     |

<script setup>
//
import { InputNumber } from '@ghentcdh/ui';
import { ref } from 'vue';

const model = ref(null);

</script>

<ClientOnly>

## Examples

### Required

::: tabs

@tab Preview

<InputNumber
v-model="model"
label="The label"
:required="true"
/>

@tab Vue

```vue

<template>
  <InputNumber
    v-model="model"
    label="The label"
    :required="true"
  />
</template>

<script setup>
  import { InputNumber } from "@ghentcdh/ui";
</script>
```

:::

### With errors

::: tabs

@tab Preview

<InputNumber
v-model="model"
label="The label"
:is-touched="true"
errors="Some error"
/>

@tab Vue

```vue

<template>
  <InputNumber
    v-model="model"
    label="The label"
    :is-touched="true"
    errors="Some error"
  />
</template>

<script setup>
  import { InputNumber } from "@ghentcdh/ui";
</script>
```

:::

### Custom step

::: tabs

@tab Preview

<InputNumber
v-model="model"
label="Step of 0.5"
:steps="0.5"
/>

@tab Vue

```vue

<template>
  <InputNumber
    v-model="model"
    label="Step of 0.5"
    :steps="0.5"
  />
</template>

<script setup>
  import { InputNumber } from "@ghentcdh/ui";
</script>
```

:::

</ClientOnly>
