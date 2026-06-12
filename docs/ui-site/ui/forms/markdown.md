# Markdown

A rich text editor component powered by Tiptap with markdown support.

::: warning Optional dependency
The Markdown editor relies on Tiptap, which is an **optional peer dependency** of `@ghentcdh/ui`. The component is loaded lazily, so consumers that never render it don't pull Tiptap into their bundle.

To use it, install the peers:

```sh
pnpm add @tiptap/pm @tiptap/starter-kit @tiptap/vue-3 tiptap-markdown
```

If they are not installed, `Markdown` degrades gracefully to a plain `<textarea>` that edits the raw Markdown string.
:::

## Usage

::: tabs

@tab Preview

<Markdown
v-model="markdownContent"
width="w-full"
label="The label"
/>

@tab Vue

```vue

<template>
  <Markdown
    v-model="markdownContent"
    label="The label"
  />
</template>

<script setup>
  import { Markdown } from "@ghentcdh/ui";
</script>
```

:::

## Props

| Prop          | Type              | Default              | Description                                                      |
|---------------|-------------------|----------------------|------------------------------------------------------------------|
| `v-model`     | `any`             | —                    | The markdown content                                             |
| `actions`     | `ToolbarAction[]` | Bold, Italic buttons | Toolbar actions for the editor                                   |
| `label`       | `String`          | —                    | Label displayed above the editor                                 |
| `description` | `String`          | —                    | Helper text displayed below the editor                           |
| `errors`      | `String`          | —                    | Error message to display                                         |
| `required`    | `Boolean`         | `false`              | Marks the field as required                                      |
| `enabled`     | `Boolean`         | `true`               | Whether the field is enabled                                     |
| `isTouched`   | `Boolean`         | `false`              | Whether the field has been interacted with (used to show errors) |
| `hideLabel`   | `Boolean`         | `false`              | Hides the label visually                                         |
| `minHeight`   | `String`          | `'min-h-96'`         | Tailwind min-height class for the editor                         |
| `width`       | `String`          | `'w-48'`             | Tailwind width class                                             |

## Events

| Event    | Payload  | Description                                        |
|----------|----------|----------------------------------------------------|
| `change` | `String` | Emitted with the markdown string on content change |

<script setup>
//
import { Markdown } from '@ghentcdh/ui';
import { ref } from 'vue';

const markdownContent = ref(`Example text **Bold**

Example text *italic*

Example text ~~strikethrough~~`);

</script>

<ClientOnly>

## Examples

### Default with preview

::: tabs

@tab Preview

<Markdown
v-model="markdownContent"
width="w-full"
label="The label"
/>

<pre class="border" style="margin-top: 10px">{{ markdownContent }}</pre>

@tab Vue

```vue

<template>
  <Markdown
    v-model="markdownContent"
    label="The label"
  />
  <pre>{{ markdownContent }}</pre>
</template>

<script setup>
  import { Markdown } from "@ghentcdh/ui";
  import { ref } from "vue";

  const markdownContent = ref("Example text **Bold**");
</script>
```

:::

</ClientOnly>
