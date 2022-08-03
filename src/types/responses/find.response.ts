import { NotFoundException } from '@nestjs/common';
import { Either } from '@src/shared/either';

export type FindResponse<T> = Promise<Either<NotFoundException, T>>;
