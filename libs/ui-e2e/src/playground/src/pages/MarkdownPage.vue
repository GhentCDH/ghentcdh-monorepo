<template>
  <h1 class="text-xl mb-4">
    Markdown
  </h1>
  <Markdown
    v-bind="baseProps"
    id="content"
    v-model="value"
    label="Content"
  />
  <ValueProbe :value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Markdown } from '@ghentcdh/ui';

import ValueProbe from '../shared/ValueProbe.vue';
import { baseProps } from '../shared/baseProps';

const value = ref('');
</script>
