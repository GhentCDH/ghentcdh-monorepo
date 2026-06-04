<template>
  <ReadonlyWrapper
    :uischema="uischema"
    :schema="schema"
  >
    <span class="py-1 min-h-8 flex items-center text-sm">
      {{ value ? 'Yes' : 'No' }}
    </span>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';

import ReadonlyWrapper from './ReadonlyWrapper.vue';
import { useControlBinding } from '../composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value } = useControlBinding(props.uischema, props.schema);
</script>
