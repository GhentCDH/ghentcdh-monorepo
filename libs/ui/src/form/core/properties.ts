import type { Editor } from '@tiptap/vue-3';

import type { MyStyles } from './styles';

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
  width: string;
};

export type ToolbarAction = {
  /** Displayed inside the button (text or HTML, e.g. an icon) */
  label: string;
  /** The Tiptap mark/node name used for isActive() highlighting */
  name: string;
  /** Called with the editor instance when the button is clicked */
  action: (editor: Editor | undefined) => void;
};
