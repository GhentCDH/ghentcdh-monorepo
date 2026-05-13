import { rankWith } from '@jsonforms/core';

import {
  isAutoCompleteControl,
  isBooleanControl,
  isIntegerFormat,
  isMarkdownControl,
  isMultiselectControl,
  isNumberFormat,
  isSelectControl,
  isStringFormat,
  isTextAreaControl
} from '../../../renderes/tester';
import StringControlRenderer from './StringControlRenderer.vue';
import BooleanControlRenderer from './BooleanControlRenderer.vue';
import SelectControlRenderer from './SelectControlRenderer.vue';
import MultiSelectControlRenderer from './MultiSelectControlRenderer.vue';
import AutocompleteControlRenderer from './AutocompleteControlRenderer.vue';
import NumberControlRenderer from './NumberControlRenderer.vue';
import MarkdownControlRenderer from './MarkdownControlRenderer.vue';
import TextAreaControlRenderer from './TextAreaControlRenderer.vue';

export const controlRenderers = [
  { tester: rankWith(10, isStringFormat), renderer: StringControlRenderer },
  {
    tester: rankWith(11, isTextAreaControl),
    renderer: TextAreaControlRenderer,
  },
  {
    tester: rankWith(11, isMarkdownControl),
    renderer: MarkdownControlRenderer,
  },
  { tester: rankWith(11, isBooleanControl), renderer: BooleanControlRenderer },
  { tester: rankWith(11, isSelectControl), renderer: SelectControlRenderer },
  {
    tester: rankWith(11, isMultiselectControl),
    renderer: MultiSelectControlRenderer,
  },
  {
    tester: rankWith(12, isAutoCompleteControl),
    renderer: AutocompleteControlRenderer,
  },
  {
    tester: rankWith(12, isNumberFormat),
    renderer: NumberControlRenderer,
  },
  {
    tester: rankWith(12, isIntegerFormat),
    renderer: NumberControlRenderer,
  },
];
