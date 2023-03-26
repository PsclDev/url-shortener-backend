import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import env from '../env';
import { DecodedAuthUser } from './auth.user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return false;
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return false;
    }
    try {
      const decodedUser = this.jwtService.verify<DecodedAuthUser>(token, {
        secret: env.jwtSecret,
      });

      console.log('decodedUser', decodedUser);
      return decodedUser.sub === env.adminId;
    } catch (err) {
      return false;
    }
  }
}