import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import type { PropType } from 'vue';


/** Generic record type used for form data payloads. */
export type Data = {
  [key: string]: any;
};

/** Payload emitted by the `submit` event of `FormComponent`. */
export type SubmitFormEvent = {
  /** Current form data at the time of submission. */
  data: Data;
  /** Whether the form passed validation. */
  valid: boolean;
};

export const FormComponentProperties = {
  /** Unique id applied to the `<form>` element and used as `<json-forms>` key. */
  id: { type: String, required: true },
  /** JSON schema describing the shape of the form data. */
  schema: { type: Object as PropType<any>, required: true },
  /** UI schema describing the layout and controls. */
  uischema: { type: Object as PropType<any>, required: true },
  /** Extra renderer entries merged in front of the built-in tailwind renderers. */
  renderers: {
    type: Array as PropType<JsonFormsRendererRegistryEntry[]>,
    default: undefined,
  },
  /** Disables all controls inside the form. */
  disabled: { type: Boolean, default: false },
};

export const FormComponentEmits = [
  /** v-model binding. */
  'update:modelValue',
  /** Emitted whenever validity changes (`true` = no errors). */
  'valid',
  /** Emitted on every change with the latest form data. */
  'change',
  /** Emitted when the native form submit fires. Payload: `SubmitFormEvent`. */
  'submit',
  /** Emitted with the raw Ajv validation errors array. */
  'errors',
  /** Generic event channel for custom renderer dispatches (`FormEventPayload`). */
  'events',
];