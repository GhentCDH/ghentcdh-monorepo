import { rankWith } from '@jsonforms/core';

import AutocompleteControlRenderer from './AutocompleteControlRenderer.vue';
import BooleanControlRenderer from './BooleanControlRenderer.vue';
import MarkdownControlRenderer from './MarkdownControlRenderer.vue';
import MultiSelectControlRenderer from './MultiSelectControlRenderer.vue';
import NumberControlRenderer from './NumberControlRenderer.vue';
import SelectControlRenderer from './SelectControlRenderer.vue';
import StringControlRenderer from './StringControlRenderer.vue';
import TextAreaControlRenderer from './TextAreaControlRenderer.vue';
import {
  isAutoCompleteControl,
  isBooleanControl,
  isIntegerFormat,
  isLinkControl,
  isMarkdownControl,
  isMultiselectControl,
  isNumberFormat,
  isSelectControl,
  isStringFormat,
  isTextAreaControl,
} from '../../../renderers/tester';

export const index = [
  { tester: rankWith(10, isStringFormat), renderer: StringControlRenderer },
  { tester: rankWith(13, isLinkControl), renderer: StringControlRenderer },
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
