import { type MyStyles, myStyles } from '../core/styles';
import { PropType } from 'vue';

export const ControlWrapperProperties = {
  id: { type: String },
  placeholder: { type: String },
  description: { type: String },
  errors: { type: String },
  label: { type: String },
  visible: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
  isFocused: { type: Boolean, default: false },
  isTouched: { type: Boolean, default: false },
  hideLabel: { type: Boolean, default: false },
  styles: {
    type: Object as PropType<MyStyles>,
    default: () => myStyles,
  },
  width: { type: String, default: 'w-24' },
};
