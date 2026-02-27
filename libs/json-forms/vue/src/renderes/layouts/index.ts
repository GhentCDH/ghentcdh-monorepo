import { rankWith, uiTypeIs } from '@jsonforms/core';

import { LayoutTypes } from '@ghentcdh/json-forms-core';

import CollapseLayout from './CollapseLayout.vue';
import HorizontalLayout from './HorizontalLayout.vue';
import VerticalLayout from './VerticalLayout.vue';

export const layoutRenderers = [
  {
    tester: rankWith(10, uiTypeIs(LayoutTypes.VerticalLayout)),
    renderer: VerticalLayout,
  },
  {
    tester: rankWith(10, uiTypeIs(LayoutTypes.HorizontalLayout)),
    renderer: HorizontalLayout,
  },
  {
    tester: rankWith(10, uiTypeIs(LayoutTypes.CollapseLayout)),
    renderer: CollapseLayout,
  },
];
