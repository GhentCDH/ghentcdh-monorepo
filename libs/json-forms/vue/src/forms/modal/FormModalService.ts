import type { SizeType } from '@ghentcdh/json-forms-core';
import { ModalService } from '@ghentcdh/ui';

import FormModal from './FormModal.vue';
import type { FormModalProp, FormModalResult } from './FormModal.properties';
import type { FormEventPayload } from '../../composables/useFormEvents';

export class JsonFormModalService {
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
    ModalService.openModal<FormModalProp, FormModalResult>({
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
