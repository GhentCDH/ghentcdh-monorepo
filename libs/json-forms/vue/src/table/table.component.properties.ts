import type { JsonSchema, Layout } from '@jsonforms/core';
import type { PropType } from 'vue';

import type { Filter } from '@ghentcdh/json-forms-core';
import type { TableAction, TablePage, TableSort } from '@ghentcdh/ui';

import type { CellRendererEntry } from './cells';

export const TableComponentProperties = {
  id: { type: String, required: true as const },
  uiSchema: { type: Object as PropType<Layout>, required: true as const },
  schema: { type: Object as PropType<JsonSchema>, required: true as const },
  filterUiSchema: { type: Object as PropType<Layout> },
  filterSchema: { type: Object as PropType<JsonSchema> },
  reload: { type: Number },
  loading: { type: Boolean, default: false as const },
  actions: { type: Array as PropType<TableAction[]> },
  data: { type: Array as PropType<any[]> },
  page: { type: Object as PropType<TablePage> },
  sort: { type: Object as PropType<TableSort> },
  filter: { type: Array as PropType<Filter[]>, default: () => [] },
  cellRenderers: { type: Array as PropType<CellRendererEntry[]> },
};

export const TableComponentEmits = ['updatePage', 'updatePageSize', 'sort', 'updateFilters'];
