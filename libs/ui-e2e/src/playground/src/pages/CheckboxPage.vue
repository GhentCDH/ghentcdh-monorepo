<template>
  <h1 class="text-xl mb-4">
    Checkbox
  </h1>
  <Checkbox
    v-bind="baseProps"
    id="accept"
    v-model="value"
    label="I accept"
  />
  <ValueProbe :value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Checkbox } from '@ghentcdh/ui';

import ValueProbe from '../shared/ValueProbe.vue';
import { baseProps } from '../shared/baseProps';

const value = ref(false);
</script>
