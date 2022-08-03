import { ConflictException, Injectable } from '@nestjs/common';
import { ReserveDocumentDTO } from '@src/domain/dtos/auth';
import { IReserveUserDocument } from '@src/domain/interfaces';
import { UserRepository } from '@src/infra/database/repositories';
import { RedisService } from '@src/infra/redis/services';
import { left, right } from '@src/shared/either';
import { CreateResponse } from '@src/types/responses';

@Injectable()
export class ReserveUserDocument implements IReserveUserDocument {
  constructor(
    private readonly useRepository: UserRepository,
    private readonly cache: RedisService
  ) {}

  private setCache(data: ReserveDocumentDTO, key: string): void {
    this.cache.set(key, data).catch(err => console.error(err));
  }

  private errorMessage(): string {
    return 'The user document already exists.';
  }

  public async exec(data: ReserveDocumentDTO, key: string): CreateResponse<null> {
    const documentExistis = await this.useRepository.existingByDocument(data.document);

    if (documentExistis) return left(new ConflictException(this.errorMessage()));

    this.setCache(data, key);

    return right(null);
  }
}
