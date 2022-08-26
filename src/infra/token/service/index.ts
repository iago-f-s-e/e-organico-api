import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '@src/domain/dtos/token';
import { left, right } from '@src/shared/either';
import { AuthResponse } from '@src/types/responses';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public generate(payload: PayloadToken): string {
    return this.jwtService.sign(JSON.parse(JSON.stringify(payload)));
  }

  public verify(accessToken?: string): AuthResponse<PayloadToken> {
    if (!accessToken) return left(new UnauthorizedException());

    const [prefix, token] = accessToken.split(' ');

    if (prefix !== 'Bearer') return left(new UnauthorizedException());

    try {
      const verified = this.jwtService.verify<PayloadToken>(token);

      const payload: PayloadToken = {
        id: verified.id,
        userType: verified.userType,
        producerStatus: verified.producerStatus
      };

      return right(payload);
    } catch (_) {
      return left(new UnauthorizedException());
    }
  }
}
