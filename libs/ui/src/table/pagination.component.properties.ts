export const PaginationComponentProperties = {
  totalItems: { type: Number, default: 0 },
  itemsPerPage: { type: Number, default: 1 },
  currentPage: { type: Number, default: 1 },
};

export const PaginationComponentEmits = ['updatePage', 'updatePageSize'];
