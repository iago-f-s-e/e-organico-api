import { ConflictException } from '@nestjs/common';
import { Either } from '@src/shared/either';

export type CreateResponse<T> = Promise<Either<ConflictException, T>>;
