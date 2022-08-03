import { UserToClient } from '../user/user-to-client.dto';

export type LoggedUserDTO = {
  token: string;
  user: UserToClient;
};
