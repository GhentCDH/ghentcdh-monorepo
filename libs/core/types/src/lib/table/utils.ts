import type { JsonSchema } from '@jsonforms/core';

import type { TextCellType } from './builder';
import { findProperty } from '../schema.utils';

export type ColumnDef = TextCellType & { id: string; label: string };

export const findColumnDef = (
  column: TextCellType,
  schema: JsonSchema,
): TextCellType => {
  const { id, property } = findProperty(column, schema);
  return { ...column, id, label: id, ...property };
};
