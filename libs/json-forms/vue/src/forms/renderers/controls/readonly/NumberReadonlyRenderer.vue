<template>
  <ReadonlyWrapper :uischema="uischema" :schema="schema">
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
import { useDisplayValue } from './useDisplayValue';
import { useFormContext } from 'vee-validate';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { values: formValues } = useFormContext();
const { value } = useControlBinding(props.uischema, props.schema, {
  defaultType: 'number',
});

const displayValue = computed(() => {
  return (
    useDisplayValue(value.value, formValues, props.uischema.options) ?? '-'
  );
});
</script>
