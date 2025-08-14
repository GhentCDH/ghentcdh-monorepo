import type { SortDir } from './request.model';

export const Operator = ['contains', 'equals'] as const;
export type OperatorType = (typeof Operator)[number];

export type Filter = {
  key: string;
  value: any;
  operator: OperatorType;
  label?: string;
};
