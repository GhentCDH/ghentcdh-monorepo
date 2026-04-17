import type { SizeType } from '@ghentcdh/json-forms-core';

import type { FormEventPayload } from '../composables/useFormEvents';

/** Props for the `FormModal` component. */
export type FormModalProps = {
  /** Title displayed in the modal header. */
  modalTitle: string;
  /** Label for the save button. */
  saveLabel?: string;
  /** Label for the cancel button. */
  cancelLabel?: string;
  /** JSON schema describing the shape of the form data. */
  schema: any;
  /** UI schema describing the layout and controls. */
  uiSchema: any;
  /** Modal width (`'xs'`, `'sm'`, `'lg'`, `'xl'`). */
  modalSize?: SizeType;
  /** Callback invoked when the modal closes (with result or `null` on cancel). */
  onClose: (result: any) => void;
  /** Callback for form events dispatched by custom renderers (e.g. "create"). */
  onEvents?: (payload: FormEventPayload) => void;
  /** Initial form data to populate the form with. */
  data: any;
};

/** Result payload returned when the modal is submitted. */
export type FormModalResult<DATA = any> = {
  /** The form data at the time of submission. */
  data: DATA;
  /** Whether the form passed validation. */
  valid: boolean;
};