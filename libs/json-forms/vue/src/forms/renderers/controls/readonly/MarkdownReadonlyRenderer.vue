<template>
  <ReadonlyWrapper v-bind="wrapper">
    <div
      class="prose prose-sm max-w-none py-1 min-h-8"
      v-html="renderedHtml"
    />
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { useFormContext } from 'vee-validate';
import { computed } from 'vue';

import { ReadonlyWrapper } from '@ghentcdh/ui';

import { useDisplayValue } from './useDisplayValue';
import { useControlBinding } from '../composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, wrapper } = useControlBinding(props.uischema, props.schema);

const { values: formValues } = useFormContext();
const renderedHtml = computed(() => {
  const raw = useDisplayValue(value.value, formValues, props.uischema.options);

  if (!raw) return '';
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
});
</script>
