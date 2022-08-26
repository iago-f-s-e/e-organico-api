import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMarketRepository } from '@src/domain/interfaces';
import { In, IsNull, Not, Repository } from 'typeorm';
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

  public withoutProducerMarket(notInIds: string[]): Promise<Market[]> {
    return this.market.find({
      where: {
        id: Not(In(notInIds)),
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
    const [market] = await this.market
      .createQueryBuilder('market')
      .select([
        'market.id',
        'market.name',
        'address.id',
        'address.city',
        'address.complement',
        'address.district',
        'address.number',
        'address.state',
        'address.street',
        'address.zipCode',
        'producerMarkets.isActive',
        'producer.id',
        'user.name',
        'userScore.rating',
        'userScore.transactions',
        'score.transactions',
        'workdays.id',
        'workdays.weekday',
        'workdays.closing',
        'workdays.opening'
      ])
      .innerJoin('market.address', 'address')
      .innerJoin('market.score', 'score')
      .innerJoin('market.workdays', 'workdays', 'workdays.isActive = true')
      .leftJoin('market.producerMarkets', 'producerMarkets', 'producerMarkets.isActive = true')
      .leftJoin('producerMarkets.producer', 'producer', 'producer.status = :status', {
        status: 'ACTIVE'
      })
      .leftJoin('producer.user', 'user', 'user.isActive = true')
      .leftJoin('user.score', 'userScore')
      .where('market.isActive = true and market.id = :id', { id })
      .getMany();

    if (!market) throw new NotFoundException('Market not found');

    return market;
  }
}
