export const ListProperties = {
  options: { type: Array, required: true },
  isLoading: {
    type: Boolean,
    default: false,
  },
  query: { type: String, default: null },
  /** Key to use as the display label when options are objects */
  labelKey: { type: String, default: 'label' },
  /** Key to use as the stored
value when options are objects */
  valueKey: { type: String, default: 'value' },
  isActive: { type: Function, default: (item: any) => false },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
export const getLabel = (item: any, props: { labelKey: string }) =>
  typeof item === 'object' ? item[props.labelKey] : item;

export const getValue = (item: any, props: { valueKey: string }) =>
  typeof item === 'object' ? item[props.valueKey] : item;
