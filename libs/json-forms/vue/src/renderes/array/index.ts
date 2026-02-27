import { rankWith } from '@jsonforms/core';

import ArrayRenderer from './ArrayRenderer.vue';
import { isArrayRenderer } from '../tester';

export { default as ArrayRenderer } from './ArrayRenderer.vue';

export const arrayRenderers = [
  {
    tester: rankWith(12, isArrayRenderer),
    renderer: ArrayRenderer,
  },
] as const;
