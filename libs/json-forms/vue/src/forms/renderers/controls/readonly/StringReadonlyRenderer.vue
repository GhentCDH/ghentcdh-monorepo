<template>
  <ReadonlyWrapper v-bind="wrapper">
    <p :dir="dir">
      <a
        v-if="isLink"
        :href="_displayValue"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ _displayValue }}
      </a>
      <template v-else>
        {{ _displayValue ?? '-' }}
      </template>
    </p>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed, inject } from 'vue';

import { ReadonlyWrapper } from '@ghentcdh/ui';

import { useDisplayValue } from './useDisplayValue';
import { useControlBinding } from '../composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, wrapper, formValues } = useControlBinding(
  props.uischema,
  props.schema,
);

const pathPrefix = inject<string>('pathPrefix', '');
const opts = (props.uischema.options ?? {}) as any;

const dir = computed<'ltr' | 'rtl'>(() => {
  if (!opts.directionField) return (opts.direction as 'ltr' | 'rtl') ?? 'ltr';
  const key = pathPrefix
    ? `${pathPrefix}.${opts.directionField}`
    : opts.directionField;
  const val = key.split('.').reduce((o: any, k: string) => o?.[k], formValues);
  return (val as 'ltr' | 'rtl') ?? 'ltr';
});

// When dataPath is set, read from a sibling form field (e.g. bibliography.title).
// When options.key is set on an object value, extract that property.
const _displayValue = computed(() => {
  return useDisplayValue(value.value, formValues, opts);
});

const isLink = computed(
  () =>
    typeof _displayValue.value === 'string' &&
    _displayValue.value.startsWith('http'),
);
</script>
