import { CreateUserDTO } from '@src/domain/dtos/user';
import { CreateResponse, FindResponse } from '@src/types/responses';
import { IUser } from './entity';

export interface ICreateUserUserCase {
  exec(data: CreateUserDTO): CreateResponse<IUser>;
}

export interface IFindUserUserCase {
  byPhone(phone: string): FindResponse<IUser>;
}
