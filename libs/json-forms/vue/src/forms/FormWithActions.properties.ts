import type { ExtractPublicPropTypes, PropType } from 'vue';

import type { ErrorMode } from './errorMode';

export const FormWithActionsProperties = {
  /** Unique identifier used to namespace the inner form element. */
  id: { type: String, required: true as const },
  /** Title shown when creating a new record. */
  createTitle: { type: String, required: true as const },
  /** Title shown when editing an existing record. Falls back to `createTitle` when omitted. */
  updateTitle: { type: String },
  /** JSON schema describing the shape of the form data. */
  schema: { type: Object as PropType<any> },
  /** UI schema describing the layout and controls. */
  uiSchema: { type: Object as PropType<any> },
  /** REST endpoint used by `FormStore` to persist data. When omitted the form emits `submit` instead. */
  uri: { type: String },
  /** Enable vertical scrolling inside the form area. */
  scrollable: { type: Boolean, default: false },
  /** Stretch the collapse wrapper to full height. */
  fullHeight: { type: Boolean, default: false },
  /** Two-way bound form data object. */
  modelValue: { type: Object as PropType<any>, default: () => ({}) },
  /** When validation errors are shown (`'onBlur'`, `'onChange'`, `'onSubmit'`, `'always'`). */
  errorMode: {
    type: String as PropType<ErrorMode>,
    default: 'onBlur' as const,
  },
};

export type FormWithActionsProp = ExtractPublicPropTypes<
  typeof FormWithActionsProperties
>;

export const FormWithActionsEmits = [
  /** Emitted when `modelValue` changes. */
  'update:modelValue',
  /** Emitted after a successful `FormStore.save()`. */
  'success',
  /** Emitted on submit when no `uri` is provided. */
  'submit',
  /** Emitted whenever form validity changes. */
  'valid',
  /** Emitted when a custom renderer dispatches a form event. */
  'events',
  /** Emitted when validation errors change. */
  'errors',
  /** Emitted when the user cancels editing an existing record. */
  'cancel',
];
