import { rankWith } from '@jsonforms/core';

import ArrayRenderer from './ArrayRenderer.vue';
import { isArrayRenderer } from '../../../renderers/tester';


export const arrayRenderers = [
  { tester: rankWith(12, isArrayRenderer), renderer: ArrayRenderer },
];
