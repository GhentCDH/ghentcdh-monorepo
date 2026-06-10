<template>
  <ReadonlyWrapper v-bind="wrapper">
    <pre class="whitespace-pre-wrap break-words text-sm">{{ formatted }}</pre>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import { ReadonlyWrapper } from '@ghentcdh/ui';

import { EMPTY_VALUE } from './constants';
import { useControlBinding } from '../composables/useControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, wrapper } = useControlBinding(props.uischema, props.schema);

const formatted = computed(() =>
  value.value != null ? JSON.stringify(value.value, null, 2) : EMPTY_VALUE,
);
</script>
