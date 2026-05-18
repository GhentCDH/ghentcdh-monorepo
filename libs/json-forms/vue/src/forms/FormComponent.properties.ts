import type { PropType } from 'vue';

import type { ErrorMode } from './errorMode';

export type Data = {
  [key: string]: any;
};

export type SubmitFormEvent = {
  data: Data;
  valid: boolean;
};

export const VeeFormComponentProperties = {
  id: { type: String, required: true as const },
  name: { type: String, default: 'form' },
  schema: { type: Object as PropType<any>, required: true as const },
  uiSchema: { type: Object as PropType<any>, required: true as const },
  disabled: { type: Boolean, default: false },
  formData: { type: Object as PropType<Data>, default: () => ({}) },
  errorMode: {
    type: String as PropType<ErrorMode>,
    // FIXME change to onBlur
    default: 'onChanges' as const,
  },
};

export const VeeFormComponentEmits = [
  'valid',
  'change',
  'submit',
  'errors',
  'events',
];
