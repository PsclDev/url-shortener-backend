import { z } from 'zod';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { Logger } from '@nestjs/common';

dotenvExpand.expand(dotenv.config());

const envSchema = z.object({
  nodeEnv: z.string(),
  devMode: z.boolean(),
  port: z.number(),
  databaseUrl: z.string(),
  printConfiguration: z.boolean().default(false),
});

const loadedEnvs = {
  nodeEnv: process.env.NODE_ENV,
  devMode:
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev',
  port: Number(process.env.PORT),
  databaseUrl: process.env.DATABASE_URL,
  printConfiguration: bool(process.env.PRINT_CONFIGURATION),
};

function bool(input: string): boolean {
  if (!input) return false;
  return input.toLowerCase() === 'true';
}

const env = envSchema.parse(loadedEnvs);

const logger = new Logger('Env');
if (env.printConfiguration) {
  logger.log(`Loaded envs: ${JSON.stringify(env, undefined, 2)}`);
}

export default env;
