import { ConflictException, Injectable } from '@nestjs/common';
import { ReserveEmailDTO } from '@src/domain/dtos/auth';
import { IReserveUserEmail } from '@src/domain/interfaces';
import { UserRepository } from '@src/infra/database/repositories';
import { RedisService } from '@src/infra/redis/services';
import { left, right } from '@src/shared/either';
import { CreateResponse } from '@src/types/responses';

@Injectable()
export class ReserveUserEmail implements IReserveUserEmail {
  constructor(
    private readonly useRepository: UserRepository,
    private readonly cache: RedisService
  ) {}

  private setCache(data: ReserveEmailDTO, key: string): void {
    this.cache.set(key, data).catch(err => console.error(err));
  }

  private errorMessage(): string {
    return 'The user email already exists.';
  }

  public async exec(data: ReserveEmailDTO, key: string): CreateResponse<null> {
    const emailExistis = await this.useRepository.existingByEmail(data.email);

    if (emailExistis) return left(new ConflictException(this.errorMessage()));

    this.setCache(data, key);

    return right(null);
  }
}
