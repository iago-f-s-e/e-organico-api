import { WorkdayToClient } from '../dtos/workday';
import { IWorkday } from '../interfaces';

type ToClient = (workday: IWorkday) => WorkdayToClient;

export const workdayToClient: ToClient = ({ id, weekday, opening, closing }) => ({
  id,
  weekday,
  opening,
  closing
});
