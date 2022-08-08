import { RedisService } from '@src/infra/redis/services';
import { PORT } from '@src/server/settings';

export function containerActions(redisService = new RedisService()): {
  called: () => Promise<void>;
  free: () => Promise<void>;
} {
  const key = `PORT=${PORT}`;

  async function push(): Promise<void> {
    await redisService.set(key, PORT);
  }

  async function pop(): Promise<void> {
    await redisService.del(key);
  }

  return {
    called: () => push(),
    free: () => pop()
  };
}
