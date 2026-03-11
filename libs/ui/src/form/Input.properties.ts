import { ControlWrapperProperties } from './core/ControlWrapper.properties';

export const InputProperties = {
  ...ControlWrapperProperties,
  type: { type: String, default: 'text' },
};

export const InputEmits = ['change', 'focus', 'blur'];
