<template>
  <h1 class="text-xl mb-4">
    Input
  </h1>
  <Input
    v-bind="baseProps"
    id="name"
    v-model="value"
    label="Name"
    :required="true"
  />
  <ValueProbe :value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Input } from '@ghentcdh/ui';

import ValueProbe from '../shared/ValueProbe.vue';
import { baseProps } from '../shared/baseProps';

const value = ref('');
</script>
