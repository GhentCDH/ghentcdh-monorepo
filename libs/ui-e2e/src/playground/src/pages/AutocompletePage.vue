<template>
  <h1 class="text-xl mb-4">
    AutoComplete
  </h1>
  <Autocomplete
    v-bind="baseProps"
    id="author"
    v-model="value"
    label="Author"
    :fetch-options="fetchOptions"
    :label-key="'name'"
    :value-key="'id'"
    :enable-create="true"
    @create="lastCreate++"
  />
  <ValueProbe :value="value" />
  <pre data-testid="last-create">{{ lastCreate }}</pre>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Autocomplete } from '@ghentcdh/ui';

import ValueProbe from '../shared/ValueProbe.vue';
import { baseProps } from '../shared/baseProps';

const value = ref<unknown>(null);
const lastCreate = ref(0);

/* The spec stubs /api/authors via page.route — this fetcher simply forwards
 * the query string and returns whatever the test set up. */
const fetchOptions = async (q: string) => {
  const resp = await fetch(`/api/authors?q=${encodeURIComponent(q)}`);
  if (!resp.ok) return [];
  return resp.json();
};
</script>
