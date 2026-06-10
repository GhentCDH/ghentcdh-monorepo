<template>
  <ReadonlyWrapper v-bind="wrapper">
    <p>{{ displayValue }}</p>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import { ReadonlyWrapper } from '@ghentcdh/ui';

import { EMPTY_VALUE } from './constants';
import { formatDate } from './formatDate';
import { useDisplayValue } from './useDisplayValue';
import { useControlBinding } from '../composables/useControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, wrapper, formValues } = useControlBinding(
  props.uischema,
  props.schema,
);

const opts = (props.uischema.options ?? {}) as Record<string, any>;
const schemaFormat = (props.schema as any)?.format;

// Date-only when the format explicitly says so; otherwise include the time.
const isDateOnly =
  opts.format?.toLowerCase() === 'date' || schemaFormat === 'date';

const displayValue = computed(() => {
  const raw = useDisplayValue(value.value, formValues, opts);
  return (
    formatDate(raw, {
      withTime: opts.withTime ?? !isDateOnly,
      relative: opts.relative ?? true,
      locale: opts.locale,
    }) ?? EMPTY_VALUE
  );
});
</script>
