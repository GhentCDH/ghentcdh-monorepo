import CollapseLayoutRenderer from './CollapseLayoutRenderer.vue';
import LayoutRenderer from './LayoutRenderer.vue';
import { or, rankWith, uiTypeIs } from '../../../renderers/jsonforms-testers';

const isLayoutType = or(
  uiTypeIs('GridLayout'),
  uiTypeIs('HorizontalLayout'),
  uiTypeIs('VerticalLayout'),
);

export const layoutRenderes = [
  { tester: rankWith(10, isLayoutType), renderer: LayoutRenderer },
  {
    tester: rankWith(10, uiTypeIs('CollapseLayout')),
    renderer: CollapseLayoutRenderer,
  },
];
