import { vanillaRenderers } from '@jsonforms/vue-vanilla';
import { controlRenderers } from './controls';
import { layoutRenderers } from './layouts';
import { arrayRenderers } from './array';

export * from './tester';

export const customRenderers = [
  controlRenderers,
  layoutRenderers,
  // ...complexRenderers,
  arrayRenderers,
  // ...labelRenderers,
].flat();

const customRenderesName = customRenderers.map((c) => {
  console.group(`Rendering ${c.renderer.name}`);
  console.log(c.renderer);
  console.log(c.renderer.render);

  console.groupEnd();

  return c.renderer.name;
});
// customRenderesName.push('ArrayListRenderer');

const useVanillaRenderers = vanillaRenderers.filter(
  (v) => !customRenderesName.includes(v.renderer.name),
);

export const tailwindRenderers = [
  ...customRenderers,
  ...useVanillaRenderers,
] as const;
console.log(tailwindRenderers);
