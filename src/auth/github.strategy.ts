import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github';
import env from '../env';
import { GithubAuthUser } from './auth.user';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: env.githubClientId,
      clientSecret: env.githubClientSecret,
      callbackURL: env.githubCallbackUrl,
    });
  }

  async validate(
    _: string,
    __: string,
    profile: Profile,
  ): Promise<GithubAuthUser> {
    const { id, username } = profile;

    if (id !== env.adminId)
      throw new HttpException(
        'You are not authorized to access this resource',
        HttpStatus.UNAUTHORIZED,
      );

    return { id, username };
  }
}
