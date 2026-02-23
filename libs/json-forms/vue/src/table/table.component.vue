<script setup lang="ts">
import { isArray } from 'lodash-es';
import { computed, watch } from 'vue';

import type {
  ColumnDef,
  JsonFormsLayout,
  TextCellType,
} from '@ghentcdh/json-forms-core';
import { findColumnDef } from '@ghentcdh/json-forms-core';
import type { TableAction } from '@ghentcdh/ui';
import { Table, TextCell } from '@ghentcdh/ui';

import TableFilter from './filter/table-filter.vue';
import { useTableStore } from './table.store';

const properties = defineProps<{
  id: string;
  layout: JsonFormsLayout;
  filterLayout?: JsonFormsLayout;
  uri: string;
  reload?: number;
  actions?: TableAction[];
}>();

// TODO add reload functionality!

const emit = defineEmits(['delete', 'edit']);

watch(
  () => properties.reload,
  () => {
    store.reload();
  },
);

let store = useTableStore(properties.id);

watch(
  () => properties.uri,
  (formSchema) => {
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
  const { schema, uiSchema } = properties.layout;
  return uiSchema.elements.map((e) => {
    const element = e as TextCellType;
    const def = findColumnDef(element, schema);
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

<template>
  <div>
    <div
      v-if="filterLayout"
      class="mb-2"
    >
      <TableFilter
        v-if="filterLayout"
        :layout="filterLayout"
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
