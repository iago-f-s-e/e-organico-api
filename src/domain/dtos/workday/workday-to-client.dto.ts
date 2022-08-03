import { Weekday } from '@src/types/entities';

export type WorkdayToClient = {
  id: string;
  weekday: Weekday;
  opening: string;
  closing: string;
};
