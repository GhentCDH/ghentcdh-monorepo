<template>
  <ReadonlyWrapper v-bind="wrapper">
    <pre class="py-1 text-sm whitespace-pre-wrap break-words">{{
      formatted
    }}</pre>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import { ReadonlyWrapper } from '@ghentcdh/ui';

import { useControlBinding } from '../composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, wrapper } = useControlBinding(props.uischema, props.schema);

const formatted = computed(() =>
  value.value != null ? JSON.stringify(value.value, null, 2) : '-',
);
</script>
