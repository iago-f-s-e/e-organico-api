import { CreateUserDTO } from '@src/domain/dtos/user';
import { IUser } from './entity';

export interface IUserRepository {
  insert(data: CreateUserDTO): Promise<IUser>;
  findByPhone(phone: string): Promise<IUser[]>;
  existingByDocument(document: string): Promise<IUser | null>;
  existingByEmail(email: string): Promise<IUser | null>;
  existingByPhone(phone: string): Promise<IUser | null>;
}
