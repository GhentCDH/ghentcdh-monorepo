<template>
  <ul
    ref="listRef"
    role="listbox"
    class="absolute z-50 w-full mt-1 menu bg-base-100 border border-base-300 rounded-box shadow-xl overflow-y-auto max-h-64 origin-top p-1"
  >
    <!-- Loading skeleton rows -->
    <template v-if="isLoading">
      <li
        v-for="n in 2"
        :key="`skel-${n}`"
        class="pointer-events-none px-3 py-2"
      >
        <div class="flex items-center gap-3">
          <div class="skeleton h-3 w-3/4 rounded" />
        </div>
      </li>
    </template>
    <!-- No results -->
    <li
      v-else-if="options.length === 0"
      class="pointer-events-none"
    >
      <span class="px-3 py-2 text-sm opacity-50 italic">
        No results found
      </span>
    </li>

    <!-- Result items -->
    <template v-else>
      <li
        v-for="(item, i) in options"
        :key="getValue(item, props)"
        :data-index="i"
        role="option"
        :aria-selected="i === activeIndex"
        @mousedown.prevent="select(item)"
        @mousemove="activeIndex = i"
      >
        <a
          class="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors duration-100"
          :class="{
            'active bg-secondary text-primary-content': i === activeIndex,
            'hover:bg-base-200': i !== activeIndex,
          }"
        >
          <!-- Highlight matching text -->
          <span v-html="highlight(getLabel(item, props), query)" />

          <!-- Active checkmark -->
          <svg
            v-if="isActive(item)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 shrink-0 opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </a>
      </li>
    </template>
  </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import { ListProperties, getLabel, getValue } from './ListResults.properties';

const props = defineProps(ListProperties);
const activeIndex = ref(-1);

const emits = defineEmits(['select']);

function select(item) {
  activeIndex.value = -1;
  emits('select', item);
}
</script>

<script lang="ts">
// ─── Highlight helper (outside setup so it's available in template) ───────────
export function highlight(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(
    new RegExp(`(${escaped})`, 'gi'),
    '<mark class="bg-warning/40 text-inherit rounded-sm px-0.5">$1</mark>',
  );
}
</script>
