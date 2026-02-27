<template>
  <ControlWrapper v-bind="properties">
    <div class="card bg-base-100 border border-base-300">
      <!-- Toolbar -->
      <div
        class="flex items-center gap-1 px-3 py-2 border-b border-base-300 bg-base-200"
      >
        <button
          v-for="action in actions"
          :key="action.name"
          type="button"
          class="btn btn-sm btn-ghost"
          :class="{ 'btn-active': editor?.isActive(action.name) }"
          :title="action.label"
          @click="action.action(editor)"
        >
          <span v-html="action.label" />
        </button>
      </div>

      <!-- Editor -->
      <div class="card-body p-3">
        <EditorContent
          :editor="editor"
          class="prose prose-sm max-w-none min-h-96"
        />
      </div>
    </div>
  </ControlWrapper>
</template>

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { Markdown } from 'tiptap-markdown';
import { onBeforeUnmount } from 'vue';

import ControlWrapper from './core/ControlWrapper.vue';
import type { MarkdownProperties } from './core/properties';
import { DefaultControlProperties } from './core/properties';

const properties = withDefaults(defineProps<MarkdownProperties>(), {
  ...DefaultControlProperties(),
  actions: () => [
    {
      label: '<strong>B</strong>',
      name: 'bold',
      action: (editor) => editor?.chain().focus().toggleBold().run(),
    },
    {
      label: '<em>I</em>',
      name: 'italic',
      action: (editor) => editor?.chain().focus().toggleItalic().run(),
    },
  ],
});

const emit = defineEmits<{
  change: [value: string];
}>();
const model = defineModel();

const editor = useEditor({
  content: model.value ?? '',
  extensions: [
    StarterKit.configure({
      heading: false,
      blockquote: false,
      bulletList: false,
      orderedList: false,
      listItem: false,
      code: false,
      codeBlock: false,
      horizontalRule: false,
      hardBreak: false,
    }),
    Markdown.configure({
      html: false,
      transformPastedText: true, // parse markdown on paste
    }),
  ],
  onUpdate({ editor }) {
    emit('change', editor.storage.markdown.getMarkdown());
  },
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style scoped>
:deep(.ProseMirror) {
  outline: none;
}
</style>
