import { JwtModule } from '@nestjs/jwt';

import * as Settings from '@src/server/settings';

export const configConfig = JwtModule.register({
  secret: Settings.AUTH_KEY_SECURITY,
  signOptions: {
    expiresIn: Settings.AUTH_KEY_TOKEN_EXPIRES
  }
});
