This library consist of a group of tools used by the GhentCDH projects.

# Health api

This will add a health check endpoint to the nestjs application.

Add it to the `AppModule` imports

```typescript

import { HealthApiModule } from '@ghentcdh/tools/health/api';

@Module({
  imports: [
    ...
    HealthApiModule,
  ],
})
export class AppModule {}

```

# Logging api for nestjs application

## Configuration

1. adjust the nestjs file `main.ts` to include the logging module

```typescript

import {Logger as MyLogger} from '@ghentcdh/tools/api';

// bootstrap the application


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //...

    app.useLogger(new MyLogger())
    //...
}

```

2. configure the logging environment variable ```LOG_DIR``` in the `.env` file

```
LOG_DIR=/tmp/logs
```

3. Use the logging command

```typescript
import {Logger} from '@ghentcdh/tools/api';


Logger.log('Nest hello api', 'AppController');
```
