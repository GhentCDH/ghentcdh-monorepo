import type { Editor } from '@tiptap/vue-3';
import type { ExtractPropTypes } from 'vue';

import type { ControlWrapperProperties } from './ControlWrapper.properties';

export type ControlProperties = ExtractPropTypes<
  typeof ControlWrapperProperties
>;

export type ToolbarAction = {
  /** Displayed inside the button (text or HTML, e.g. an icon) */
  label: string;
  /** The Tiptap mark/node name used for isActive() highlighting */
  name: string;
  /** Called with the editor instance when the button is clicked */
  action: (editor: Editor | undefined) => void;
};
