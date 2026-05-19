import type { ExtractPublicPropTypes, PropType } from 'vue';

import type { ErrorMode } from './errorMode';

export type Data = {
  [key: string]: any;
};

export type SubmitFormEvent = {
  data: Data;
  valid: boolean;
};

export const JsonFormComponentProperties = {
  /** Unique identifier used to namespace the form element. */
  id: { type: String, required: true as const },
  /** HTML name attribute for the form. */
  name: { type: String, default: 'form' },
  /** JSON schema describing the shape of the form data. */
  schema: { type: Object as PropType<any>, required: true as const },
  /** UI schema describing the layout and controls. */
  uiSchema: { type: Object as PropType<any>, required: true as const },
  /** Disable all form controls. */
  disabled: { type: Boolean, default: false },
  /** Current form data object. */
  formData: { type: Object as PropType<Data>, default: () => ({}) },
  /** When validation errors are shown (`'onBlur'`, `'onChange'`, `'onSubmit'`, `'always'`). */
  errorMode: {
    type: String as PropType<ErrorMode>,
    default: 'onChanges' as const,
  },
};

export type JsonFormComponentProp = ExtractPublicPropTypes<
  typeof JsonFormComponentProperties
>;

export const JsonFormComponentEmits = [
  /** Emitted when form data changes. */
  'change',
  /** Emitted on form submission. */
  'submit',
  /** Emitted when validation errors change. */
  'errors',
  /** Emitted when form validity changes. */
  'valid',
  /** Emitted when a custom renderer dispatches a form event. */
  'events',
];
