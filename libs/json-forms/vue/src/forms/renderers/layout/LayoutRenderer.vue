<template>
  <!-- Collapse layout -->
  <Collapse
    v-if="isCollapse"
    :title="(uischema as any).label ?? 'Details'"
  >
    <div class="flex flex-col gap-3">
      <div
        v-for="(child, i) in uischema.elements"
        :key="i"
        :class="COLSPAN[(child as any).options?.colspan ?? 12]"
      >
        <Dispatch
          :uischema="child"
          :schema="schema"
        />
      </div>
    </div>
  </Collapse>

  <!-- Standard layouts: Grid / Horizontal / Vertical -->
  <div
    v-else-if="isLayout"
    :class="getLayout"
  >
    <div
      v-for="(child, i) in uischema.elements"
      :key="i"
      :class="COLSPAN[(child as any).options?.colspan ?? 12]"
    >
      <Dispatch
        :uischema="child"
        :schema="schema"
      />
    </div>
  </div>

  <!-- Fallback -->
  <div
    v-else
    class="flex flex-col gap-3"
  >
    No Applicable Layout found
  </div>
</template>

<script setup lang="ts">
import type { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { computed } from 'vue';

import { Collapse } from '@ghentcdh/ui';

import Dispatch from '../../Dispatch.vue';
import { COLSPAN } from './colspan';

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
const isCollapse = computed(() => props.uischema.type === 'CollapseLayout');
</script>
