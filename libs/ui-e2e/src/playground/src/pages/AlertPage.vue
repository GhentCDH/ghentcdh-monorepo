<template>
  <h1 class="text-xl mb-4">
    Alert
  </h1>
  <div class="flex flex-col gap-2">
    <Alert
      message="Operation successful"
      type="success"
    />
    <Alert
      message="Something went wrong"
      type="error"
    />
    <Alert
      message="Check your input"
      type="warning"
    />
    <Alert
      message="For your information"
      type="info"
    />
  </div>
</template>

<script setup lang="ts">
import { Alert } from '@ghentcdh/ui';
</script>
