import { PartialType } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(1).max(15).optional(),
});

const UpdateLinkSchema = CreateLinkSchema.partial();

export class CreateLinkDto extends createZodDto(CreateLinkSchema) {}
export class UpdateLinkDto extends createZodDto(UpdateLinkSchema) {}
