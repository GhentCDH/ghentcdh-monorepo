# @ghentcdh/core-types

Shared TypeScript types and Zod schemas for paginated API requests and responses, used across GhentCDH backend and frontend packages.

## Concepts

**Request / Response pagination**

All list endpoints follow a common shape defined by `RequestSchema` and `ResponseSchema`:

```typescript
import { RequestSchema, ResponseData } from '@ghentcdh/core-types';

// Validate incoming query params
const params = RequestSchema.parse(req.query);
// { page, pageSize, sort, sortDir, filter }

// Type outgoing responses
const response: ResponseData<MyItem> = {
  data: items,
  request: { page: 1, pageSize: 20, count: 42, totalPages: 3, ... },
};
```

**Filters**

```typescript
import type { Filter } from '@ghentcdh/core-types';

const filter: Filter = { key: 'name', value: 'ghent', operator: 'contains' };
```

**Table renderer utilities**

Helper types for rendering paginated data in the UI table component (used by `@ghentcdh/ui` and `@ghentcdh/json-forms-vue`).
