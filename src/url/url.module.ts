import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import {UrlRepository} from "./url.repository";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([UrlRepository])],
  controllers: [UrlController],
  providers: [UrlService]
})
export class UrlModule {}
