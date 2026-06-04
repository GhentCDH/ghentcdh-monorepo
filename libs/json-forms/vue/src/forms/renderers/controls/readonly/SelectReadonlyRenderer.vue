<template>
  <ReadonlyWrapper
    :uischema="uischema"
    :schema="schema"
  >
    <p class="py-1 min-h-8 text-sm">
      {{ displayLabel ?? '—' }}
    </p>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import ReadonlyWrapper from './ReadonlyWrapper.vue';
import { useSelectBinding } from '../composable/UseSelectBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, appliedOptions } = useSelectBinding(props.uischema, props.schema);

const displayLabel = computed(() => {
  const options = (appliedOptions.value as any).options as { label: string; value: any }[] | undefined;
  if (!options || value.value == null) return undefined;
  const match = options.find((o) => o.value === value.value);
  return match?.label ?? String(value.value);
});
</script>
