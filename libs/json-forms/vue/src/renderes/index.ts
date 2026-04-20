import { vanillaRenderers } from '@jsonforms/vue-vanilla';

import { arrayRenderers } from './array';
import { controlRenderers } from './controls';
import { layoutRenderers } from './layouts';

export * from './tester';

export const customRenderers = [
  controlRenderers,
  layoutRenderers,
  // ...complexRenderers,
  arrayRenderers,
  // ...labelRenderers,
].flat();

export const tailwindRenderers = [
  ...vanillaRenderers,
  ...customRenderers,
] as const;
