---
title: Markdown input
---

# Markdown input

A markdown editor control for `JsonForm`. Use `ControlBuilder.properties('field').markdown()` to render a rich-text markdown editor instead of a plain text input.

## Usage

::: tabs

@tab Preview

<ClientOnly>
  <JsonForm 
    id="markdown-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :form-data="formData"
    @change="formData = $event"
  />
</ClientOnly>

@tab Vue

```vue

<template>
  <JsonForm
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
  import { JsonForm } from '@ghentcdh/json-forms-vue';

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
//

  import { ref } from 'vue';
  import { ControlBuilder, LayoutBuilder } from '@ghentcdh/json-forms-core';
  import { JsonForm } from '@ghentcdh/json-forms-vue';

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
