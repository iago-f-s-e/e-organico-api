import bcrypt from 'bcrypt';

import * as Settings from '@src/server/settings';

export class PassService {
  constructor(private readonly bcryptService = bcrypt) {}

  public async hash(pass: string): Promise<string> {
    const salts = await this.bcryptService.genSalt(Settings.HASH_SALT_FACTOR);

    return this.bcryptService.hash(pass, salts);
  }

  public isMatch(pass: string, hashed: string): Promise<boolean> {
    return this.bcryptService.compare(pass, hashed);
  }
}
