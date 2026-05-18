import type { ExtractPublicPropTypes, PropType } from 'vue';

import type { JsonFormsLayout } from '@ghentcdh/json-forms-core';
import type { TableAction } from '@ghentcdh/ui';

import type { ErrorMode } from './errorMode';

/** Generic record shape used by table rows. */
export type Data = { [key: string]: any };

export const FormWithTableProperties = {
  /** Unique identifier used to namespace the inner table element. */
  id: { type: String, required: true as const },
  /** Heading displayed above the table. */
  tableTitle: { type: String, required: true as const },
  /** Title shown in the modal when creating a new record. */
  createTitle: { type: String, required: true as const },
  /** Title shown in the modal when editing a record. Falls back to `createTitle` when omitted. */
  updateTitle: { type: String },
  /** Override URI used to fetch table data. Defaults to `uri` when omitted. */
  dataUri: { type: String },
  /** Custom row actions rendered in the table. */
  tableActions: { type: Array as PropType<TableAction[]> },
  /** JSON Forms layout for the create/edit modal form. */
  form: { type: Object as PropType<JsonFormsLayout> },
  /** JSON Forms layout for the table. */
  table: { type: Object as PropType<JsonFormsLayout> },
  /** JSON Forms layout for the table filter. */
  filter: { type: Object as PropType<JsonFormsLayout> },
  /** REST endpoint used by `FormStore` for CRUD operations. */
  uri: { type: String },
  /** Default data pre-filled when creating a new record. */
  initialData: { type: Object as PropType<Data>, default: () => ({}) },
  /** When validation errors are shown in the modal form. */
  errorMode: {
    type: String as PropType<ErrorMode>,
    default: 'onBlur' as const,
  },
};

export type FormWithTableProp = ExtractPublicPropTypes<
  typeof FormWithTableProperties
>;

export const FormWithTableEmits = [
  /** Emitted when a row is selected for editing (listener-based routing). */
  'editData',
  /** Emitted after a record is saved through the modal. */
  'save',
  /** Emitted after a record is deleted. */
  'delete',
  /** Emitted when a custom renderer dispatches a form event. */
  'events',
  /** Emitted when a custom edit handler is registered. */
  'custom:edit',
  /** Emitted when a custom create handler is registered. */
  'custom:create',
];
