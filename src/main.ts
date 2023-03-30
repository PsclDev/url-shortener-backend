import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import env from './env';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('v1');
  app.use(cookieParser());

  if (env.devMode) {
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
