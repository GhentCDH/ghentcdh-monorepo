import type { Editor } from '@tiptap/vue-3';
import { v4 as uuidv4 } from 'uuid';

import type { MyStyles } from './styles';
import { myStyles } from './styles';

export type ControlProperties = {
  id?: string;
  placeholder?: string;
  description?: string;
  errors?: string;
  label?: string;
  visible?: boolean;
  required?: boolean;
  enabled?: boolean;
  isFocused?: boolean;
  isTouched?: boolean;
  hideLabel?: boolean;
  styles?: MyStyles;
};

export const DefaultControlProperties = () => {
  return {
    id: uuidv4(),
    visible: true,
    required: false,
    enabled: true,
    isFocused: false,
    isTouched: false,
    hideLabel: false,
    styles: myStyles,
  } as ControlProperties;
};

export type SelectControlProperties = ControlProperties & {
  options: any[];
  valueKey?: string;
  labelKey?: string;
};

export interface ToolbarAction {
  /** Displayed inside the button (text or HTML, e.g. an icon) */
  label: string;
  /** The Tiptap mark/node name used for isActive() highlighting */
  name: string;
  /** Called with the editor instance when the button is clicked */
  action: (editor: Editor | undefined) => void;
}

export type MarkdownProperties = ControlProperties & {
  actions?: ToolbarAction[];
};

export type AutoCompleteConfig = {
  uri: string;
  skipAuth?: boolean;
  dataField: string;
};

export type AutoCompleteProperties = ControlProperties & {
  config?: AutoCompleteConfig;
  options?: Array<any>;
  valueKey?: string;
  labelKey?: string;
};
export type InputProperties = ControlProperties & {
  type: 'text';
};
export type TextareaProperties = ControlProperties & { rows: number };
export type InputNumberProperties = ControlProperties & { steps: number };

export const DefaultAutoCompleteProperties = () => {
  return {
    ...DefaultControlProperties(),
    options: [] as Array<any>,
    valueKey: 'value',
    labelKey: 'label',
  } as AutoCompleteProperties;
};
