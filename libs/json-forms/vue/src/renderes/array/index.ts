import { entry as arrayRendererEntry } from './ArrayRenderer.vue';
import { entry as fixedArrayListRendererEntry } from './FixedArrayRenderer.vue';

export { default as ArrayRenderer } from './ArrayRenderer.vue';
export { default as FixedArrayRenderer } from './FixedArrayRenderer.vue';

export const arrayRenderers = [
  fixedArrayListRendererEntry,
  arrayRendererEntry,
] as const;
