# Checkbox

A checkbox input component for boolean values.

## Usage

::: tabs

@tab Preview

<Checkbox
v-model="model"
label="The label"
/>

@tab Vue

```vue

<template>
  <Checkbox
    v-model="model"
    label="The label"
  />
</template>

<script setup>
  import { Checkbox } from "@ghentcdh/ui";
</script>
```

:::

## Props

| Prop          | Type      | Default   | Description                                                      |
|---------------|-----------|-----------|------------------------------------------------------------------|
| `v-model`     | `any`     | —         | The checkbox value                                               |
| `label`       | `String`  | —         | Label displayed next to the checkbox                             |
| `description` | `String`  | —         | Helper text displayed below the checkbox                         |
| `errors`      | `String`  | —         | Error message to display                                         |
| `required`    | `Boolean` | `false`   | Marks the field as required                                      |
| `enabled`     | `Boolean` | `true`    | Whether the field is enabled                                     |
| `isTouched`   | `Boolean` | `false`   | Whether the field has been interacted with (used to show errors) |
| `width`       | `String`  | `'w-48'`  | Tailwind width class                                             |

## Events

| Event    | Payload      | Description                               |
|----------|--------------|-------------------------------------------|
| `change` | `Event`      | Emitted when the checkbox value changes   |
| `focus`  | `FocusEvent` | Emitted when the checkbox receives focus  |
| `blur`   | `Event`      | Emitted when the checkbox loses focus     |

<script setup>
//
import { Checkbox } from '@ghentcdh/ui';
import { ref } from 'vue';

const model = ref(null);

</script>

<ClientOnly>

## Examples

### Required

::: tabs

@tab Preview

<Checkbox
v-model="model"
label="The label"
:required="true"
/>

@tab Vue

```vue

<template>
  <Checkbox
    v-model="model"
    label="The label"
    :required="true"
  />
</template>

<script setup>
  import { Checkbox } from "@ghentcdh/ui";
</script>
```

:::

### With errors

::: tabs

@tab Preview

<Checkbox
v-model="model"
label="The label"
:is-touched="true"
errors="Some error"
/>

@tab Vue

```vue

<template>
  <Checkbox
    v-model="model"
    label="The label"
    :is-touched="true"
    errors="Some error"
  />
</template>

<script setup>
  import { Checkbox } from "@ghentcdh/ui";
</script>
```

:::

</ClientOnly>
