import * as I from '@src/domain/dtos/auth';
import { CreateUserDTO } from '@src/domain/dtos/user';
import { AuthResponse, CreateResponse } from '@src/types/responses';

export interface IReserveUserDocument {
  exec(data: I.ReserveDocumentDTO, key: string): CreateResponse<null>;
}

export interface IReserveUserEmail {
  exec(data: I.ReserveEmailDTO, key: string): CreateResponse<null>;
}

export interface IReserveUserPhone {
  exec(data: I.ReservePhoneDTO, key: string): CreateResponse<null>;
}

export interface ISignInService {
  exec(data: I.CredentialsDTO): Promise<AuthResponse<I.LoggedUserDTO>>;
}

export interface ISignUpRegisterUserService {
  exec(data: CreateUserDTO): CreateResponse<I.LoggedUserDTO>;
}
