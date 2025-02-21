import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoginController } from './login.controller';
import { GhentCdhGuard } from './auth.guard';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [LoginController],
  providers: [],
  exports: [GhentCdhGuard],
})
export class AuthenticationApiModule {}
