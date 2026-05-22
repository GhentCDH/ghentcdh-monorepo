<template>
  <h1 class="text-xl mb-4">
    Select
  </h1>
  <SelectComponent
    v-bind="baseProps"
    id="color"
    v-model="value"
    label="Color"
    :options="options"
  />
  <ValueProbe :value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { SelectComponent } from '@ghentcdh/ui';

import ValueProbe from '../shared/ValueProbe.vue';
import { baseProps } from '../shared/baseProps';

const options = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
];

const value = ref<string | null>(null);
</script>
