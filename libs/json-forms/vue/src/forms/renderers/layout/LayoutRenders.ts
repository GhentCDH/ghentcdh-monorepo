import { or, rankWith, uiTypeIs } from '@jsonforms/core';

import LayoutRenderer from './LayoutRenderer.vue';

const isLayoutType = or(
  uiTypeIs('GridLayout'),
  uiTypeIs('HorizontalLayout'),
  uiTypeIs('VerticalLayout'),
  uiTypeIs('CollapseLayout'),
);

export const layoutRenderes = [
  { tester: rankWith(10, isLayoutType), renderer: LayoutRenderer },
];
