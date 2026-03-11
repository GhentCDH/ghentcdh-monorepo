import { cloneDeep, defaultsDeep } from 'lodash-es';

export const myStyles = {
  group: {
    root: 'group',
    label: 'text-primary text-lg font-bold',
    item: 'group-item',
  },
  verticalLayout: {
    root: 'flex flex-col gap-x-2',
    item: 'w-full',
  },
  horizontalLayout: {
    root: 'flex flex-row gap-x-2',
    item: 'w-full',
  },
  arrayList: {
    root: 'fieldset',
    legend: 'fieldset-legend text-xl capitalize',
  },
  control: {
    root: 'fieldset',
    wrapper: 'fieldset',
    label: 'fieldset-legend',
    error: '',
    input: 'input',
    textarea: 'input h-32',
    checkbox: 'checkbox',
    select: 'input pr-14',
    description: 'form-control--description label text-xs text-gray-500',
  },

  fixedArrayList: {
    root: 'flex flex-row gap-x-2',
    item: 'w-full',
  },
} as const;

// Derive the type from the value — single source of truth
export type MyStyles = typeof myStyles;

export const mergeStyles = (overrides?: Partial<MyStyles>): MyStyles =>
  defaultsDeep(cloneDeep(overrides ?? {}), myStyles);
