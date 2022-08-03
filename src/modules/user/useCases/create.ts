import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '@src/domain/dtos/user';
import { ICreateUserUserCase } from '@src/domain/interfaces';
import { User } from '@src/infra/database/entities';
import { UserRepository } from '@src/infra/database/repositories';
import { RedisService } from '@src/infra/redis/services';
import { PassService } from '@src/modules/common/services';
import { left, right } from '@src/shared/either';
import { CreateResponse } from '@src/types/responses';

@Injectable()
export class CreateUserUserCase implements ICreateUserUserCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly passService: PassService,
    private readonly cacheService: RedisService
  ) {}

  private async clearCache(user: User): Promise<void> {
    const document = `@document:${user.document}`;
    const email = `@email:${user.email}`;
    const phone = `@phone:${user.phone}`;

    this.cacheService.del(document, email, phone).catch(err => console.error(err));
  }

  private errorMessage(data: CreateUserDTO, prop: 'email' | 'cpf'): string {
    return `The ${prop} "${prop === 'cpf' ? data.document : data.email}" already exists`;
  }

  public async exec(data: CreateUserDTO): CreateResponse<User> {
    const [documentExists, emailExists, password] = await Promise.all([
      this.repository.existingByDocument(data.document),
      this.repository.existingByEmail(data.email),
      this.passService.hash(data.password)
    ]);

    if (documentExists) return left(new ConflictException(this.errorMessage(data, 'cpf')));

    if (emailExists) return left(new ConflictException(this.errorMessage(data, 'email')));

    const user = await this.repository.insert({ ...data, password });

    this.clearCache(user);

    return right(user);
  }
}
