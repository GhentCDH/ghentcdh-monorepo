<template>
  <pre data-testid="value">{{ json }}</pre>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/* Renders any component's current modelValue as JSON so specs can assert
 * via `page.locator('[data-testid="value"]').textContent()`. */
const props = defineProps<{ value: unknown }>();
const json = computed(() => JSON.stringify(props.value));
</script>
