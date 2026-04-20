import type { PropType } from 'vue';

export const FormWithActionsProperties = {
  /** Unique identifier; the inner form receives `form_${id}` as its id. */
  id: { type: String, required: true },
  /** Title shown when creating a new record (`formData.id` is falsy). */
  createTitle: { type: String, required: true },
  /** Title shown when editing an existing record. Falls back to `createTitle`. */
  updateTitle: { type: String },
  /** JSON schema describing the shape of the form data. */
  schema: { type: Object as PropType<any> },
  /** UI schema describing the layout and controls. */
  uiSchema: { type: Object as PropType<any> },
  /** When provided, the component submits the form to this URI via `FormStore`. */
  uri: { type: String },
};

export const FormWithActionsEmits = [
  /** v-model binding. */
  'update:modelValue',
  /** Emitted after a successful backend save (only when `uri` is defined). */
  'success',
  /** Emitted with form data when saving without a `uri`. */
  'submit',
  /** Emitted whenever the form validity changes. */
  'valid',
  /** Forwards custom renderer events (`FormEventPayload`). */
  'events',
];
