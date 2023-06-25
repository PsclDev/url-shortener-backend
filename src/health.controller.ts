import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckStatus,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma-health.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prismaHealth: PrismaHealthIndicator,
  ) {}

  @Get('/ping')
  ping(): string {
    return 'pong';
  }

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckStatus> {
    const healthCheck = await this.health.check([
      () => this.http.pingCheck('api', 'http://127.0.0.1:3010/health/ping'),
      () => this.prismaHealth.isHealthy('database'),
    ]);

    return healthCheck.status;
  }
}
