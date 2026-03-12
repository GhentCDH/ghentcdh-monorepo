import type { PropType } from 'vue';

export const FilterProperties = {
  title: { type: String, required: true },
  items: { type: Array as PropType<Array<Record<string, any>>>, required: true },
  modelValue: { type: Array as PropType<Array<any>>, default: () => [] },
  labelKey: { type: String, default: 'label' },
  valueKey: { type: String, default: 'id' },
  colorKey: { type: String, default: undefined },
  countFn: {
    type: Function as PropType<(item: Record<string, any>) => number>,
    default: undefined,
  },
  opened: { type: Boolean, default: true },
};

export const FilterEmits = ['update:modelValue'];
