import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProducerRepository } from '@src/domain/interfaces';
import { IsNull, Not, Repository } from 'typeorm';
import { Producer } from '../entities';

@Injectable()
export class ProducerRepository implements IProducerRepository {
  constructor(@InjectRepository(Producer) private readonly producer: Repository<Producer>) {}

  public findAll(): Promise<Producer[]> {
    return this.producer.find({
      where: {
        status: 'ACTIVE',
        user: {
          isActive: true,
          score: {
            userId: Not(IsNull())
          }
        }
      },
      select: {
        id: true,
        user: {
          name: true,
          score: {
            rating: true,
            transactions: true
          }
        }
      },
      order: {
        user: {
          name: 'ASC',
          score: {
            rating: 'DESC',
            transactions: 'DESC'
          }
        }
      },
      relations: {
        user: {
          score: true
        }
      }
    });
  }

  public async findByIdOrError(id: string): Promise<Producer> {
    const [producer] = await this.producer.find({
      where: {
        id,
        status: 'ACTIVE',
        user: {
          isActive: true
        },
        producerMarkets: {
          isActive: true,
          market: {
            workdays: {
              isActive: true
            }
          }
        },
        producerProducts: {
          isActive: true
        }
      },
      select: {
        id: true,
        user: {
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
          score: {
            rating: true,
            transactions: true
          }
        },
        producerMarkets: {
          isActive: true,
          market: {
            id: true,
            name: true,
            score: {
              transactions: true
            },
            workdays: {
              id: true,
              weekday: true,
              opening: true,
              closing: true
            },
            address: {
              id: true,
              city: true,
              complement: true,
              district: true,
              number: true,
              state: true,
              street: true,
              zipCode: true
            }
          }
        },
        producerProducts: {
          id: true,
          price: true,
          stock: true,
          product: {
            name: true
          },
          unitMeasure: {
            name: true
          }
        }
      },
      relations: {
        user: {
          score: true,
          address: true
        },
        producerMarkets: {
          market: {
            address: true,
            score: true,
            workdays: true
          }
        },
        producerProducts: {
          product: true,
          unitMeasure: true
        }
      }
    });

    if (!producer) throw new NotFoundException('Producer not found');

    return producer;
  }
}
