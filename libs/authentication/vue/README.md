GhentCdh Keycloak libraries for authentication

# Vue frontend

## Install the libraries

```ssh
pnpm add @ghentcdh/auth/vue @ghentcdh/auth/backend
```

# Use the GhentCDH keycloak libraries for authentication

## Install the libraries

```ssh
pnpm add @ghentcdh/auth/vue @ghentcdh/auth/backend
```

## Frontend vuejs

Add following environment variables to the `.env` file.

```bash
      - VITE_KEYCLOAK_HOST=$KEYCLOAK_HOST
      - VITE_KEYCLOAK_REALM=$KEYCLOAK_REALM
      - VITE_KEYCLOAK_CLIENT_ID=$KEYCLOAK_CLIENT_ID
```

## Enable authentication

Enable the authentication plugin in your `main.ts` file.

```typescript
import { createAuth } from '@ghentcdh/authentication-vue';

// Other app initialisation

app.use(createAuth());

```

Create auth options 

| Option    | Default | Functionality                                                |
|-----------|---------|--------------------------------------------------------------|
| skipAuth  | false   | Skip authentication by default if using HttpRequest function |

## Functions

### User related functions

```typescript
import { createAuth } from '@ghentcdh/authentication-vue';

// Get the user
await getUser();

// Check if the user is authenticated
await isAuthenticated();
```

### Perform backend requests with the token

```vue

<script setup lang="ts">
  import { useHttpRequest } from "@ghentcdh/authentication/vue";

  const httpRequest = useHttpRequest();

  httpRequest.post('/api/auth/login', {}).then(response => {
    alert('login ok')
  });
</script>

```

Additional a parameter can be provided if the authentication should be skipped.

```typescript 

```vue

<script setup lang="ts">
  import { useHttpRequest } from "@ghentcdh/authentication/vue";

  const httpRequest = useHttpRequest();

  httpRequest.post('/api/skip-auth', {}, {skipAuth: true}).then(response => {
    alert('login ok')
  });
</script>

```

> TODO list
> - [ ] Add roles guard to see if routes or parts of the application can be accessed by that user
> - [ ] Add whitelisted routes
> - [ ] Add logout functionality
