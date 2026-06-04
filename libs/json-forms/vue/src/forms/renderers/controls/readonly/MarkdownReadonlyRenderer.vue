<template>
  <ReadonlyWrapper
    :uischema="uischema"
    :schema="schema"
  >
    <div
      class="prose prose-sm max-w-none py-1 min-h-8"
      v-html="renderedHtml"
    />
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import ReadonlyWrapper from './ReadonlyWrapper.vue';
import { useControlBinding } from '../composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value } = useControlBinding(props.uischema, props.schema);

const renderedHtml = computed(() => {
  const raw = value.value as string | undefined;
  if (!raw) return '';
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
});
</script>
