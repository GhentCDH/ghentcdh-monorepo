export type PageProps = {
  currentPage: number;
  page: number;
  label: string;
  neverActive?: boolean;
  disabled?: boolean;
};

export const PaginationButtonProperties = {
  currentPage: { type: Number, required: true },
  page: { type: Number, required: true },
  label: { type: String, required: true },
  neverActive: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
};

export const PaginationButtonEmits = ['updatePage', 'updatePageSize'];
