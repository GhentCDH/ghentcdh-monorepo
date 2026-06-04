import { rankWith } from '@jsonforms/core';

import AutocompleteReadonlyRenderer from './AutocompleteReadonlyRenderer.vue';
import BooleanReadonlyRenderer from './BooleanReadonlyRenderer.vue';
import LinkReadonlyRenderer from './LinkReadonlyRenderer.vue';
import MarkdownReadonlyRenderer from './MarkdownReadonlyRenderer.vue';
import MultiSelectReadonlyRenderer from './MultiSelectReadonlyRenderer.vue';
import NumberReadonlyRenderer from './NumberReadonlyRenderer.vue';
import ObjectReadonlyRenderer from './ObjectReadonlyRenderer.vue';
import SelectReadonlyRenderer from './SelectReadonlyRenderer.vue';
import StringReadonlyRenderer from './StringReadonlyRenderer.vue';
import {
  isAutoCompleteControl,
  isBooleanControl,
  isIntegerFormat,
  isLinkControl,
  isMarkdownControl,
  isMultiselectControl,
  isNumberFormat,
  isObjectControl,
  isSelectControl,
  isStringFormat,
  isTextAreaControl,
} from '../../../../renderers/tester';

export const readonlyControlRenderers = [
  { tester: rankWith(10, isStringFormat), renderer: StringReadonlyRenderer },
  { tester: rankWith(11, isTextAreaControl), renderer: StringReadonlyRenderer },
  {
    tester: rankWith(11, isMarkdownControl),
    renderer: MarkdownReadonlyRenderer,
  },
  { tester: rankWith(11, isBooleanControl), renderer: BooleanReadonlyRenderer },
  { tester: rankWith(11, isSelectControl), renderer: SelectReadonlyRenderer },
  {
    tester: rankWith(11, isMultiselectControl),
    renderer: MultiSelectReadonlyRenderer,
  },
  {
    tester: rankWith(12, isAutoCompleteControl),
    renderer: AutocompleteReadonlyRenderer,
  },
  { tester: rankWith(12, isNumberFormat), renderer: NumberReadonlyRenderer },
  { tester: rankWith(12, isIntegerFormat), renderer: NumberReadonlyRenderer },
  { tester: rankWith(13, isLinkControl), renderer: LinkReadonlyRenderer },
  { tester: rankWith(10, isObjectControl), renderer: ObjectReadonlyRenderer },
];
