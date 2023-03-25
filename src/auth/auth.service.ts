import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GithubAuthUser } from './auth.user';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: GithubAuthUser): Promise<string> {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
