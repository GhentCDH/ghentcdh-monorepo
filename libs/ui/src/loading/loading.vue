<template>
  <div class="flex items-center justify-center h-20" v-if="loading">
    <span class="loading loading-bars loading-md text-primary"></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean;
}>();
</script>
