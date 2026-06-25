import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';

import { KEYCLOACK } from './auth.const';

@Injectable()
export class GhentCdhGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isEnabled = this.configService.get(KEYCLOACK.ENABLED);
    if (isEnabled === false) return true;

    // const isPublic = this.reflector.get('isPublic', context.getHandler());
    // if (isPublic) return true;

    const request: any = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    if (!authorization) throw new UnauthorizedException('No token');

    const host = this.configService.get<string>(KEYCLOACK.HOST)!;
    const realm = this.configService.get<string>(KEYCLOACK.REALM)!;
    const url = `${host.replace(/\/$/, '')}/realms/${realm}/protocol/openid-connect/userinfo`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: authorization },
        }),
      );
      request.user = data;
      return true;
    } catch (err: any) {
      console.error(
        'Keycloak userinfo error:',
        err?.response?.data ?? err?.message,
      );
      throw new UnauthorizedException('Invalid token');
    }
  }
}
