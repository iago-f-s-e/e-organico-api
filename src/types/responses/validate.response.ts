import { BadRequestException } from '@nestjs/common';
import { Either } from '../../shared/either';

export type ValidateResponse<T> = Either<BadRequestException, T>;
