<template>
  <p class="text-gray-500 text-sm">
    {{ EMPTY_VALUE }} · <small>Not set</small>
  </p>
</template>

<script setup lang="ts">
import { EMPTY_VALUE } from '../constants';
import { DisplayValueProperties } from './displayValue.properties';

defineProps(DisplayValueProperties);
</script>
