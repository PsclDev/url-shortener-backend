import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import env from '../env';
import { DecodedAuthUser } from './auth.user';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const isPublic = this.reflector.get<boolean>(
        'isPublic',
        context.getHandler(),
      );
      if (isPublic) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const token = request.cookies['token'];
      const decodedUser = this.jwtService.verify<DecodedAuthUser>(token, {
        secret: env.jwtSecret,
      });

      return decodedUser.sub === env.adminId;
    } catch (err) {
      return false;
    }
  }
}
