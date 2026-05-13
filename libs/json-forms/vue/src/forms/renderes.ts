import { arrayRenderers } from './renderers/array/ArrayRenderers';
import { index } from './renderers/controls';
import { layoutRenderes } from './renderers/layout/LayoutRenders';

export const customRenderes = [layoutRenderes, index, arrayRenderers].flat();
