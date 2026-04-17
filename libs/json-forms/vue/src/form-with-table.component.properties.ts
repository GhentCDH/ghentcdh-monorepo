import type { PropType } from 'vue';

import type { FormSchemaModel, JsonFormsLayout } from '@ghentcdh/json-forms-core';
import type { TableAction } from '@ghentcdh/ui';

/** Generic record type used for form/table data payloads. */
export type Data = {
  [key: string]: any;
};

export const FormWithTableProperties = {
  /** Unique identifier used to generate the table form id (`form_table_${id}`). */
  id: { type: String, required: true },
  /** Heading displayed above the table. */
  tableTitle: { type: String, required: true },
  /** Title shown in the create modal. */
  createTitle: { type: String, required: true },
  /** Title shown in the edit modal. Falls back to `createTitle`. */
  updateTitle: { type: String },
  /** Overrides `uri` as the data source for the table. */
  dataUri: { type: String },
  /** Custom action buttons rendered in each table row. */
  tableActions: { type: Array as PropType<TableAction[]> },
  /** Layout for the create/edit modal form. */
  form: { type: Object as PropType<JsonFormsLayout> },
  /** Layout for the table columns. */
  table: { type: Object as PropType<JsonFormsLayout> },
  /** Layout for the table filter controls. */
  filter: { type: Object as PropType<JsonFormsLayout> },
  /** Base URI used by `FormStore` for CRUD operations and as the default table data source. */
  uri: { type: String },
  /** @deprecated Use `form`, `table`, `filter` and `uri` props instead. */
  formSchema: { type: Object as PropType<FormSchemaModel> },
  /** Default data used when opening the create modal. */
  initialData: { type: Object as PropType<Data>, default: () => ({}) },
};

export const FormWithTableEmits = [
  /** Emitted when a table row is edited and a custom listener is bound. */
  'editData',
  /** Emitted after a record is successfully saved (created or updated). Payload: `{ id?: string, data: Data }`. */
  'save',
  /** Emitted after a record is successfully deleted. Payload: the deleted record. */
  'delete',
  /** Forwarded form events dispatched by custom renderers inside the modal (e.g. "create"). Payload: `FormEventPayload`. */
  'events',
];
