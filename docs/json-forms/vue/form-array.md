# Array

`FormComponent` supports arrays out of the box. Use `ControlBuilder.detail()` for variable-length arrays (the user can add and remove items) or `ControlBuilder.detailFixed()` for fixed-length arrays (the number of items is determined by the initial data).

## Usage

::: tabs

@tab Preview

<ClientOnly>
  <div class="flex" style="gap: 4rem">
    <div>
      <h2>Fixed data array</h2>
      <FormComponent
        id="demo-fixed-array"
        :schema="formSchema"
        :ui-schema="fixedArrayUiSchema"
        :form-data="formData"
        @change="formData = $event"
      />
    </div>
    <div>
      <h2>Variable data array</h2>
      <FormComponent
        id="demo-variable-array"
        :schema="formSchema"
        :ui-schema="arrayUiSchema"
        :form-data="formData"
        @change="formData = $event"
      />
    </div>
  </div>
  <pre>{{ formData }}</pre>
</ClientOnly>

@tab Vue

```vue
<template>
  <FormComponent
    id="my-array-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :form-data="formData"
    @change="formData = $event"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ControlBuilder, LayoutBuilder } from '@ghentcdh/json-forms-core';
import { FormComponent } from '@ghentcdh/json-forms-vue';

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    emails: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          email: { type: 'string' },
        },
      },
    },
  },
};

// Variable-length array (add / remove items)
const uiSchema = LayoutBuilder.vertical()
  .addControls(
    ControlBuilder.properties('name'),
    ControlBuilder.properties('emails').detail(
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.properties('email'),
      ),
    ),
  )
  .build();

const formData = ref({
  name: '',
  emails: [{ email: '' }],
});
</script>
```

:::

## Array control types

### Variable-length array (`detail`)

Uses `ControlBuilder.properties('field').detail(layout)`. The user can add and remove items.

### Fixed-length array (`detailFixed`)

Uses `ControlBuilder.properties('field').detailFixed(layout)`. The number of items is determined by the initial data and cannot be changed by the user.

## UI schema examples

::: tabs

@tab Fixed array schema

```ts
const fixedArrayUiSchema = LayoutBuilder.vertical()
  .addControls(
    ControlBuilder.properties('name'),
    ControlBuilder.properties('emails').detailFixed(
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.properties('email'),
      ),
    ),
  )
  .build();
```

<pre>{{ fixedArrayUiSchema }}</pre>

@tab Variable array schema

```ts
const arrayUiSchema = LayoutBuilder.vertical()
  .addControls(
    ControlBuilder.properties('name'),
    ControlBuilder.properties('emails').detail(
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.properties('email'),
      ),
    ),
  )
  .build();
```

<pre>{{ arrayUiSchema }}</pre>

:::

<script setup lang="ts">
import { formSchema, fixedArrayUiSchema, arrayUiSchema } from '@source/json-forms/vue/schema';
import { ref } from 'vue';
import { FormComponent } from '@ghentcdh/json-forms-vue';

const formData = ref({
  name: '123',
  emails: [{ email: '' }, { email: '' }, { email: '' }],
});
</script>
