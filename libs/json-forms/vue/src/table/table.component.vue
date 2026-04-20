<template>
  <div>
    <div
      v-if="filterUiSchema && filterSchema"
      class="mb-2"
    >
      <TableFilter
        :layout="{ uiSchema: filterUiSchema, schema: filterSchema }"
        :filters="store.filters.value"
        @change-filters="onChangeFilters"
      />
    </div>
    <div>
      <Table
        :display-columns="displayColumns"
        :sort="sort"
        :page="store.pageData.value"
        :loading="store.loading.value"
        :data="store.tableData.value"
        :actions="actions"
        @update-page="onUpdatePage"
        @delete="deleteFn"
        @edit="edit"
        @sort="onSort"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isArray } from 'lodash-es';
import { computed, watch } from 'vue';

import type { ColumnDef, TextCellType } from '@ghentcdh/json-forms-core';
import { findColumnDef } from '@ghentcdh/json-forms-core';
import { Table, TextCell } from '@ghentcdh/ui';

import TableFilter from './filter/table-filter.vue';
import {
  TableComponentEmits,
  TableComponentProperties,
} from './table.component.properties';
import { useTableStore } from './table.store';

const properties = defineProps(TableComponentProperties);
const emit = defineEmits(TableComponentEmits);

// TODO add reload functionality!

watch(
  () => properties.reload,
  () => {
    store.reload();
  },
);

let store = useTableStore(properties.id);

watch(
  () => properties.uri,
  () => {
    store.init(properties.uri);
  },
  { immediate: true },
);

const edit = (data: unknown) => {
  emit('edit', data);
};

const deleteFn = (data: unknown) => {
  emit('delete', data);
};

const components = {
  TextCell,
};

const displayColumns = computed(() => {
  return properties.uiSchema.elements.map((e) => {
    const element = e as TextCellType;
    const def = findColumnDef(element, properties.schema);
    const type = isArray(def.type) ? def.type[0] : def.type;
    let component: any;
    if (element.options?.format && element.options.format in components) {
      component = components[element.options.format];
    } else {
      component = components[element.type];
    }

    if (!component) console.warn('No component found for type', element.type);

    return {
      ...def,
      type,
      component,
    } as ColumnDef & { component: any };
  });
});

const onChangeFilters = (filters: any) => {
  store.updateFilters(filters);
};

const onUpdatePage = (page: number) => {
  store.updatePage(page);
};

const onSort = (id: string) => {
  store.sort(id);
};

const sort = computed(() => {
  return store.sorting.value ?? { orderBy: '', ascending: 1 };
});
</script>