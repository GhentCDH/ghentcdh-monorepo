<template>
  <SelectComponent
    v-bind="wrapper"
    :model-value="value"
    :options="selectOptions"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import { SelectComponent } from '@ghentcdh/ui';
import { useSelectBinding } from './composable/UseSelectBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { wrapper, value, field, appliedOptions } = useSelectBinding(
  props.uischema,
  props.schema,
);

const selectOptions = computed(() => {
  return (appliedOptions.options as any) ?? [];
});

const onChange = (val: any) => {
  field.setValue(val);
};
</script>
