import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { firstValueFrom, Observable } from 'rxjs';

import { KEYCLOACK } from './auth.const';

@Injectable()
export class GhentCdhGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isEnabled = this.configService.get(KEYCLOACK.ENABLED);
    if (isEnabled === false) return true;

    const isPublic = this.reflector.get('isPublic', context.getHandler());
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) throw new UnauthorizedException();

    const keycloakHost = this.configService.get(KEYCLOACK.HOST);
    const realmName = this.configService.get(KEYCLOACK.REALM);
    const url = `${keycloakHost}realms/${realmName}/protocol/openid-connect/userinfo`;

    return firstValueFrom(
      this.httpService.get(url, {
        headers: {
          Authorization: authorization,
          'X-Forwarded-Host': 'localhost:8080',
        },
      }),
    )
      .then((response) => {
        if (response.status !== 200) throw new UnauthorizedException();
        request.user = response.data;
        return true;
      })
      .catch(() => {
        throw new UnauthorizedException();
      });
  }
}
