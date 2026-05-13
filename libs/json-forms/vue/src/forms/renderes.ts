import { arrayRenderers } from './renderers/array/ArrayRenderers';
import { controlRenderers } from './renderers/controls/ControlRenderers';
import { layoutRenderes } from './renderers/layout/LayoutRenders';

export const customRenderes = [
  layoutRenderes,
  controlRenderers,
  arrayRenderers,
].flat();
