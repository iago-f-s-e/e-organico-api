import { Injectable, NestMiddleware } from '@nestjs/common';
import { TokenService } from '@src/infra/token/service';
import { NextFunction, Request, Response } from 'express';

// TODO: criar verificações por usuário
@Injectable()
export class AuthUser implements NestMiddleware {
  constructor(private readonly token: TokenService) {}

  public async use(request: Request, _: Response, next: NextFunction): Promise<void> {
    const payloadOrError = this.token.verify(request.headers.authorization);

    if (payloadOrError.isLeft()) throw payloadOrError.value;

    request.currentUser = payloadOrError.value;

    next();
  }
}
