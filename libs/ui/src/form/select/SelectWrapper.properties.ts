import type { PropType } from 'vue';

import { ListProperties } from './ListResults.properties';
import { ControlWrapperProperties } from '../core/ControlWrapper.properties';

export const SelectProperties = {
  ...ControlWrapperProperties,
  options: { type: Array as PropType<Array<any>>, required: true },
  /** Key to use as the display label when options are objects */
  labelKey: { type: String, default: 'label' },
  /** Key to use as the stored
   value when options are objects */
  valueKey: { type: String, default: 'value' },
  width: { type: String, default: 'w-48' },
};

export const SelectWrapperProperties = {
  ...ListProperties,
  ...SelectProperties,
  isOpen: { type: Boolean, default: false },
  isActive: { type: Function, default: (item: any) => false },
};
