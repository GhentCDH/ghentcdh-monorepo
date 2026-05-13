<template>
  <InputNumber
    v-bind="wrapper"
    v-model="value"
    :steps="1"
  />
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';

import { InputNumber } from '@ghentcdh/ui';

import { useControlBinding } from './composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { wrapper, value } = useControlBinding(props.uischema, props.schema, {
  defaultType: 'number',
});
</script>
