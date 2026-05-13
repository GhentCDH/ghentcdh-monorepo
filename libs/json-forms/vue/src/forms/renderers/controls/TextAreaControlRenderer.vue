<template>
  <Textarea
    v-bind="wrapper"
    v-model="value"
  />
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';

import { Textarea } from '@ghentcdh/ui';

import { useControlBinding } from './composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { wrapper, value } = useControlBinding(props.uischema, props.schema);
</script>
