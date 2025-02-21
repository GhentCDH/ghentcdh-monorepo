GhentCdh Keycloak libraries for authentication


# Backend nestjs

## Install the libraries

```ssh
pnpm add @ghentcdh/auth/vue @ghentcdh/auth/backend
```

Add following environment variables to the `.env` file.

```
      - KEYCLOAK_HOST=$KEYCLOAK_HOST
      - KEYCLOAK_REALM=$KEYCLOAK_REALM
```

### Secure requests

Add the module to your module.ts imports

```typescript

import {AuthenticationApiModule} from "@ghentcdh/authentication-api";

@Module({
    imports: [AuthenticationApiModule],
})
export class MyModule {
}

```

Extend the `GhentCdhGuard` decorator to secure your routes



```typescript
import { Injectable } from '@nestjs/common';
import { GhentCdhGuard } from '@ghentcdh/authentication-api';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyGuard extends GhentCdhGuard {
  constructor(_httpService: HttpService, _configService: ConfigService) {
    super(_httpService, _configService);
  }
}

```

Use the guard in your controller

```typescript
import {MyGuard} from "./my.guard";

@Controller()
export class MyController {
    @UseGuards(MyGuard)
    @Post('/secure')
    async securePath(@User() user: any, @Request() req: any) {
        return user;
    }
}
```

The `@User()` decorator will give you the user object from the keycloak token.


> TODO list
> - [ ] Add roles decorator and implement logic `@GhentCdhRoles(['admin'])`

## Development environment

Make sure the following is added to your hosts file, if you are running a local keycloak instance. Internally the docker
containers cannot connect to the localhost:8080 port, so a hook is needed in terms of host rewrite.

```sh
echo "127.0.0.1 authentication\n" | sudo tee -a /etc/hosts
```

## Setup docker

> TODO describe me
