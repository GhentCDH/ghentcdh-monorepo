<template>
  <MultiSelect
    v-bind="wrapper"
    :model-value="value"
    @change="onChange"
    @blur="onBlur"
  />
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';

import { MultiSelect } from '@ghentcdh/ui';

import { useSelectBinding } from './composable/UseSelectBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const {
  wrapper,
  value,
  field,
  onBlur,
  onChange: onFieldChange,
} = useSelectBinding(props.uischema, props.schema);

const onChange = (val: any) => {
  field.setValue(val);
  onFieldChange();
};
</script>
