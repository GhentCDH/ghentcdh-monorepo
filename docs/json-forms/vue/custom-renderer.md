# Custom control renderer

This guide explains how to create a custom control renderer for the `@ghentcdh/json-forms-vue` library.

## Overview

A control renderer consists of three parts:

1. **Vue component** — renders the control UI
2. **Tester** — determines when the renderer should be used
3. **Registration** — connects the component and tester with a priority rank

## Step 1: Create the renderer component

Every control renderer follows the same pattern:

```vue
<template>
  <MyInput
    v-bind="controlWrapper"
    :model-value="control.data"
    :enabled="control.enabled"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts" setup>
import type { ControlElement } from '@jsonforms/core';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';

import { MyInput } from '@ghentcdh/ui';

import { useVanillaControlCustom } from '@ghentcdh/json-forms-vue';

const props = defineProps({ ...rendererProps<ControlElement>() });
const {
  control,
  onChange,
  appliedOptions,
  onFocus,
  onBlur,
  controlWrapper,
  styles,
} = useVanillaControlCustom(useJsonFormsControl(props));
</script>
```

### Key concepts

- **`rendererProps<ControlElement>()`** — provides the standard JSON Forms props (`schema`, `uischema`, `path`, etc.)
- **`useJsonFormsControl(props)`** — the core JSON Forms hook that gives access to the control state
- **`useVanillaControlCustom(input, adaptTarget?)`** — project-specific wrapper that adds focus/touch tracking and merges options into `controlWrapper`
- **`v-bind="controlWrapper"`** — passes label, errors, description, visibility, and width to the `ControlWrapper` component inside the UI input
- **`control.data`** — the current value for this control
- **`onChange`** — updates the form data (expects `{ target: { value } }` by default)
- **`appliedOptions`** — the merged options from the UI schema (e.g., `format`, custom options)

### Transforming values

If the input component emits a different value format, pass an `adaptTarget` function:

```ts
// Convert to boolean
const { control, onChange } = useVanillaControlCustom(
  useJsonFormsControl(props),
  (target) => Boolean(target.value) ?? false,
);
```

### Custom change handling

For controls where the value doesn't come from a standard input event, use `handleChange` directly:

```ts
const { control, handleChange } = useVanillaControlCustom(
  useJsonFormsControl(props),
);

const onSelect = (result: any) => {
  handleChange(control.value.path, result);
};
```

### Accessing options

UI schema options are available via `appliedOptions`:

```ts
const { appliedOptions } = useVanillaControlCustom(
  useJsonFormsControl(props),
);

// Access custom options defined in the UI schema
const myOption = appliedOptions.value?.myCustomOption;
```

## Step 2: Create a tester

Testers are predicate functions that determine when a renderer should be used. They use composable boolean logic from `@jsonforms/core`:

```ts
import { uiTypeIs } from '@jsonforms/core';
import { and, optionIs, or, schemaTypeIs } from '@jsonforms/core/src/testers/testers';

// Match by format option
export const isMyControl = and(
  uiTypeIs('Control'),
  optionIs('format', 'myFormat'),
);

// Match by schema type
export const isMyTypeControl = and(
  uiTypeIs('Control'),
  schemaTypeIs('string'),
);

// Combine multiple conditions
export const isMyComplexControl = and(
  uiTypeIs('Control'),
  or(
    optionIs('format', 'myFormat'),
    schemaTypeIs('string'),
  ),
);
```

### Available tester functions

| Function                    | Description                                        |
| --------------------------- | -------------------------------------------------- |
| `uiTypeIs(type)`            | Matches if the UI schema type equals `type`        |
| `optionIs(key, value)`      | Matches if `options[key] === value`                |
| `schemaTypeIs(type)`        | Matches if the JSON schema type equals `type`      |
| `and(...testers)`           | All testers must match                             |
| `or(...testers)`            | Any tester must match                              |

### Using `isCustomControl`

For fully custom controls, use the built-in `isCustomControl` helper which matches on `format: 'custom'` and a custom `type`:

```ts
import { isCustomControl } from '@ghentcdh/json-forms-vue';

export const isMyWidgetControl = isCustomControl('myWidget');
```

This matches a UI schema built with:

```ts
ControlBuilder.asCustom<MyType>('fieldName', 'myWidget');
```

## Step 3: Register the renderer

Pass your renderer as a registration entry to `FormComponent` via the `renderers` prop:

