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
import { useAutocompleteBinding } from '../composable/UseSelectBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, appliedOptions } = useAutocompleteBinding(props.uischema, props.schema);

// The autocomplete renderer stores { [valueKey]: ..., [labelKey]: ... } in the field.
// We read the labelKey field directly — no refetch needed.
const displayLabel = computed(() => {
  const opts = appliedOptions.value as any;
  const labelKey: string = opts.labelKey ?? 'label';
  const stored = value.value as Record<string, unknown> | string | undefined;
  if (!stored) return undefined;
  if (typeof stored === 'object') return String(stored[labelKey] ?? stored[opts.valueKey ?? 'value'] ?? '');
  return String(stored);
});
</script>
