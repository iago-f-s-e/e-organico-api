import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialsDTO, LoggedUserDTO } from '@src/domain/dtos/auth';
import { userToClient } from '@src/domain/toClient';
import { FindUserUserCase } from '@src/modules/user/useCases';
import { PassService } from '@src/modules/common/services';
import { AuthResponse } from '@src/types/responses';
import { left, right } from '@src/shared/either';
import { TokenService } from '@src/infra/token/service';
import { ISignInService } from '@src/domain/interfaces';

@Injectable()
export class SignInService implements ISignInService {
  constructor(
    private readonly findUserUseCase: FindUserUserCase,
    private readonly passService: PassService,
    private readonly tokenService: TokenService
  ) {}

  public async exec(data: CredentialsDTO): Promise<AuthResponse<LoggedUserDTO>> {
    const userOrError = await this.findUserUseCase.byPhone(data.phone);

    if (userOrError.isLeft()) return left(new UnauthorizedException());

    const isProducer = !!userOrError.value.producer;
    const isNotActive = userOrError.value.producer?.status !== 'ACTIVE';

    if (isProducer && isNotActive) return left(new UnauthorizedException());

    const isMatch = await this.passService.isMatch(data.password, userOrError.value.password);

    if (!isMatch) return left(new UnauthorizedException());

    const user = userToClient(userOrError.value);
    const token = this.tokenService.generate({ id: user.id, userType: user.userType });

    return right({ token, user });
  }
}
