---
HTTP client
---

# HTTP client

Some renderers (autocomplete, remote select) and the [repository](./repository.md) factory need to make HTTP requests. Rather than depend on a concrete HTTP library, `@ghentcdh/json-forms-vue` defines a minimal `HttpClient` interface and resolves the instance through Vue's provide/inject.

Any axios-compatible client satisfies the interface — for example the singleton returned by `useApi()` from `@ghentcdh/tools-vue`.

## `HttpClient`

```ts
interface HttpClient {
  get<T = any>(url: string, config?: any): Promise<{ data: T }>;
  post<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }>;
  patch<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }>;
  delete<T = any>(url: string, config?: any): Promise<{ data: T }>;
}
```

## Providing a client

There are two ways to make an `HttpClient` available to renderers.

### Via the `http` prop

Pass the client straight to `JsonForm` (or `JsonFormModal`). This is the simplest option for a single form.

```vue
<template>
  <JsonForm
    id="my-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :http="http"
  />
</template>

<script setup lang="ts">
import { JsonForm } from '@ghentcdh/json-forms-vue';
import { useApi } from '@ghentcdh/tools-vue';

const http = useApi();
</script>
```

### Via `provideHttpClient`

Call `provideHttpClient` once in an ancestor component to share a single client with every descendant form and renderer — no need to repeat the `http` prop.

```vue
<script setup lang="ts">
import { provideHttpClient } from '@ghentcdh/json-forms-vue';
import { useApi } from '@ghentcdh/tools-vue';

provideHttpClient(useApi());
</script>
```

## Consuming the client

Inside a custom renderer, inject the client with `useHttpClient`:

```ts
import { useHttpClient } from '@ghentcdh/json-forms-vue';

const http = useHttpClient();
const { data } = await http.get('/api/authors');
```

`useHttpClient` throws if no client has been provided. Make sure an HTTP-dependent renderer is always rendered under a `provideHttpClient` call or a `JsonForm` with the `http` prop set.

## API

| Export               | Type                              | Description                                                        |
| -------------------- | --------------------------------- | ------------------------------------------------------------------ |
| `HttpClient`         | `interface`                       | Minimal request contract implemented by axios and similar clients |
| `provideHttpClient`  | `(http: HttpClient) => void`      | Provides a client to all descendant renderers                      |
| `useHttpClient`      | `() => HttpClient`                | Injects the provided client; throws when none is available         |
