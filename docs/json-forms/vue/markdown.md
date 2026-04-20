---
title: Markdown input
---

# Markdown input

A markdown editor control for `FormComponent`. Use `ControlBuilder.properties('field').markdown()` to render a rich-text markdown editor instead of a plain text input.

## Usage

::: tabs

@tab Preview

<ClientOnly>
  <div v-if="FormComp && uiSchema">
    <component
      :is="FormComp"
      id="demo-markdown"
      :schema="schema"
      :ui-schema="uiSchema"
      :form-data="formData"
      @change="formData = $event"
    />
    <pre>{{ formData }}</pre>
  </div>
</ClientOnly>

@tab Vue

```vue
<template>
  <FormComponent
    id="markdown-form"
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
    content: { type: 'string' },
  },
  required: ['content'],
};

const uiSchema = LayoutBuilder.vertical()
  .addControls(
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.properties('content').markdown(),
    ),
  )
  .build();

const formData = ref({ content: '**Bold** and *italic*' });
</script>
```

:::

## UI schema

Use `ControlBuilder.properties('field').markdown()` to enable the markdown editor:

```ts
import { ControlBuilder, LayoutBuilder } from '@ghentcdh/json-forms-core';

const uiSchema = LayoutBuilder.vertical()
  .addControls(
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.properties('content').markdown(),
    ),
  )
  .build();
```

The markdown control supports standard formatting: **bold**, *italic*, ~~strikethrough~~, and more.

<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';

const formData = ref({
  stringControl: `Example text **Bold**
Example text *italic*
Example text ~~strikethrough~~

 some more text`,
});

const schema = {
  type: 'object',
  properties: {
    stringControl: {
      type: 'string',
      maxLength: 5,
    },
  },
  required: ['stringControl'],
};

const FormComp = shallowRef<any>(null);
const uiSchema = ref<any>(null);

onMounted(async () => {
  const core = await import('@ghentcdh/json-forms-core');
  const vuePkg = await import('@ghentcdh/json-forms-vue');

  FormComp.value = vuePkg.FormComponent;

  const { ControlBuilder, LayoutBuilder } = core;

  uiSchema.value = LayoutBuilder.vertical()
    .addControls(
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.properties('stringControl').markdown(),
      ),
    )
    .build();
});
</script>
