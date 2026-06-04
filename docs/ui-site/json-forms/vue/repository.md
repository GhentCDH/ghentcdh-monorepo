---
Repository
---

# Repository

`createRepository` is a typed CRUD factory from `@ghentcdh/json-forms-vue`. It wraps an `HttpClient` to produce a strongly-typed object with `create`, `patch`, `get`, `delete`, and `createMulti` methods, all targeting a single REST resource URI.

Optionally it integrates with a `NotificationStore` to show success/error toasts automatically.

## Usage

```ts
import { createRepository } from '@ghentcdh/json-forms-vue';
import { useApi } from '@ghentcdh/tools-vue';
import { NotificationService } from '@ghentcdh/ui';

const http = useApi();

const bookRepository = createRepository<Book>(
  { uri: '/api/books' },
  http,
);

// create
const newBook = await bookRepository.create({ title: 'My book' });

// update
await bookRepository.patch(newBook.id, { title: 'Updated title' });

// fetch one
const book = await bookRepository.get(newBook.id);

// delete
await bookRepository.delete(newBook.id);
```

## With notifications

Pass a `notification` option to show toast messages automatically on success or error.

```ts
const bookRepository = createRepository<Book>(
  { uri: '/api/books' },
  http,
  {
    notification: {
      show: true,
      entityType: 'book',
      notification: NotificationService,
    },
  },
);
```

On a successful `create` the service shows `"Created book"`, on `patch` it shows `"Saved book"`, and so on.

## API

### `createRepository<T>(model, http, options?)`

| Parameter            | Type                  | Required | Description                                             |
|----------------------|-----------------------|----------|---------------------------------------------------------|
| `model.uri`          | `string`              | true     | Base URI for the resource (e.g. `'/api/books'`)         |
| `http`               | `HttpClient`          | true     | Axios-compatible HTTP client (e.g. from `useApi()`)     |
| `options.notification` | `NotificationOptions` | false  | When provided, shows toast messages on success/error    |

#### `NotificationOptions`

```ts
type NotificationOptions = {
  show: true;
  entityType: string;        // used in toast messages, e.g. "book"
  notification: {
    info:    (message: string) => void;
    error:   (message: string) => void;
    warning: (message: string) => void;
    success: (message: string) => void;
  };
};
```

### Returned methods

| Method                          | Description                                                     |
|---------------------------------|-----------------------------------------------------------------|
| `create(data, options?)`        | `POST /uri` — creates a new record                              |
| `patch(id, data, options?)`     | `PATCH /uri/:id` — updates an existing record                   |
| `get(id, options?)`             | `GET /uri/:id` — fetches a single record                        |
| `delete(id, options?)`          | `DELETE /uri/:id` — deletes a record                            |
| `createMulti(items, options?)`  | `POST /uri` in parallel for each item — bulk create             |

All methods return a `Promise` that resolves to the response data (or array for `createMulti`). On error, the promise rejects after logging and optionally showing a toast.

### `RequestOptions`

Each method accepts an optional `RequestOptions` object:

```ts
type RequestOptions = {
  skipAuth?: boolean;
  queryParams?: Record<string, any>;
  contentType?: string;
};
```
