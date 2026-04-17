import type { JsonFormsLayout } from '@ghentcdh/json-forms-core';
import { ModalService } from '@ghentcdh/ui';

import { FormModal, type FormModalProps, type FormModalResult } from './index';

import type { FormEventPayload } from '../composables/useFormEvents';

export class FormModalService {
  static openModal<DATA = any>({
    initialData,
    modalTitle,
    formSchema,
    onClose,
    onEvents,
  }: {
    initialData?: DATA;
    formSchema: JsonFormsLayout;
    modalTitle: string;
    onClose: (result: FormModalResult) => void;
    /** Callback for form events dispatched by custom renderers inside the modal. */
    onEvents?: (payload: FormEventPayload) => void;
  }) {
    ModalService.openModal<FormModalProps, FormModalResult>({
      component: FormModal,
      props: {
        schema: formSchema.schema,
        uiSchema: formSchema.uiSchema,
        modalSize: formSchema.modalSize,
        data: initialData ?? {},
        modalTitle,
        onClose,
        onEvents,
      },
    });
  }
}
