<template>
  <ReadonlyWrapper v-bind="wrapper">
    <span
      v-if="value === true"
      class="inline-flex items-center gap-1 text-success"
    >
      <Icon
        :icon="IconEnum.Check"
        size="sm"
      />
      <span>Yes</span>
    </span>
    <span
      v-else-if="value === false"
      class="inline-flex items-center gap-1 text-base-content/50"
    >
      <Icon
        :icon="IconEnum.Close"
        size="sm"
      />
      <span>No</span>
    </span>
    <span
      v-else
      class="text-base-content/50"
    >
      {{ EMPTY_VALUE }}
    </span>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';

import { Icon, IconEnum, ReadonlyWrapper } from '@ghentcdh/ui';

import { EMPTY_VALUE } from './constants';
import { useControlBinding } from '../composables/useControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, wrapper } = useControlBinding(props.uischema, props.schema);
</script>
