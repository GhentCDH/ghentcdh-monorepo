<template>
  <div>
    <div
      v-if="filterUiSchema && filterSchema"
      class="mb-2"
    >
      <TableFilter
        :layout="{ uiSchema: filterUiSchema, schema: filterSchema }"
        :filters="filter"
        @change-filters="onChangeFilters"
      />
    </div>
    <div>
      <Table
        v-bind="properties"
        :display-columns="displayColumns"
        @sort="(id: string) => emits('sort', id)"
        @update-page="(page: number) => emits('updatePage', page)"
        @update-page-size="(size: number) => emits('updatePageSize', size)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { ColumnDef, TextCellType } from '@ghentcdh/json-forms-core';
import { findColumnDef } from '@ghentcdh/json-forms-core';
import { Table } from '@ghentcdh/ui';

import { defaultCellRenderers, findCellRenderer } from './cells';
import TableFilter from './filter/table-filter.vue';
import { TableComponentEmits, TableComponentProperties } from './table.component.properties';

const properties = defineProps(TableComponentProperties);
const emits = defineEmits(TableComponentEmits);

const allRenderers = computed(() => [
  ...(properties.cellRenderers ?? []),
  ...defaultCellRenderers,
]);

const displayColumns = computed(() => {
  return properties.uiSchema.elements.map((e) => {
    const element = e as TextCellType;
    const def = findColumnDef(element, properties.schema);
    const type = Array.isArray(def.type) ? def.type[0] : def.type;
    const component = findCellRenderer(allRenderers.value, element);

    if (!component)
      console.warn(
        'No cell renderer found for',
        element.type,
        element.options?.format,
      );

    return {
      ...def,
      label: e.options?.label ?? def.id,
      type,
      component,
    } as ColumnDef & { component: any };
  });
});

const onChangeFilters = (filters: any) => {
  emits('updateFilters', filters);
};
</script>
