import { ControlWrapperProperties } from './core/ControlWrapper.properties';

export const TextareaProperties = {
  ...ControlWrapperProperties,
  rows: { type: Number, default: 4 },
};

export const TextareaEmits = ['change', 'focus', 'blur'];
