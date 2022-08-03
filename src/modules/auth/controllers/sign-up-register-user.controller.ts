import { Body, Controller, Post } from '@nestjs/common';
import { LoggedUserDTO } from '@src/domain/dtos/auth';
import { UserDTO } from '@src/domain/dtos/user';
import { ISignUpRegisterUserController } from '@src/domain/interfaces';
import { CreateUserModel } from '@src/domain/models/user';

import { SignUpRegisterUserService } from '../services';

@Controller()
export class SignUpRegisterUserController implements ISignUpRegisterUserController {
  constructor(private readonly service: SignUpRegisterUserService) {}

  @Post('register-consumer')
  public async registerConsumer(@Body() body: UserDTO): Promise<LoggedUserDTO> {
    const user = new CreateUserModel(body);

    const createOrError = await this.service.exec(user.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }

  @Post('register-producer')
  public async registerProducer(@Body() body: UserDTO): Promise<LoggedUserDTO> {
    const user = new CreateUserModel(body);

    const createOrError = await this.service.exec(user.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
