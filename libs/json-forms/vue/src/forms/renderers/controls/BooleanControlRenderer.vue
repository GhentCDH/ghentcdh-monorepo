<template>
  <Checkbox
    v-bind="wrapper"
    :model-value="value"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';

import { Checkbox } from '@ghentcdh/ui';

import { useControlBinding } from './composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { wrapper, value, field } = useControlBinding(
  props.uischema,
  props.schema,
);

const onChange = (val: boolean) => {
  field.setValue(Boolean(val) ?? false);
};
</script>
