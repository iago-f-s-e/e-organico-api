import Redis from 'ioredis';
import * as Settings from '@src/server/settings';

export const redisConnection = new Redis(Settings.REDIS_URI, {
  connectTimeout: Settings.REDIS_TIMEOUT
});
