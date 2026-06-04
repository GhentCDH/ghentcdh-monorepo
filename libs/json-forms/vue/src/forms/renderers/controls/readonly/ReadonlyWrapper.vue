<template>
  <ControlWrapper v-bind="properties">
    <slot />
  </ControlWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';

import { ControlWrapper } from '@ghentcdh/ui';

import { useControlBinding } from '../composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { wrapper } = useControlBinding(props.uischema, props.schema);

const properties = wrapper;
</script>
