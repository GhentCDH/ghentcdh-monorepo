<template>
  <ReadonlyWrapper
    :uischema="uischema"
    :schema="schema"
  >
    <p
      class="py-1 min-h-8 text-sm whitespace-pre-wrap break-words"
      :dir="dir"
    >
      <a
        v-if="isLink"
        :href="displayValue"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ displayValue }}
      </a>
      <template v-else>
        {{ displayValue ?? '-' }}
      </template>
    </p>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { useFormContext } from 'vee-validate';
import { computed, inject } from 'vue';

import ReadonlyWrapper from './ReadonlyWrapper.vue';
import { useControlBinding } from '../composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, appliedOptions } = useControlBinding(props.uischema, props.schema);

const pathPrefix = inject<string>('pathPrefix', '');
const opts = (props.uischema.options ?? {}) as any;

const { values: formValues } = useFormContext();

const dir = computed<'ltr' | 'rtl'>(() => {
  if (!opts.directionField) return (opts.direction as 'ltr' | 'rtl') ?? 'ltr';
  const key = pathPrefix ? `${pathPrefix}.${opts.directionField}` : opts.directionField;
  const val = key.split('.').reduce((o: any, k: string) => o?.[k], formValues);
  return (val as 'ltr' | 'rtl') ?? 'ltr';
});

// When the field value is a nested object (e.g. an included relation),
// options.key extracts the display property (same as displayKey in column config).
const displayValue = computed(() => {
  const raw = value.value;
  if (raw !== null && typeof raw === 'object' && opts.key) {
    return (raw as any)[opts.key] ?? null;
  }
  return raw ?? null;
});

const isLink = computed(
  () => typeof displayValue.value === 'string' && displayValue.value.startsWith('http'),
);
</script>
