<template>
  <ControlWrapper
    v-bind="properties"
    :hide-errors="true"
  >
    <div
      class="min-h-8 text-sm whitespace-pre-wrap break-words hover:bg-base-200 p-2 pr-10"
    >
      <slot />
    </div>
  </ControlWrapper>
</template>

<script setup lang="ts">
import { ControlWrapperProperties } from './ControlWrapper.properties';
import ControlWrapper from './ControlWrapper.vue';

const properties = defineProps(ControlWrapperProperties);
</script>
