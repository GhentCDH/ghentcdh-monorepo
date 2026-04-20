import type { PropType } from 'vue';

import type { JsonSchema } from '@jsonforms/core';
import type { Layout } from '@jsonforms/core/src/models/uischema';
import type { TableAction } from '@ghentcdh/ui';

export const TableComponentProperties = {
  id: { type: String, required: true as const },
  uiSchema: { type: Object as PropType<Layout>, required: true as const },
  schema: { type: Object as PropType<JsonSchema>, required: true as const },
  filterUiSchema: { type: Object as PropType<Layout> },
  filterSchema: { type: Object as PropType<JsonSchema> },
  uri: { type: String, required: true as const },
  reload: { type: Number },
  actions: { type: Array as PropType<TableAction[]> },
};

export const TableComponentEmits = ['delete', 'edit'];