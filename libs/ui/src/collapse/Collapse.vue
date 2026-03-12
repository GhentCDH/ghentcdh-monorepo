<template>
  <div
    :class="[
      'collapse collapse-arrow bg-white w-full border border-gray-300',
      heightFull ? 'h-full' : '',
    ]"
  >
    <input
      type="checkbox"
      :checked="checked"
    >
    <div class="collapse-title text-gray-500 text-xs font-medium">
      {{ title }}
    </div>
    <div :class="['collapse-content', slots.list ? 'p-0' : '']">
      <slot />
      <ul
        v-if="slots.list"
        class="list bg-base-100"
      >
        <slot name="list" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue';

import { CollapseProperties } from './Collapse.properties';

const slots = useSlots();
const properties = defineProps(CollapseProperties);
const checked = ref(properties.opened);
</script>
