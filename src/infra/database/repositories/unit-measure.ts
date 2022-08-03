import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUnitMeasureRepository } from '@src/domain/interfaces';
import { Repository } from 'typeorm';
import { UnitMeasure } from '../entities';

@Injectable()
export class UnitMeasureRepository implements IUnitMeasureRepository {
  constructor(
    @InjectRepository(UnitMeasure) private readonly unitMeasure: Repository<UnitMeasure>
  ) {}

  public async findAll(): Promise<UnitMeasure[]> {
    return this.unitMeasure.find({
      where: { isActive: true },
      order: {
        name: 'ASC',
        abbreviation: 'ASC'
      },
      select: {
        id: true,
        name: true,
        abbreviation: true
      }
    });
  }
}
