import type { PropType } from 'vue';

import type { Size } from '../const';

export const ModalProperties = {
  modalTitle: { type: String, required: true },
  buttonLabel: { type: String },
  buttonSaveLabel: { type: String },
  data: { default: undefined },
  open: { type: Boolean, default: false },
  disableClose: { type: Boolean, default: false },
  width: { type: String as PropType<Size>, default: 'sm' },
  name: { type: String, required: true },
};

export const ModalEmits = ['closeModal'];