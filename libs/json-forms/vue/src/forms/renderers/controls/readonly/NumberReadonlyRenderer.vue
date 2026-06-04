<template>
  <ReadonlyWrapper
    :uischema="uischema"
    :schema="schema"
  >
    <p class="py-1 min-h-8 text-sm">
      {{ displayValue }}
    </p>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import ReadonlyWrapper from './ReadonlyWrapper.vue';
import { useControlBinding } from '../composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value } = useControlBinding(props.uischema, props.schema, { defaultType: 'number' });

const displayValue = computed(() => {
  if (value.value == null || value.value === '') return '—';
  return value.value;
});
</script>
