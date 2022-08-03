import { ConflictException, NotFoundException } from '@nestjs/common';
import { Either } from '@src/shared/either';
import { UpdateResult } from 'typeorm';

export type UpdateResponse<T = UpdateResult> = Promise<
  Either<NotFoundException | ConflictException, T>
>;
