import { ConflictException, Injectable } from '@nestjs/common';
import { ReservePhoneDTO } from '@src/domain/dtos/auth';
import { IReserveUserPhone } from '@src/domain/interfaces';
import { UserRepository } from '@src/infra/database/repositories';
import { RedisService } from '@src/infra/redis/services';
import { left, right } from '@src/shared/either';
import { CreateResponse } from '@src/types/responses';

@Injectable()
export class ReserveUserPhone implements IReserveUserPhone {
  constructor(
    private readonly useRepository: UserRepository,
    private readonly cache: RedisService
  ) {}

  private setCache(data: ReservePhoneDTO, key: string): void {
    this.cache.set(key, data).catch(err => console.error(err));
  }

  private errorMessage(): string {
    return 'The user phone already exists.';
  }

  public async exec(data: ReservePhoneDTO, key: string): CreateResponse<null> {
    const phoneExistis = await this.useRepository.existingByPhone(data.phone);

    if (phoneExistis) return left(new ConflictException(this.errorMessage()));

    this.setCache(data, key);

    return right(null);
  }
}
