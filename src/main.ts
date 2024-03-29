import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { patchNestJsSwagger } from 'nestjs-zod';
import { AppModule } from './app.module';
import env from './env';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true, origin: env.frontendUrl });
  app.setGlobalPrefix('v1', { exclude: ['health', 'health/ping'] });
  app.use(cookieParser());

  if (env.devMode) {
    patchNestJsSwagger();
    const documentBuilder = new DocumentBuilder()
      .setTitle('URL Shortener backend')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup('docs', app, document);
  }

  logger.log(`App listening on port ${env.port}`);
  await app.listen(env.port);
}
bootstrap();
