# Textarea

A multi-line text input component with configurable row count.

## Usage

::: tabs

@tab Preview

<Textarea
v-model="model"
label="The label"
/>

@tab Vue

```vue

<template>
  <Textarea
    v-model="model"
    label="The label"
  />
</template>

<script setup>
  import { Textarea } from "@ghentcdh/ui";
</script>
```

:::

## Props

| Prop          | Type      | Default   | Description                                                      |
|---------------|-----------|-----------|------------------------------------------------------------------|
| `v-model`     | `String`  | —         | The textarea value                                               |
| `rows`        | `Number`  | `4`       | Number of visible text rows                                      |
| `label`       | `String`  | —         | Label displayed above the textarea                               |
| `placeholder` | `String`  | —         | Placeholder text                                                 |
| `description` | `String`  | —         | Helper text displayed below the textarea                         |
| `errors`      | `String`  | —         | Error message to display                                         |
| `required`    | `Boolean` | `false`   | Marks the field as required                                      |
| `enabled`     | `Boolean` | `true`    | Whether the field is enabled                                     |
| `isTouched`   | `Boolean` | `false`   | Whether the field has been interacted with (used to show errors) |
| `hideLabel`   | `Boolean` | `false`   | Hides the label visually                                         |
| `width`       | `String`  | `'w-48'`  | Tailwind width class                                             |

## Events

| Event    | Payload      | Description                              |
|----------|--------------|------------------------------------------|
| `change` | `Event`      | Emitted when the textarea value changes  |
| `focus`  | `FocusEvent` | Emitted when the textarea receives focus |
| `blur`   | `Event`      | Emitted when the textarea loses focus    |

<script setup>
//
import { Textarea } from '@ghentcdh/ui';
import { ref } from 'vue';

const model = ref(null);

</script>

<ClientOnly>

## Examples

### Required

::: tabs

@tab Preview

<Textarea
v-model="model"
label="The label"
:required="true"
/>

@tab Vue

```vue

<template>
  <Textarea
    v-model="model"
    label="The label"
    :required="true"
  />
</template>

<script setup>
  import { Textarea } from "@ghentcdh/ui";
</script>
```

:::

### With errors

::: tabs

@tab Preview

<Textarea
v-model="model"
label="The label"
:is-touched="true"
errors="Some error"
/>

@tab Vue

```vue

<template>
  <Textarea
    v-model="model"
    label="The label"
    :is-touched="true"
    errors="Some error"
  />
</template>

<script setup>
  import { Textarea } from "@ghentcdh/ui";
</script>
```

:::

### Custom rows

::: tabs

@tab Preview

<Textarea
v-model="model"
label="Large textarea"
:rows="8"
/>

@tab Vue

```vue

<template>
  <Textarea
    v-model="model"
    label="Large textarea"
    :rows="8"
  />
</template>

<script setup>
  import { Textarea } from "@ghentcdh/ui";
</script>
```

:::

</ClientOnly>
