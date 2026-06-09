<template>
  <ReadonlyWrapper v-bind="wrapper">
    <p class="py-1 min-h-8 text-sm">
      {{ displayLabels || '—' }}
    </p>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import { ReadonlyWrapper } from '@ghentcdh/ui';

import { useSelectBinding } from '../composable/UseSelectBinding';


const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, appliedOptions } = useSelectBinding(
  props.uischema,
  props.schema,
);

const displayLabels = computed(() => {
  const options = (appliedOptions.value as any).options as
    | { label: string; value: any }[]
    | undefined;
  const selected = value.value as any[] | undefined;
  if (!options || !Array.isArray(selected) || selected.length === 0)
    return undefined;
  return selected
    .map((v) => options.find((o) => o.value === v)?.label ?? String(v))
    .join(', ');
});
</script>
