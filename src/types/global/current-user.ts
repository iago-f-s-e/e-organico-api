import { UserType } from '../entities';

export type CurrentUser = {
  id: string;
  userType: UserType;
};
