<template>
  <button
    class="flex items-center"
    @click="onSort"
  >
    <span class="flex-grow pr-2"> {{ column.label }}</span>
    <div class="h-4 w-4">
      <Icon
        v-if="sortColumn === sortId"
        :icon="sortIcon"
      />
    </div>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { SortHeaderEmits, SortHeaderProperties } from './sort.header.properties';
import type { IconDef } from '../../icons';
import { Icon, IconEnum } from '../../icons';

const props = defineProps(SortHeaderProperties);
const emits = defineEmits(SortHeaderEmits);

const sortIcon = computed<IconDef>(() =>
  props.sortDirection === 'asc' ? IconEnum.BarsArrowUp : IconEnum.BarsArrowDown,
);

const sortId = computed(() => props.column.options?.sortId ?? props.column.id);

const onSort = () => {
  emits('sort', sortId.value);
};
</script>
