<template>
  <li class="list-row">
    <div class="list-col-grow">
      <div>{{ title }}</div>
      <div class="text-xs text-gray-600" v-if="description || descriptionLink">
        <a v-if="descriptionLink" :href="descriptionLink" target="_blank">
          {{ description ?? descriptionLink }}
        </a>
        <span v-else>{{ description }}</span>
      </div>
    </div>
    <div v-if="label" class="text-xs text-gray-600">
      <a v-if="labelLink" :href="labelLink" target="_blank">
        {{ label }}
      </a>
      <span v-else>{{ label }}</span>
    </div>
  </li>
</template>
<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();

export interface CollapseRowProps {
  title: string;
  label?: string;
  labelLink?: string;
  description?: string;
  descriptionLink?: string;
}

const properties = withDefaults(defineProps<CollapseRowProps>(), {});
</script>
