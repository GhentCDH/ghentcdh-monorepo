export type MyStyles = any & {
  fixedArrayList: { root: string; item: string };
};

export const myStyles: MyStyles = {
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
    select: 'select',
    description: 'form-control--description label text-xs text-gray-500',
  },

  fixedArrayList: {
    root: 'flex flex-row gap-x-2',
    item: 'w-full',
  },
} as const;
