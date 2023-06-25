import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma-health.service';
import { HealthController } from './health.controller';

@Module({
  imports: [AuthModule, JwtModule, HttpModule, TerminusModule],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    PrismaHealthIndicator,
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
