<template>
  <div class="collapse collapse-arrow bg-white w-full border border-gray-300">
    <input type="checkbox" :checked="checked" />
    <div class="collapse-title text-gray-500 text-xs font-medium">
      {{ title }}
    </div>
    <div :class="['collapse-content', slots.list ? 'p-0' : '']">
      <slot />
      <ul v-if="slots.list" class="list bg-base-100">
        <slot name="list" />
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, useSlots, watch } from 'vue';

const slots = useSlots();

export interface CollapseProps {
  title: string;
  opened?: boolean;
}

const properties = withDefaults(defineProps<CollapseProps>(), {
  opened: true,
});

const checked = ref(properties.opened);

watch(
  () => properties.opened,
  () => {
    // set checked to true on checkbox
    // checked.value = properties.opened;
  },
  { immediate: true },
);
</script>
