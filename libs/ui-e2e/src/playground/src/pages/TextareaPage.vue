<template>
  <h1 class="text-xl mb-4">
    Textarea
  </h1>
  <Textarea
    v-bind="baseProps"
    id="comment"
    v-model="value"
    label="Comment"
    :rows="4"
  />
  <ValueProbe :value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Textarea } from '@ghentcdh/ui';

import ValueProbe from '../shared/ValueProbe.vue';
import { baseProps } from '../shared/baseProps';

const value = ref('');
</script>
