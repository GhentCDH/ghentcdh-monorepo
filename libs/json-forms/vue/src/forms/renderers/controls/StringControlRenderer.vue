<!-- src/forms/fields/TextControl.vue -->
<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';

import { Input } from '@ghentcdh/ui';

import { useControlBinding } from './composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { wrapper, value } = useControlBinding(props.uischema, props.schema);
</script>

<template>
  <Input
    v-bind="wrapper"
    v-model="value"
  />
</template>
