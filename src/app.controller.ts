import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Link } from '@prisma/client';
import { Response } from 'express';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { CreateLinkDto, UpdateLinkDto } from './link.dto';

@Controller()
@UseGuards(AuthGuard)
export class AppController {
  private readonly logger = new Logger('AppController');
  constructor(private readonly appService: AppService) {}

  @Get('links')
  async getAll(): Promise<Link[]> {
    this.logger.log('Getting all links');
    return await this.appService.getAll();
  }

  @Get('link/redirect/:identifier')
  async redirect(
    @Param('identifier') identifier: string,
    @Res() res: Response,
  ): Promise<void> {
    this.logger.log(`Redirecting to ${identifier}`);
    const url = await this.appService.getUrl(identifier);

    res.header(
      'Cache-Control',
      'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0',
    );
    res.redirect(301, url);
  }

  @Post('link')
  async create(@Body() dto: CreateLinkDto): Promise<Link> {
    this.logger.log(`Creating link for ${dto.url}`);
    return await this.appService.create(dto);
  }

  @Patch('link/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateLinkDto,
  ): Promise<Link> {
    this.logger.log(`Updating link ${id}`);
    return await this.appService.update(id, dto);
  }

  @Delete('link/:id')
  async delete(@Param('id') id: string): Promise<Link> {
    this.logger.log(`Deleting link ${id}`);
    return await this.appService.delete(id);
  }
}
