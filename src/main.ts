import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from "@nestjs/common";
import * as config from 'config';

async function bootstrap() {
    const serverConfig = config.get('server');
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('Main');

    const port = serverConfig.port;
    logger.log(`API running on port: ${port}`);
    await app.listen(port);
}

bootstrap();
