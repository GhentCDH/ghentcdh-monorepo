<template>
  <div
    v-if="isLayout"
    :class="getLayout"
  >
    <div
      v-for="(child, i) in (uischema as Layout).elements"
      :key="i"
      :class="COLSPAN[(child as any).options?.colspan ?? 12]"
    >
      <Dispatch
        :uischema="child"
        :schema="schema"
      />
    </div>
  </div>

  <div
    v-else
    class="flex flex-col gap-3"
  >
    No Applicable Layout found
  </div>
</template>

<script setup lang="ts">
import type { JsonSchema, Layout, UISchemaElement } from '@jsonforms/core';
import { computed } from 'vue';

import { COLSPAN } from './colspan';
import Dispatch from '../../Dispatch.vue';

const props = defineProps<{
  uischema: UISchemaElement;
  schema: JsonSchema;
}>();

const LAYOUT: Record<string, string> = {
  GridLayout: 'grid grid-cols-12 gap-3',
  HorizontalLayout: 'flex flex-row gap-3',
  VerticalLayout: 'flex flex-col gap-3',
};

const getLayout = computed(() => LAYOUT[props.uischema.type]);
const isLayout = computed(() => props.uischema.type in LAYOUT);
</script>
