import {
  isBooleanControl,
  isIntegerControl,
  isNumberControl,
  rankWith,
} from '@jsonforms/core';

import BooleanControlRenderer from './BooleanControlRenderer.vue';
import IntegerControlRenderer from './IntegerControlRenderer.vue';
import MarkdownControlRenderer from './MarkdownControlRenderer.vue';
import NumberControlRenderer from './NumberControlRenderer.vue';
import StringControlRenderer from './StringControlRenderer.vue';
import TextAreaControlRenderer from './TextAreaControlRenderer.vue';
import {
  isAutoCompleteControl,
  isMarkdownControl,
  isStringFormat,
  isTextAreaControl,
} from '../tester';
import AutocompleteControlRenderer from './autocomplete/AutocompleteControlRenderer.vue';

// import { entry as multiStringControlRendererEntry } from './MultiStringControlRenderer.vue';
// import { entry as enumControlRendererEntry } from './EnumControlRenderer.vue';
// import { entry as oneOfEnumControlRendererEntry } from './EnumOneOfControlRenderer.vue';
// import { entry as dateControlRendererEntry } from './DateControlRenderer.vue';
// import { entry as dateTimeControlRendererEntry } from './DateTimeControlRenderer.vue';
// import { entry as timeControlRendererEntry } from './TimeControlRenderer.vue';

export { default as AutocompleteControlRenderer } from './autocomplete/AutocompleteControlRenderer.vue';

export { default as StringControlRenderer } from './StringControlRenderer.vue';
// export { default as MultiStringControlRenderer } from './MultiStringControlRenderer.vue';
export { default as NumberControlRenderer } from './NumberControlRenderer.vue';
export { default as IntegerControlRenderer } from './IntegerControlRenderer.vue';
// export { default as EnumControlRenderer } from './EnumControlRenderer.vue';
// export { default as oneOfEnumControlRenderer } from './EnumOneOfControlRenderer.vue';
// export { default as DateControlRenderer } from './DateControlRenderer.vue';
// export { default as DateTimeControlRenderer } from './DateTimeControlRenderer.vue';
// export { default as TimeControlRenderer } from './TimeControlRenderer.vue';
export { default as BooleanControlRenderer } from './BooleanControlRenderer.vue';
export { default as markdownControlRenderer } from './MarkdownControlRenderer.vue';

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
  { tester: rankWith(10, isNumberControl), renderer: NumberControlRenderer },
  {
    tester: rankWith(10, isIntegerControl),
    renderer: IntegerControlRenderer,
  },

  { tester: rankWith(10, isBooleanControl), renderer: BooleanControlRenderer },
] as const;
