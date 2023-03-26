import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GithubStrategy } from './github.strategy';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import env from '../env';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env.jwtSecret,
      signOptions: { expiresIn: `${env.jwtExpiresIn}h` },
    }),
  ],
  providers: [AuthService, AuthGuard, GithubStrategy],
  exports: [AuthService, AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
