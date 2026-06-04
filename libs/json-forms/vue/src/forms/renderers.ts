import { arrayRenderers } from './renderers/array/ArrayRenderers';
import { index } from './renderers/controls';
import { readonlyControlRenderers } from './renderers/controls/readonly';
import { layoutRenderes } from './renderers/layout/LayoutRenders';

export const customRenderes = [layoutRenderes, index, arrayRenderers].flat();
export const readonlyRenderers = [layoutRenderes, readonlyControlRenderers, arrayRenderers].flat();
