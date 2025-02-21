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

```
      - VITE_KEYCLOAK_HOST=$KEYCLOAK_HOST
      - VITE_KEYCLOAK_REALM=$KEYCLOAK_REALM
      - VITE_KEYCLOAK_CLIENT_ID=$KEYCLOAK_CLIENT_ID
```

### Check if a user is logged in

```vue

<script setup lang="ts">
  import {useAuthenticationStore} from "@ghentcdh/authentication/vue";

  const authenticationStore = useAuthenticationStore();
</script>

<template>
  <pre>user: {{ authenticationStore.user() }}</pre>
</template>

```

### Perform backend requests with the token

```vue

<script setup lang="ts">
  import {useHttpStore} from "@ghentcdh/authentication/vue";

  const httpStore = useHttpStore();

  httpStore.post('/api/auth/login', {}).then(response => {
    alert('login ok')
  });
</script>


```

> TODO list
> - [ ] Add roles guard to see if routes or parts of the application can be accessed by that user
> - [ ] Test if it's possible to have public routes
> - [ ] Add a
> - [ ] Add logout functionality
