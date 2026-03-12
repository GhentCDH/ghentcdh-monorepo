# Autocomplete

A searchable input component with dropdown suggestions. Supports both remote API calls and local option filtering.

## Usage

::: tabs

@tab Preview

<Autocomplete
v-model="swapiModel"
label="Enter a starwars character name"
:fetchOptions="fetchOptions"
label-key="name"
value-key="url"
/>
{{swapiModel}}

@tab Vue

```vue

<template>
  <Autocomplete
    v-model="model"
    label="Search"
    :fetchOptions="fetchOptions"
    label-key="name"
    value-key="url"
  />
</template>

<script setup>
  import { Autocomplete } from "@ghentcdh/ui";

  const fetchOptions = async (searchTerm, signal) => {
    const response = await fetch(`/api/search?q=${searchTerm}`, { signal });
    const data = await response.json();
    return data.results;
  };
</script>
```

:::

## Props

| Prop           | Type               | Default   | Description                                                                                         |
|----------------|--------------------|-----------|-----------------------------------------------------------------------------------------------------|
| `v-model`      | `String \| Object` | `''`      | The selected value                                                                                  |
| `options`      | `Array`            | —         | Static list of selectable options (used when `fetchOptions` is not provided)                        |
| `fetchOptions` | `Function`         | `null`    | Async function `(query, signal) => Promise<any[]>` for remote search. Takes priority over `options` |
| `label`        | `String`           | —         | Label displayed above the input                                                                     |
| `labelKey`     | `String`           | `'label'` | Key to use as the display label when options are objects                                            |
| `valueKey`     | `String`           | `'value'` | Key to use as the stored value when options are objects                                             |
| `placeholder`  | `String`           | —         | Placeholder text                                                                                    |
| `description`  | `String`           | —         | Helper text displayed below the input                                                               |
| `errors`       | `String`           | —         | Error message to display                                                                            |
| `required`     | `Boolean`          | `false`   | Marks the field as required                                                                         |
| `enabled`      | `Boolean`          | `true`    | Whether the field is enabled                                                                        |
| `isTouched`    | `Boolean`          | `false`   | Whether the field has been interacted with (used to show errors)                                    |
| `hideLabel`    | `Boolean`          | `false`   | Hides the label visually                                                                            |
| `freeText`     | `Boolean`          | `false`   | Allow free-text input (don't clear if nothing selected)                                             |
| `debounceMs`   | `Number`           | `200`     | Debounce delay in ms for remote search                                                              |
| `maxResults`   | `Number`           | `8`       | Maximum number of results to display                                                                |
| `width`        | `String`           | `'w-48'`  | Tailwind width class for the input                                                                  |

## Keyboard navigation

| Key         | Action                        |
|-------------|-------------------------------|
| `ArrowDown` | Move to next option           |
| `ArrowUp`   | Move to previous option       |
| `Enter`     | Select the highlighted option |
| `Escape`    | Close the dropdown            |

## Events

| Event               | Payload        | Description                                    |
|---------------------|----------------|------------------------------------------------|
| `update:modelValue` | selected value | Emitted when the selection changes (v-model)   |
| `select`            | selected item  | Emitted when an item is selected from the list |
| `clear`             | —              | Emitted when the input is cleared              |

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
import { Autocomplete } from "@ghentcdh/ui";
import { ref } from 'vue';

const model = ref(null);
const swapiModel = ref(null);
const options = [{
    value: 1,
    label: "Option 1"
  },
  {
    value: 2,
    label: "Option 2"
  },
  {
    value: 3,
    label: "Option 3"
}];
const modelWithValue = ref(options[0]);

const swapiInitialValue = ref({
  "name": "Darth Vader",
  "url": "https://swapi.dev/api/people/4/"
});

const fetchOptions = async (searchTerm, signal) => {
  const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`, { signal });
  const data = await response.json();
  return data.results;
}

</script>

<ClientOnly>

## Examples

### Remote API call

When `fetchOptions` is provided, the component fetches results from a remote API. This takes priority over the `options` prop.

::: tabs

@tab Preview

<div class="flex gap-2">
<Autocomplete
    v-model="swapiModel"
    label="Enter a starwars character name"
    :fetchOptions="fetchOptions"
    label-key="name"
    value-key="url"
/>

<pre>{{swapiModel}}</pre>
</div>

@tab Vue

```vue

<template>
  <Autocomplete
    v-model="model"
    label="Enter a starwars character name"
    :fetchOptions="fetchOptions"
    label-key="name"
    value-key="url"
  />
</template>

<script setup>
  import { Autocomplete } from "@ghentcdh/ui";

  const fetchOptions = async (searchTerm, signal) => {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${searchTerm}`,
      { signal }
    );
    const data = await response.json();
    return data.results;
  };
</script>
```

:::

### Remote with initial value

::: tabs

@tab Preview

<div class="flex gap-2">
<Autocomplete
    v-model="swapiInitialValue"
    label="Initial Value"
    :fetchOptions="fetchOptions"
    label-key="name"
    value-key="url"
/>

<pre>{{swapiInitialValue}}</pre>
</div>

@tab Vue

```vue

<template>
  <Autocomplete
    v-model="model"
    label="Initial Value"
    :fetchOptions="fetchOptions"
    label-key="name"
    value-key="url"
  />
</template>

<script setup>
  import { Autocomplete } from "@ghentcdh/ui";
  import { ref } from "vue";

  const model = ref({
    name: "Darth Vader",
    url: "https://swapi.dev/api/people/4/",
  });
</script>
```

:::

### Static options

When no `fetchOptions` is provided, the component filters locally from the `options` prop.

::: tabs

@tab Preview

<div class="flex gap-2">
<Autocomplete
    v-model="model"
    label="The label"
    :options="options"
/>
<pre>{{model}}</pre>
</div>

@tab Vue

```vue

<template>
  <Autocomplete
    v-model="model"
    label="The label"
    :options="options"
  />
</template>

<script setup>
  import { Autocomplete } from "@ghentcdh/ui";
</script>
```

:::

### Static options with initial value

::: tabs

@tab Preview

<div class="flex gap-2">
<Autocomplete
    v-model="modelWithValue"
    label="With initial value"
    :options="options"
/>
<pre>{{modelWithValue}}</pre>
</div>

@tab Vue

```vue

<template>
  <Autocomplete
    v-model="model"
    label="With initial value"
    :options="options"
  />
</template>

<script setup>
  import { Autocomplete } from "@ghentcdh/ui";
  import { ref } from "vue";

  const model = ref({ value: 1, label: "Option 1" });
</script>
```

:::

### Required

::: tabs

@tab Preview

<Autocomplete
v-model="model"
label="The label"
:options="options"
:required="true"
/>

@tab Vue

```vue

<template>
  <Autocomplete
    v-model="model"
    label="The label"
    :options="options"
    :required="true"
  />
</template>

<script setup>
  import { Autocomplete } from "@ghentcdh/ui";
</script>
```

:::

### With errors

::: tabs

@tab Preview

<Autocomplete
v-model="model"
label="The label"
:options="options"
errors="Some error"
:is-touched="true"
/>

@tab Vue

```vue

<template>
  <Autocomplete
    v-model="model"
    label="The label"
    :options="options"
    errors="Some error"
    :is-touched="true"
  />
</template>

<script setup>
  import { Autocomplete } from "@ghentcdh/ui";
</script>
```

:::

</ClientOnly>
