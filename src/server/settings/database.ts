import { LoggerOptions } from 'typeorm';
import { resolve } from 'path';
import { IS_PRODUCTION } from './server';

const dir = resolve(__dirname, '..', '..');

export const DB_HOST = process.env.DB_HOST || 'db';

export const DB_PORT = Number(process.env.DB_PORT) || 9999;

export const DB_NAME = process.env.DB_NAME || 'db_name';

export const DB_USER = process.env.DB_USER || 'db_user';

export const DB_PASS = process.env.DB_PASS || 'db_pass';

export const DB_PATH_ENTITIES = `${dir}/infra/database/entities/*.{ts,js}`;

export const DB_PATH_MIGRATIONS = `${dir}/infra/database/migrations/*.{ts,js}`;

export const DB_PATH_SEEDS = `${dir}/infra/database/seeds/*.{ts,js}`;

export const DB_SSL = IS_PRODUCTION ? { rejectUnauthorized: false } : undefined;

export const DB_TIMEOUT = 1000 * 10; // 10seg;

export const DB_ENCRYPT = false;

export const DB_LOGGING: LoggerOptions = IS_PRODUCTION
  ? ['error', 'warn']
  : ['error', 'warn', 'query'];

export const TRANSFORMER_KEY_SECURITY = process.env.TRANSFORMER_KEY_SECURITY || 'secret';
export const TRANSFORMER_KEY_IV = process.env.TRANSFORMER_KEY_IV || 'secret';
