<template>
  <ReadonlyWrapper
    :uischema="uischema"
    :schema="schema"
  >
    <p class="py-1 min-h-8 text-sm">
      <a
        v-if="href"
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        class="link link-primary break-all"
      >{{ href }}</a>
      <span v-else>—</span>
    </p>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import ReadonlyWrapper from './ReadonlyWrapper.vue';
import { useControlBinding } from '../composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value } = useControlBinding(props.uischema, props.schema);

const href = computed(() => {
  const v = value.value as string | undefined | null;
  return v || undefined;
});
</script>
