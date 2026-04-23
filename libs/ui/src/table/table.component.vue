<template>
  <table class="table w-full">
    <thead>
      <tr>
        <th v-for="column in displayColumns" :key="column.scope">
          <SortHeader :column="column" v-bind="sort" @sort="onSort" />
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading">
        <td :colspan="displayColumns.length + 1" class="text-center">
          <span class="loading loading-bars loading-xs" />
        </td>
      </tr>
      <tr v-for="item in data" :key="item.id" :ui-id="`table_${item.id}`">
        <td v-for="column in displayColumns" :key="column.scope">
          <component
            :is="column.component"
            v-bind="column"
            :data="item"
            :column="column"
          />
        </td>
        <td>
          <span class="flex gap-2">
            <Btn
              v-for="action of actions"
              :area-label="action.label"
              :key="action.label"
              :icon="action.icon"
              :outline="true"
              @click="action.action(item)"
            >
              {{ action.label }}
            </Btn>
            <Btn
              v-if="hasEdit"
              area-label="Edit"
              :icon="IconEnum.Edit"
              :outline="true"
              @click="edit(item)"
            />
            <Btn
              v-if="hasDelete"
              area-label="Delete"
              :icon="IconEnum.Delete"
              :outline="true"
              @click="deleteFn(item)"
            />
          </span>
        </td>
      </tr>
    </tbody>
  </table>
  <template v-if="page">
    <PaginationComponent
      class="border-gray-300 border-t pt-4 border-x-0 border-b-0"
      :total-items="page.count"
      :items-per-page="page.pageSize"
      :current-page="page.page"
      @update-page="onUpdatePage"
    />
  </template>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import TextCell from './cells/text.cell.vue';
import SortHeader from './header/sort.header.vue';
import PaginationComponent from './pagination.component.vue';
import {
  TableComponentEmits,
  TableComponentProperties,
} from './table.component.properties';
import Btn from '../button/btn.vue';
import { IconEnum } from '../icons';

const properties = defineProps(TableComponentProperties);

// TODO add reload functionality!

const emits = defineEmits(TableComponentEmits);
const attrs = useAttrs();

const hasEdit = computed(() => 'onEdit' in attrs);
const hasDelete = computed(() => 'onDelete' in attrs);

const edit = (data: unknown) => {
  (attrs.onEdit as Function)?.(data);
};

const deleteFn = (data: unknown) => {
  (attrs.onDelete as Function)?.(data);
};

const onUpdatePage = (page: number) => {
  emits('updatePage', page);
};

const onSort = (id: string) => {
  emits('sort', id);
};

const components = {
  TextCell,
};
</script>
