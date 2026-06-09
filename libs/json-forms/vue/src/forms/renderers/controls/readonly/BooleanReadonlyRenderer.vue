<template>
  <ReadonlyWrapper v-bind="wrapper">
    <span class="py-1 min-h-8 flex items-center text-sm">
      <Icon
        v-if="value === true"
        :icon="IconEnum.Check"
        size="sm"
      />
    </span>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';

import { Icon, IconEnum, ReadonlyWrapper } from '@ghentcdh/ui';

import { useControlBinding } from '../composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, wrapper } = useControlBinding(props.uischema, props.schema);
</script>
