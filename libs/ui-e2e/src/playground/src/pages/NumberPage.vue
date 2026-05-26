<template>
  <h1 class="text-xl mb-4">
    InputNumber
  </h1>
  <InputNumber
    v-bind="baseProps"
    id="age"
    v-model="value"
    label="Age"
  />
  <ValueProbe :value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { InputNumber } from '@ghentcdh/ui';

import ValueProbe from '../shared/ValueProbe.vue';
import { baseProps } from '../shared/baseProps';

const value = ref<number | null>(null);
</script>
