<template>
  <main class="flex h-full overflow-hidden">
    <aside
      v-if="hasLeft"
      id="drawer-left"
      class="min-h-0 relative flex-shrink-0 bg-white transition-all duration-300 ease-in-out overflow-visible flex"
    >
      <div
        v-if="open.left"
        :style="{ width: widthLeft + 'px' }"
        class="h-full overflow-y-auto p-4 bg-white shadow-sm"
      >
        <slot name="left-drawer" />
      </div>
      <button
        class="hover:bg-base-300 hover:text-base-content transition-colors cursor-pointer"
        @click="toggle('left')"
      >
        <Icon
          :size="'sm'"
          :icon="open.left ? IconEnum.ChevronLeft : IconEnum.ChevronRight"
        />
      </button>
    </aside>
    <div class="flex-1 overflow-y-auto bg-white">
      <slot />
    </div>
    <aside
      v-if="hasRight"
      class="min-h-0 relative flex-shrink-0 bg-white transition-all duration-300 ease-in-out overflow-visible flex"
    >
      <button
        class="hover:bg-base-300 hover:text-base-content transition-colors cursor-pointer"
        @click="toggle('right')"
      >
        <Icon
          :size="'sm'"
          :icon="open.right ? IconEnum.ChevronRight : IconEnum.ChevronLeft"
        />
      </button>
      <div
        v-if="open.right"
        :style="{ width: widthRight + 'px' }"
        class="h-full overflow-y-auto p-4 bg-white shadow-sm"
      >
        <slot name="right-drawer" />
      </div>
    </aside>
  </main>
</template>

<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue';

import { DrawerProperties } from './drawer.properties';
import { Icon, IconEnum } from '../icons';

const props = defineProps(DrawerProperties);
const slots = useSlots();

const hasLeft = computed(() => !!slots['left-drawer']);
const hasRight = computed(() => !!slots['right-drawer']);

const open = ref({
  left: props.initialLeftOpen,
  right: props.initialRightOpen,
});

const toggle = (side: 'left' | 'right') => {
  open.value[side] = !open.value[side];
};
</script>
