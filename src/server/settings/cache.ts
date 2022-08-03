const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

const REDIS_PORT = process.env.REDIS_PORT || '6379';

export const REDIS_URI = process.env.REDIS_TLS_URL || `redis://@${REDIS_HOST}:${REDIS_PORT}`;

export const REDIS_TIMEOUT = 1000 * 60 * 60; // 10seg

export const REDIS_EX_MODE = 'EX'; // seconds

export const REDIS_PX_MODE = 'PX'; // milliseconds
