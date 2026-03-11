import { isBooleanControl, isIntegerControl, isNumberControl, rankWith } from '@jsonforms/core';

import BooleanControlRenderer from './BooleanControlRenderer.vue';
import IntegerControlRenderer from './IntegerControlRenderer.vue';
import MarkdownControlRenderer from './MarkdownControlRenderer.vue';
import NumberControlRenderer from './NumberControlRenderer.vue';
import StringControlRenderer from './StringControlRenderer.vue';
import TextAreaControlRenderer from './TextAreaControlRenderer.vue';
import MultiSelectControlRender from './MultiSelectControlRender.vue';
import SelectControlRender from './SelectControlRender.vue';
import {
  isAutoCompleteControl,
  isMarkdownControl,
  isMultiselectControl,
  isSelectControl,
  isStringFormat,
  isTextAreaControl
} from '../tester';
import AutocompleteControlRenderer from './AutocompleteControlRenderer.vue';

export { default as AutocompleteControlRenderer } from './AutocompleteControlRenderer.vue';

export { default as StringControlRenderer } from './StringControlRenderer.vue';
export { default as NumberControlRenderer } from './NumberControlRenderer.vue';
export { default as IntegerControlRenderer } from './IntegerControlRenderer.vue';
export { default as BooleanControlRenderer } from './BooleanControlRenderer.vue';
export { default as markdownControlRenderer } from './MarkdownControlRenderer.vue';
export { default as SelectControlRender } from './SelectControlRender.vue';
export { default as MultiSelectControlRender } from './MultiSelectControlRender.vue';

export const controlRenderers = [
  // First custom renderers on format
  {
    tester: rankWith(10, isMarkdownControl),
    renderer: MarkdownControlRenderer,
  },
  {
    tester: rankWith(10, isAutoCompleteControl),
    renderer: AutocompleteControlRenderer,
  },
  {
    tester: rankWith(10, isTextAreaControl),
    renderer: TextAreaControlRenderer,
  },

  // Renderers based on type if no format is provided
  { tester: rankWith(10, isStringFormat), renderer: StringControlRenderer },
  { tester: rankWith(10, isSelectControl), renderer: SelectControlRender },
  {
    tester: rankWith(10, isMultiselectControl),
    renderer: MultiSelectControlRender,
  },
  { tester: rankWith(10, isNumberControl), renderer: NumberControlRenderer },
  {
    tester: rankWith(10, isIntegerControl),
    renderer: IntegerControlRenderer,
  },

  { tester: rankWith(10, isBooleanControl), renderer: BooleanControlRenderer },
] as const;
