import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMarketRepository } from '@src/domain/interfaces';
import { IsNull, Not, Repository } from 'typeorm';
import { Market } from '../entities';

@Injectable()
export class MarketRepository implements IMarketRepository {
  constructor(@InjectRepository(Market) private readonly market: Repository<Market>) {}

  public findAll(): Promise<Market[]> {
    return this.market.find({
      where: {
        isActive: true,
        address: {
          marketId: Not(IsNull())
        },
        score: {
          marketId: Not(IsNull())
        }
      },
      order: {
        name: 'ASC',
        score: {
          transactions: 'DESC'
        }
      },
      select: {
        id: true,
        name: true,
        address: {
          id: true,
          state: true,
          city: true,
          district: true,
          street: true,
          complement: true,
          number: true,
          zipCode: true
        },
        workdays: {
          id: true,
          weekday: true,
          opening: true,
          closing: true
        },
        score: {
          transactions: true
        }
      },
      relations: {
        address: true,
        score: true,
        workdays: true
      }
    });
  }

  public async findByIdOrError(id: string): Promise<Market> {
    const [market] = await this.market.find({
      where: {
        id,
        isActive: true,
        producerMarkets: {
          producer: {
            user: {
              isActive: true
            }
          }
        },
        workdays: {
          isActive: true
        }
      },
      select: {
        id: true,
        name: true,
        address: {
          id: true,
          city: true,
          complement: true,
          district: true,
          number: true,
          state: true,
          street: true,
          zipCode: true
        },
        producerMarkets: {
          isActive: true,
          producer: {
            id: true,
            user: {
              name: true,
              score: {
                rating: true,
                transactions: true
              }
            }
          }
        },
        score: {
          transactions: true
        },
        workdays: {
          id: true,
          weekday: true,
          closing: true,
          opening: true
        }
      },
      relations: {
        address: true,
        producerMarkets: {
          producer: {
            user: {
              score: true
            }
          }
        },
        score: true,
        workdays: true
      }
    });

    if (!market) throw new NotFoundException('Market not found');

    return market;
  }
}
