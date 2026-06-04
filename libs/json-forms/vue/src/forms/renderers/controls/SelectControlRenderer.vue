<template>
  <SelectComponent
    v-bind="wrapper"
    :model-value="value"
    :options="selectOptions"
    :clearable="(appliedOptions as any).clearable ?? true"
    @change="onChange"
    @blur="onBlur"
  />
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import { SelectComponent } from '@ghentcdh/ui';

import { useSelectBinding } from './composable/UseSelectBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const {
  wrapper,
  value,
  field,
  onBlur,
  onChange: onFieldChange,
  appliedOptions,
} = useSelectBinding(props.uischema, props.schema);

const selectOptions = computed(() => {
  const opts = appliedOptions.value as any;
  return opts.options ?? opts.values ?? [];
});

const valueKey = computed(() => (appliedOptions.value as any).valueKey ?? 'value');

const onChange = (val: any) => {
  const opts = appliedOptions.value as any;
  const stored = opts.storeValue && val && typeof val === 'object'
    ? val[valueKey.value]
    : val;
  field.setValue(stored);
  onFieldChange();
};
</script>
