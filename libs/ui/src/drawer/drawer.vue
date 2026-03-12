<template>
  <main class="flex h-full overflow-hidden">
    <aside
      v-if="hasLeft"
      id="drawer-left"
      class="min-h-0 relative flex-shrink-0 bg-white overflow-visible flex"
    >
      <div
        :style="{ width: open.left ? widthLeft + 'px' : '0px' }"
        class="h-full overflow-hidden bg-white shadow-sm transition-[width] duration-300 ease-in-out"
      >
        <div
          :style="{ width: widthLeft + 'px' }"
          class="h-full overflow-y-auto p-4"
        >
          <slot name="left-drawer" />
        </div>
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
      class="min-h-0 relative flex-shrink-0 bg-white overflow-visible flex"
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
        :style="{ width: open.right ? widthRight + 'px' : '0px' }"
        class="h-full overflow-hidden bg-white shadow-sm transition-[width] duration-300 ease-in-out"
      >
        <div
          :style="{ width: widthRight + 'px' }"
          class="h-full overflow-y-auto p-4"
        >
          <slot name="right-drawer" />
        </div>
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
