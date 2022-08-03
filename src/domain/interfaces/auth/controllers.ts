import {
  CredentialsDTO,
  LoggedUserDTO,
  ReserveDocumentDTO,
  ReserveEmailDTO,
  ReservePhoneDTO
} from '@src/domain/dtos/auth';
import { UserDTO } from '@src/domain/dtos/user';

export interface ISignInController {
  exec(body: CredentialsDTO): Promise<LoggedUserDTO>;
}

export interface ISignUpRegisterUserController {
  registerConsumer(body: UserDTO): Promise<LoggedUserDTO>;
  registerProducer(body: UserDTO): Promise<LoggedUserDTO>;
}

export interface ISignUpReserveUserDocumentController {
  reserverDocument(body: ReserveDocumentDTO): Promise<void>;
  reservePhone(body: ReservePhoneDTO): Promise<void>;
  reserveEmail(body: ReserveEmailDTO): Promise<void>;
}