```vue
<template>
  <FormComponent
    id="my-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :renderers="customRenderers"
    :form-data="formData"
    @change="formData = $event"
  />
</template>

<script setup>
import { rankWith } from '@jsonforms/core';
import { FormComponent } from '@ghentcdh/json-forms-vue';

import MyControlRenderer from './MyControlRenderer.vue';
import { isMyControl } from './testers';

const customRenderers = [
  {
    tester: rankWith(11, isMyControl),
    renderer: MyControlRenderer,
  },
];
</script>
```

The `rankWith(priority, tester)` function assigns a priority. Higher values take precedence. The built-in renderers use rank `10`, so use `11` or higher to override them.

## Step 4: Define the UI schema

Use the `ControlBuilder` to define your control in the UI schema:

```ts
import { ControlBuilder, LayoutBuilder } from '@ghentcdh/json-forms-core';

// Using a custom format
const uiSchema = LayoutBuilder.vertical<MyType>()
  .addControls(
    ControlBuilder.properties<MyType>('myField')
      .control('myFormat', { /* custom options */ }),
  )
  .build();

// Using a fully custom control type
const uiSchema = LayoutBuilder.vertical<MyType>()
  .addControls(
    ControlBuilder.asCustom<MyType>('myField', 'myWidget'),
  )
  .build();
```

### Built-in control formats

| Method            | Format          | Description              |
| ----------------- | --------------- | ------------------------ |
| *(default)*       | `string`        | Text input               |
| `.textArea()`     | `textArea`      | Multi-line text          |
| `.markdown()`     | `markdown`      | Markdown editor          |
| `.select(opts)`   | `select`        | Dropdown select          |
| `.mutliSelect()`  | `mutliSelect`   | Multi-select dropdown    |
| `.autocomplete()` | `autocomplete`  | Autocomplete with search |
| `.readonly()`     | `string`        | Read-only text input     |

## Dispatching form events

Custom renderers can dispatch events that bubble up to the form host using `useFormEvents`:

```ts
import { useFormEvents } from '@ghentcdh/json-forms-vue';

const { dispatch } = useFormEvents();

const onCreate = () => {
  dispatch({
    event: 'create',
    type: control.value.path,
    data: { name: 'New item' },
    onSuccess: (result) => {
      handleChange(control.value.path, result);
    },
  });
};
```

The host handles these events via the `@events` listener on `FormComponent`:

```vue
<FormComponent
  id="my-form"
  :schema="schema"
  :ui-schema="uiSchema"
  :form-data="formData"
  @events="onFormEvent"
/>
```

## Full example

A custom color picker renderer:

::: tabs

@tab ColorPickerRenderer.vue

```vue
<template>
  <ControlWrapper
    v-bind="controlWrapper"
  >
    <input
      type="color"
      :value="control.data"
      :disabled="!control.enabled"
      @input="onColorChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  </ControlWrapper>
</template>

<script lang="ts" setup>
import type { ControlElement } from '@jsonforms/core';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { ControlWrapper } from '@ghentcdh/ui';

import { useVanillaControlCustom } from '@ghentcdh/json-forms-vue';

const props = defineProps({ ...rendererProps<ControlElement>() });
const {
  control,
  handleChange,
  onFocus,
  onBlur,
  controlWrapper,
} = useVanillaControlCustom(useJsonFormsControl(props));

const onColorChange = (e: Event) => {
  handleChange(control.value.path, (e.target as HTMLInputElement).value);
};
</script>
```

@tab tester.ts

```ts
import { uiTypeIs } from '@jsonforms/core';
import { and, optionIs } from '@jsonforms/core/src/testers/testers';

export const isColorPicker = and(
  uiTypeIs('Control'),
  optionIs('format', 'colorPicker'),
);
```

@tab Usage

```vue
<template>
  <FormComponent
    id="theme-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :renderers="renderers"
    :form-data="formData"
    @change="formData = $event"
  />
</template>

<script setup>
import { rankWith } from '@jsonforms/core';
import { ref } from 'vue';
import { ControlBuilder, LayoutBuilder } from '@ghentcdh/json-forms-core';
import { FormComponent } from '@ghentcdh/json-forms-vue';
import ColorPickerRenderer from './ColorPickerRenderer.vue';
import { isColorPicker } from './tester';

const schema = {
  type: 'object',
  properties: {
    primaryColor: { type: 'string' },
  },
};

type Theme = { primaryColor: string };

const uiSchema = LayoutBuilder.vertical<Theme>()
  .addControls(
    ControlBuilder.properties<Theme>('primaryColor')
      .control('colorPicker')
      .customLabel('Primary color'),
  )
  .build();

const renderers = [
  { tester: rankWith(11, isColorPicker), renderer: ColorPickerRenderer },
];

const formData = ref({ primaryColor: '#3b82f6' });
</script>
```

:::
