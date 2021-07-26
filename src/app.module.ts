import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./database/typeorm.config";

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
