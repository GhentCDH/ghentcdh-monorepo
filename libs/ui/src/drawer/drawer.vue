<template>
  <main class="grid grid-cols-[auto_1fr_auto] h-full overflow-hidden">
    <aside
      id="drawer-left"
      class="min-h-0 min-w-6 relative flex-shrink-0 bg-white shadow-lg transition-all duration-300 ease-in-out border-l border-gray-200 overflow-visible"
    >
      <div
        :class="['absolute top-0 z-20', open.left ? '-right-0' : '-right-2']"
      >
        <button
          class="btn btn-ghost btn-circle"
          @click="toggle('left')"
        >
          <Icon
            :size="'sm'"
            :icon="
              open.left ? IconEnum.DblChevronLeft : IconEnum.DblChevronRight
            "
          />
        </button>
      </div>
      <div
        v-if="open.left"
        :style="{ width: widthLeft + 'px' }"
        class="h-full overflow-y-auto p-4"
      >
        <slot name="left-drawer" />
      </div>
    </aside>
    <div class="flex-1 overflow-y-auto bg-white">
      <slot />
    </div>
    <aside
      class="min-h-0 min-w-6 relative flex-shrink-0 bg-white shadow-lg transition-all duration-300 ease-in-out border-l border-gray-200 overflow-visible"
    >
      <div
        v-if="open.right"
        :style="{ width: widthRight + 'px' }"
        class="h-full overflow-y-auto p-4"
      >
        <slot name="right-drawer" />
      </div>
      <div :class="['absolute top-0 z-20', open.right ? '-left-0' : '-left-2']">
        <button
          class="btn btn-ghost btn-circle"
          @click="toggle('right')"
        >
          <Icon
            :size="'sm'"
            :icon="
              open.right ? IconEnum.DblChevronRight : IconEnum.DblChevronLeft
            "
          />
        </button>
      </div>
    </aside>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Icon, IconEnum } from '../icons';

const props = withDefaults(
  defineProps<{
    widthLeft?: number;
    widthRight?: number;
  }>(),
  {
    widthLeft: 200,
    widthRight: 200,
  },
);

const open = ref({ left: true, right: true });

const toggle = (side: 'left' | 'right') => {
  open.value[side] = !open.value[side];
};
</script>
