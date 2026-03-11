import type { PropType } from 'vue';

export type OptionValue = {
  label: string;
  value: string;
};

export const ListResultsEmits = ['select'];

export const ListProperties = {
  options: { type: Array as PropType<Array<OptionValue>>, required: true },
  isLoading: {
    type: Boolean,
    default: false,
  },
  query: { type: String, default: null },
  isActive: { type: Function, default: (item: any) => false },
};
