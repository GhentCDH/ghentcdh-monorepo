import { entry as fixedArrayListRendererEntry } from './FixedArrayRenderer.vue';
import { entry as arrayRendererEntry } from './ArrayRenderer.vue';

export { default as ArrayRenderer } from './ArrayRenderer.vue';
export { default as FixedArrayRenderer } from './FixedArrayRenderer.vue';

export const arrayRenderers = [
  fixedArrayListRendererEntry,
  arrayRendererEntry,
] as const;
