import { rankWith } from '@jsonforms/core';

import { isArrayRenderer } from '../../../renderes/tester';

import ArrayRenderer from './ArrayRenderer.vue';

export const arrayRenderers = [
  { tester: rankWith(12, isArrayRenderer), renderer: ArrayRenderer },
];
