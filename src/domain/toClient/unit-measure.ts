import { capitalize } from '@src/shared/functions';
import { UnitMeasureToClient } from '../dtos/unit-measure';
import { IUnitMeasure } from '../interfaces';

type ToClient = (unitMeasure: IUnitMeasure) => UnitMeasureToClient;

export const unitMeasureToClient: ToClient = unitMeasure => ({
  id: unitMeasure.id,
  name: capitalize(unitMeasure.name),
  abbreviation: unitMeasure.abbreviation
});
