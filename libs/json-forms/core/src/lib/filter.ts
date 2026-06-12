import type { SortDir } from './request.model';

export const Operator = [
  'contains',
  'not_contains',
  'equals',
  'not_equals',
  'gt',
  'lt',
  'isnull',
  'isnotnull',
] as const;

export type OperatorType = (typeof Operator)[number];

/** Human-readable label shown in the filter operator dropdown. */
export const OperatorLabel: Record<OperatorType, string> = {
  contains: 'contains',
  not_contains: 'not contains',
  equals: 'equals',
  not_equals: 'not equals',
  gt: '>',
  lt: '<',
  isnull: 'is empty',
  isnotnull: 'is not empty',
};

export const OperatorOptions = Operator.map((k) => {
  return {
    value: k,
    label: OperatorLabel[k],
  };
});

/** Operators that don't require a user-supplied value. */
export const OperatorNoValue = new Set<OperatorType>(['isnull', 'isnotnull']);

export type Filter = {
  key: string;
  value: any;
  operator: OperatorType;
  label?: string;
};

const getFilterValues = (filter: string): Filter => {
  // Format: field:value:operator — last segment is operator when it matches a known operator.
  const parts = filter.split(':');
  const key = parts[0] ?? '';
  const lastPart = parts[parts.length - 1] as OperatorType;
  const hasOp = parts.length >= 3 && Operator.includes(lastPart);
  const operator: OperatorType = hasOp ? lastPart : 'contains';
  const value = hasOp ? parts.slice(1, -1).join(':') : parts.slice(1).join(':');

  return { key, value, operator };
};

const buildFilterKey = (keys: string[], filterObj: any) => {
  if (keys.length === 1) {
    return { key: keys[0], filterObj };
  }

  const buildKey = keys.pop() as string;

  return buildFilterKey(keys, { [buildKey]: filterObj });
};

export const buildSort = (key: string, sortDir: SortDir) => {
  return buildSortKey(key.split('.'), sortDir);
};

export const buildSortKey = (keys: string[], sortDir: any): any => {
  if (keys.length === 1) {
    return { [keys[0]]: sortDir };
  }

  const buildKey = keys.pop() as string;

  return buildSortKey(keys, { [buildKey]: sortDir });
};

export const buildFilter = (filters: string[]) => {
  const filter: Record<string, any> = {};

  filters?.forEach((f) => {
    const { key, value, operator } = getFilterValues(f);

    if (!key) return;

    const op = operator || 'contains';

    // TODO check if operator is possible
    const filterObj: Record<string, string> = {
      [operator || 'contains']: value.toLowerCase(),
    };

    if (op === 'contains') {
      filterObj['mode'] = 'insensitive';
    }

    const build = buildFilterKey(key.split('.'), filterObj);

    filter[build.key] = build.filterObj;
  });

  return filter;
};

export const extractFilters = (filters: string[]) => {
  const result: Filter[] = [];

  filters.forEach((f) => {
    const { key, value, operator } = getFilterValues(f);

    if (!key) return;

    const label = key;

    // TODO if in operator it should be a list

    result.push({ label, key, value, operator });
  });

  return result;
};

/** Serialize a Filter object back to the wire format `"key:value:operator"`. */
export const filterToString = (filter: Filter): string =>
  `${filter.key}:${filter.value}:${filter.operator}`;

/** Parse a filter string `"key:value:operator"` back into a Filter object. */
export const stringToFilter = (s: string): Filter => getFilterValues(s);
