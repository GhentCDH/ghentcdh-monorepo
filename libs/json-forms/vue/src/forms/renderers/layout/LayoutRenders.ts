import { or, rankWith, uiTypeIs } from '@jsonforms/core';

import CollapseLayoutRenderer from './CollapseLayoutRenderer.vue';
import LayoutRenderer from './LayoutRenderer.vue';

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
