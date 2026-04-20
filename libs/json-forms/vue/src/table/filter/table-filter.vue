<template>
  <div class="">
    <div class="flex gap-2 items-center mb-2">
      <template v-if="filters.length">
        <Btn
          size="xs"
          :outline="true"
          @click="onResetFilters"
        >
          Reset all filters
        </Btn>
      </template>
    </div>
    <div class="flex gap-2">
      <BtnBadge
        v-for="filter in filters"
        :key="filter.key"
        :icon="IconEnum.Close"
        @click="removeFilter(filter)"
      >
        {{ filter.label }}: {{ filter.value }}
      </BtnBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import type { Filter, JsonFormsLayout } from '@ghentcdh/json-forms-core';
import { Btn, BtnBadge, IconEnum } from '@ghentcdh/ui';

const formData = ref();

const properties = defineProps<{
  layout: JsonFormsLayout;
  filters: Filter[];
}>();

const emits = defineEmits<{
  changeFilters: [data: any];
  removeFilter: [filter: Filter];
}>();

watch(
  () => properties.filters,
  () => {
    formData.value = {};
    properties.filters.forEach((filter) => {
      // TODO on multiple values
      formData.value[filter.key] = filter.value;
    });
  },
  { immediate: true },
);

const onResetFilters = () => {
  emits('changeFilters', {});
};

const removeFilter = (filter: Filter) => {
  // TODO on multiple values
  formData.value[filter.key] = undefined;

  emits('changeFilters', formData.value);
};
</script>
