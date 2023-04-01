import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Link, Prisma } from '@prisma/client';
import { CreateLinkDto, UpdateLinkDto } from './link.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Link[]> {
    try {
      return this.prisma.link.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUrl(identifier: string): Promise<string> {
    try {
      const link = await this.prisma.link.findFirst({
        where: {
          OR: [{ id: identifier }, { slug: identifier }],
        },
      });

      if (!link) {
        throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
      }

      return link.url;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: CreateLinkDto): Promise<Link> {
    try {
      return await this.prisma.link.create({
        data: {
          id: randomBytes(2).toString('hex'),
          url: dto.url,
          slug: dto.slug ? encodeURIComponent(dto.slug) : null,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'Link is already shortend or slug is already taken',
            HttpStatus.CONFLICT,
          );
        }
      }

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, dto: UpdateLinkDto): Promise<Link> {
    try {
      return await this.prisma.link.update({
        where: { id },
        data: {
          url: dto.url,
          slug: dto.slug ? encodeURIComponent(dto.slug) : null,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string): Promise<Link> {
    try {
      return await this.prisma.link.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
