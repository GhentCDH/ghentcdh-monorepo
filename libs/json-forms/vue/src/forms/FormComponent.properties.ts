import type { PropType } from 'vue';

import type { Data, SubmitFormEvent } from '../form.component.properties';

export type { Data, SubmitFormEvent };

export const VeeFormComponentProperties = {
  id: { type: String, required: true as const },
  name: { type: String, default: 'form' },
  schema: { type: Object as PropType<any>, required: true as const },
  uiSchema: { type: Object as PropType<any>, required: true as const },
  disabled: { type: Boolean, default: false },
  formData: { type: Object as PropType<Data>, default: () => ({}) },
};

export const VeeFormComponentEmits = [
  'valid',
  'change',
  'submit',
  'errors',
  'events',
];
