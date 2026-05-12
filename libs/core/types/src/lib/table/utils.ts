import type { JsonSchema } from '@jsonforms/core';

import { findProperty } from '@ghentcdh/json-forms-core';
import type { TextCellType } from '@ghentcdh/json-forms-core';

export type ColumnDef = TextCellType & { id: string; label: string };

export const findColumnDef = (
  column: TextCellType,
  schema: JsonSchema,
): TextCellType => {
  const { id, property } = findProperty(column, schema);
  return { ...column, id, label: id, ...property };
};
