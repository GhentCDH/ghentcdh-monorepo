<template>
  <ReadonlyWrapper
    :uischema="uischema"
    :schema="schema"
  >
    <span class="py-1 min-h-8 flex items-center text-sm">
      <Icon
        v-if="value === true"
        :icon="IconEnum.Check"
        size="sm"
      />
    </span>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { useFormContext } from 'vee-validate';
import { computed } from 'vue';

import { Icon, IconEnum } from '@ghentcdh/ui';

import ReadonlyWrapper from './ReadonlyWrapper.vue';
import { useDisplayValue } from './useDisplayValue';
import { useControlBinding } from '../composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value } = useControlBinding(props.uischema, props.schema);

const { values: formValues } = useFormContext();
const displayValue = computed(() => {
  return (
    useDisplayValue(value.value, formValues, props.uischema.options) ?? '-'
  );
});
</script>
