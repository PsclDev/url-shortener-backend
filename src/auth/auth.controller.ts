import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import env from '../env';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger('AppController');

  constructor(private readonly authService: AuthService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin(): void {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<void> {
    this.logger.log(`Github login callback`);

    var token = await this.authService.login(req.user);
    res.header(
      'Cache-Control',
      'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0',
    );
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + env.jwtExpiresIn * 60 * 60 * 1000),
    });
    res.redirect(301, `${env.frontendUrl}/dashboard`);
  }
}
