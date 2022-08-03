import { UnauthorizedException } from '@nestjs/common';
import { Either } from '@src/shared/either';

export type AuthResponse<T> = Either<UnauthorizedException, T>;
