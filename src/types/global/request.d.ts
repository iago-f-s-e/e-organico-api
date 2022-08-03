import * as http from 'http';
import { CurrentUser } from './current-user';

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    currentUser: CurrentUser;
  }
}
