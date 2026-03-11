<template>
  <div ref="selectWrapperRef">
    <ControlWrapper v-bind="props">
      <div
        class="relative"
        @keydown="onKeydown"
      >
        <div class="overflow-hidden">
          <slot />
        </div>
        <!-- Right icons -->
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-3 gap-1 pointer-events-none"
        >
          <span
            v-if="isLoading && !label"
            class="loading loading-spinner loading-xs text-primary pointer-events-none"
          />

          <!-- Clear button -->
          <button
            v-if="query && !isLoading"
            type="button"
            class="pointer-events-auto btn btn-ghost btn-xs btn-circle opacity-60 hover:opacity-100"
            tabindex="-1"
            aria-label="Clear"
            @mousedown.prevent="clear"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Chevron -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 opacity-40 transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <!-- Dropdown -->
        <Transition
          enter-active-class="transition-all duration-150 ease-out"
          enter-from-class="opacity-0 -translate-y-1 scale-y-95"
          enter-to-class="opacity-100 translate-y-0 scale-y-100"
          leave-active-class="transition-all duration-100 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-y-100"
          leave-to-class="opacity-0 -translate-y-1 scale-y-95"
        >
          <ListResults
            v-if="isOpen"
            ref="listResultsRef"
            :query="query"
            :options="options"
            :is-loading="isLoading"
            :is-active="isActive"
            @select="emits('select', $event)"
          />
        </Transition>
      </div>
    </ControlWrapper>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import ListResults from './ListResults.vue';
import { SelectWrapperProperties } from './SelectWrapper.properties';
import ControlWrapper from '../core/ControlWrapper.vue';

const props = defineProps(SelectWrapperProperties);

const selectWrapperRef = ref<HTMLElement>();
const listResultsRef = ref<InstanceType<typeof ListResults>>();
const emits = defineEmits(['select', 'clear', 'close']);

const clear = () => {
  close();
  emits('clear');
};
const close = () => {
  emits('close');
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close();
    return;
  }
  listResultsRef.value?.handleKeydown(e);
};

const handleOutsideClick = (e: MouseEvent) => {
  if (
    selectWrapperRef.value &&
    !selectWrapperRef.value.contains(e.target as Node)
  ) {
    close();
  }
};
onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});
onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>
