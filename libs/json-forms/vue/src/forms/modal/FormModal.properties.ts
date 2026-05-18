import type { ExtractPublicPropTypes, PropType } from 'vue';

import type { SizeType } from '@ghentcdh/json-forms-core';

import type { ErrorMode } from '../errorMode';
import type { FormEventPayload } from '../../composables/useFormEvents';

export const FormModalProperties = {
  /** Title displayed in the modal header. */
  modalTitle: { type: String, required: true as const },
  /** Label for the save button. */
  saveLabel: { type: String, default: 'save' },
  /** Label for the cancel button. */
  cancelLabel: { type: String, default: 'cancel' },
  /** JSON schema describing the shape of the form data. */
  schema: { type: Object as PropType<any>, required: true as const },
  /** UI schema describing the layout and controls. */
  uiSchema: { type: Object as PropType<any>, required: true as const },
  /** Modal width (`'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`). */
  modalSize: { type: String as PropType<SizeType>, default: 'md' },
  /** Callback invoked when the modal closes (with result or `null` on cancel). */
  onClose: {
    type: Function as PropType<(result: any) => void>,
    required: true as const,
  },
  /** Callback for form events dispatched by custom renderers. */
  onEvents: {
    type: Function as PropType<(payload: FormEventPayload) => void>,
  },
  /** Initial form data to populate the form with. */
  data: { type: Object as PropType<any>, required: true as const },
  /** When validation errors are shown. */
  errorMode: {
    type: String as PropType<ErrorMode>,
    default: 'onBlur' as const,
  },
};

export type FormModalProp = ExtractPublicPropTypes<
  typeof FormModalProperties
>;

export const FormModalEmits = [
  /** Emitted when the modal is closed (submit or cancel). */
  'closeModal',
  /** Emitted when a custom renderer dispatches a form event. */
  'events',
];

/** Result payload returned when the modal is submitted. */
export type FormModalResult<DATA = any> = {
  /** The form data at the time of submission. */
  data: DATA;
  /** Whether the form passed validation. */
  valid: boolean;
};
