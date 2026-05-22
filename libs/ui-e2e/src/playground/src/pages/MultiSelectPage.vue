<template>
  <h1 class="text-xl mb-4">
    MultiSelect
  </h1>
  <MultiSelect
    v-bind="baseProps"
    id="tags"
    v-model="value"
    label="Tags"
    :options="options"
  />
  <ValueProbe :value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { MultiSelect } from '@ghentcdh/ui';

import ValueProbe from '../shared/ValueProbe.vue';
import { baseProps } from '../shared/baseProps';

const options = [
  { label: 'Alpha', value: 'a' },
  { label: 'Beta', value: 'b' },
  { label: 'Gamma', value: 'c' },
];

const value = ref<string[]>([]);
</script>
