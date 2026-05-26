<template>
  <h1 class="text-2xl mb-4">
    @ghentcdh/ui · e2e playground
  </h1>
  <ul class="list-disc pl-6">
    <li
      v-for="r in pages"
      :key="r.path"
    >
      <RouterLink :to="r.path">
        {{ r.label }}
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const pages = [
  { path: '/input', label: 'Input' },
  { path: '/number', label: 'InputNumber' },
  { path: '/textarea', label: 'Textarea' },
  { path: '/checkbox', label: 'Checkbox' },
  { path: '/select', label: 'Select' },
  { path: '/multi-select', label: 'MultiSelect' },
  { path: '/autocomplete', label: 'AutoComplete' },
  { path: '/markdown', label: 'Markdown' },
  { path: '/modal', label: 'Modal' },
];
</script>
