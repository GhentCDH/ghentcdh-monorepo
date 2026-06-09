import ArrayRenderer from './ArrayRenderer.vue';
import { rankWith } from '../../../renderers/jsonforms-testers';
import { isArrayRenderer } from '../../../renderers/tester';


export const arrayRenderers = [
  { tester: rankWith(12, isArrayRenderer), renderer: ArrayRenderer },
];
