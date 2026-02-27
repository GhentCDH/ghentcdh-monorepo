<template>
  <div
    role="alert"
    :class="`alert alert-soft ${Colors[type]} `"
  >
    <span class="text-gray-800">{{ message }}</span>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { NotificationType } from './alert.model.ts';

defineProps<{
  message: string;
  type: NotificationType;
}>();

const Colors: Record<NotificationType, string> = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info',
};
</script>
