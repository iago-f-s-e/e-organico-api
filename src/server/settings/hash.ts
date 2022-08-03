import { IS_PRODUCTION } from '.';

export const HASH_SALT_FACTOR = IS_PRODUCTION ? 10 : 4;
