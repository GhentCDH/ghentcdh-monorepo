# Input

A text input component for single-line user input.

## Usage

::: tabs

@tab Preview

<Input
v-model="model"
label="The label"
/>

@tab Vue

```vue

<template>
  <Input
    v-model="model"
    label="The label"
  />
</template>

<script setup>
  import { Input } from "@ghentcdh/ui";
</script>
```

:::

## Props

| Prop          | Type      | Default   | Description                                                      |
|---------------|-----------|-----------|------------------------------------------------------------------|
| `v-model`     | `any`     | —         | The input value                                                  |
| `type`        | `String`  | `'text'`  | HTML input type                                                  |
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
import { Input } from '@ghentcdh/ui';
import { ref } from 'vue';

const model = ref(null);

</script>

<ClientOnly>

## Examples

### Required

::: tabs

@tab Preview

<Input
v-model="model"
label="The label"
:required="true"
/>

@tab Vue

```vue

<template>
  <Input
    v-model="model"
    label="The label"
    :required="true"
  />
</template>

<script setup>
  import { Input } from "@ghentcdh/ui";
</script>
```

:::

### With errors

::: tabs

@tab Preview

<Input
v-model="model"
label="The label"
:is-touched="true"
errors="Some error"
/>

@tab Vue

```vue

<template>
  <Input
    v-model="model"
    label="The label"
    :is-touched="true"
    errors="Some error"
  />
</template>

<script setup>
  import { Input } from "@ghentcdh/ui";
</script>
```

:::

</ClientOnly>
