<template>
  <ReadonlyField v-bind="properties">
    <div class="min-h-6 whitespace-pre-wrap break-words rounded hover:bg-base-200">
      <slot />
    </div>
  </ReadonlyField>
</template>

<script setup lang="ts">
import { ControlWrapperProperties } from './ControlWrapper.properties';
import ReadonlyField from './ReadonlyField.vue';

const properties = defineProps(ControlWrapperProperties);
</script>
