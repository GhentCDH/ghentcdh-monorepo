<template>
  <ReadonlyWrapper v-bind="wrapper">
    <p class="py-1 min-h-8 text-sm">
      {{ displayValue }}
    </p>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import { ReadonlyWrapper } from '@ghentcdh/ui';

import { useDisplayValue } from './useDisplayValue';
import { useControlBinding } from '../composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, wrapper, formValues } = useControlBinding(
  props.uischema,
  props.schema,
  {
    defaultType: 'number',
  },
);

const displayValue = computed(() => {
  return (
    useDisplayValue(value.value, formValues, props.uischema.options) ?? '-'
  );
});
</script>
