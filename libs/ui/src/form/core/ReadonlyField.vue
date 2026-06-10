<template>
  <div class="@container">
    <div
      class="grid grid-cols-1 gap-x-4 border-b border-base-200 last:border-b-0 @sm:grid-cols-[10rem_1fr] @sm:items-baseline"
    >
      <div
        v-if="!hideLabel"
        class="flex items-start gap-0.5 pt-2 pb-0.5 text-sm text-base-content/60 @sm:py-2"
      >
        <span>{{ label }}</span>
        <span
          v-if="required"
          class="text-error"
        >*</span>
      </div>
      <div class="min-w-0 break-words pb-2 text-sm text-base-content @sm:py-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ControlWrapperProperties } from './ControlWrapper.properties';

defineProps(ControlWrapperProperties);
</script>
