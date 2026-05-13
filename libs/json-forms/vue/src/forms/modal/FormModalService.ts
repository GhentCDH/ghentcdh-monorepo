import type { SizeType } from '@ghentcdh/json-forms-core';
import { ModalService } from '@ghentcdh/ui';

import type { FormEventPayload } from '../../composables/useFormEvents';
import type { FormModalProps, FormModalResult } from '../../modal/form-modal.props';
import FormModal from './FormModal.vue';

export class VeeFormModalService {
  static openModal<DATA = any>({
    initialData,
    modalTitle,
    schema,
    uiSchema,
    modalSize,
    onClose,
    onEvents,
  }: {
    initialData?: DATA;
    schema: any;
    uiSchema: any;
    modalSize?: SizeType;
    modalTitle: string;
    onClose: (result: FormModalResult) => void;
    onEvents?: (payload: FormEventPayload) => void;
  }) {
    ModalService.openModal<FormModalProps, FormModalResult>({
      component: FormModal,
      props: {
        schema,
        uiSchema,
        modalSize,
        data: initialData ?? {},
        modalTitle,
        onClose,
        onEvents,
      },
    });
  }
}
