import { Body, Controller, Post } from '@nestjs/common';
import { CredentialsDTO, LoggedUserDTO } from '@src/domain/dtos/auth';
import { ISignInController } from '@src/domain/interfaces';

import { SignInService } from '../services';

@Controller('sign-in')
export class SignInController implements ISignInController {
  constructor(private readonly service: SignInService) {}

  @Post()
  public async exec(@Body() body: CredentialsDTO): Promise<LoggedUserDTO> {
    const signInOrError = await this.service.exec(body);

    if (signInOrError.isLeft()) throw signInOrError.value;

    return signInOrError.value;
  }
}
