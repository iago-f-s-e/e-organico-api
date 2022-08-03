import { DeleteResult } from 'typeorm';

export type DeleteResponse<T = DeleteResult> = Promise<T>;
