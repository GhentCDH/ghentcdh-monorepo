<template>{{ value }}</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { TextCellProperties } from './text.cell.properties';

const props = defineProps(TextCellProperties);

const value = computed(() => {
  const val = props.data[props.column.id];
  if (!val) return null;

  if (props.column.options?.format === 'keyValue') {
    return val[props.column.options.key];
  }

  return val;
});
</script>
