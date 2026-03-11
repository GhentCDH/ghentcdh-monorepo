import type { Editor } from '@tiptap/vue-3';
import type { PropType } from 'vue';

import { ControlWrapperProperties } from '../core/ControlWrapper.properties';

export interface ToolbarAction {
  /** Displayed inside the button (text or HTML, e.g. an icon) */
  label: string;
  /** The Tiptap mark/node name used for isActive() highlighting */
  name: string;
  /** Called with the editor instance when the button is clicked */
  action: (editor: Editor | undefined) => void;
}
export const MarkdownComponentProperties = {
  ...ControlWrapperProperties,
  width: { type: String, default: 'w-48' },
  actions: {
    type: Object as PropType<ToolbarAction[]>,
    default: () => [
      {
        label: '<strong>B</strong>',
        name: 'bold',
        action: (editor) => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: '<em>I</em>',
        name: 'italic',
        action: (editor) => editor?.chain().focus().toggleItalic().run(),
      },
    ],
  },
};
