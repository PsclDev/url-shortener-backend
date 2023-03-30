import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import env from '../env';
import { DecodedAuthUser } from './auth.user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['token'];

    try {
      const decodedUser = this.jwtService.verify<DecodedAuthUser>(token, {
        secret: env.jwtSecret,
      });

      return decodedUser.sub === env.adminId;
    } catch (err) {
      return false;
    }
  }
}
