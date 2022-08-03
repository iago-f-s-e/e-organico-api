import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDTO } from '@src/domain/dtos/transaction';
import { ITransactionRepository } from '@src/domain/interfaces';
import { TransactionStatus } from '@src/types/entities';
import { In, Not, Repository, UpdateResult } from 'typeorm';
import { Transaction } from '../entities';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction) private readonly transaction: Repository<Transaction>
  ) {}

  public async insert(data: CreateTransactionDTO): Promise<Transaction> {
    return this.transaction.save(this.transaction.create(data));
  }

  public async updateStatus(id: string, status: TransactionStatus): Promise<UpdateResult> {
    return this.transaction.update({ id }, { status });
  }

  /**
   * ! Por que usar o find e não o findOne e suas variações retornando assim um único elemento e não um array?
   *
   * * O findOne e suas variações usam o LIMIT=1 e por isso (que no momento não sei resolver)
   * * as relações que retornam arrays (transactionProducts por exemplo) também estão sendo limitadas
   * * fazendo que os dados não sejam verdadeiros;
   *
   * ! A mesma "solução" foi implementada em outros repositórios
   */
  public async findProducerTransactionById(id: string): Promise<Transaction> {
    const [transaction] = await this.transaction.find({
      where: { id },

      select: {
        id: true,
        total: true,
        productQuantity: true,
        type: true,
        status: true,
        number: true,
        createdAt: true,
        payment: {
          id: true,
          name: true,
          type: true
        },
        market: {
          id: true,
          name: true
        },
        selectedDay: {
          id: true,
          weekday: true
        },
        consumer: {
          id: true,
          name: true,
          phone: true,
          email: true,
          score: {
            rating: true,
            transactions: true
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
        },
        transactionProducts: {
          id: true,
          quantity: true,
          total: true,
          producerProduct: {
            id: true,
            price: true,
            stock: true,
            harvestDate: true,
            product: {
              name: true
            },
            unitMeasure: {
              name: true
            },
            score: {
              transactions: true
            }
          }
        }
      },

      relations: {
        transactionProducts: {
          producerProduct: {
            product: true,
            unitMeasure: true,
            score: true
          }
        },
        market: true,
        payment: true,
        consumer: {
          address: true,
          score: true
        },
        selectedDay: true
      }
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return transaction;
  }

  public async findConsumerTransactionById(id: string): Promise<Transaction> {
    const [transaction] = await this.transaction.find({
      where: { id },

      select: {
        id: true,
        total: true,
        productQuantity: true,
        type: true,
        status: true,
        number: true,
        createdAt: true,
        payment: {
          id: true,
          name: true,
          type: true
        },
        market: {
          id: true,
          name: true
        },
        selectedDay: {
          id: true,
          weekday: true
        },
        producer: {
          id: true,
          user: {
            name: true,
            score: {
              rating: true,
              transactions: true
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
        transactionProducts: {
          id: true,
          quantity: true,
          total: true,
          producerProduct: {
            id: true,
            price: true,
            stock: true,
            harvestDate: true,
            product: {
              name: true
            },
            unitMeasure: {
              name: true
            },
            score: {
              transactions: true
            }
          }
        }
      },

      relations: {
        transactionProducts: {
          producerProduct: {
            product: true,
            unitMeasure: true,
            score: true
          }
        },
        market: true,
        payment: true,
        producer: {
          user: {
            address: true,
            score: true
          }
        },
        selectedDay: true
      }
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return transaction;
  }

  public async findConsumerTransactionInProgress(consumerId: string): Promise<Transaction[]> {
    return this.transaction.find({
      where: {
        consumerId,
        status: Not(In(['concluded', 'canceled-by-producer', 'canceled-by-consumer', '']))
      },

      select: {
        id: true,
        total: true,
        productQuantity: true,
        type: true,
        status: true,
        number: true,
        payment: {
          id: true,
          name: true
        },
        market: {
          id: true,
          name: true
        },
        producer: {
          id: true,
          user: {
            name: true
          }
        }
      },

      relations: {
        market: true,
        payment: true,
        producer: {
          user: true
        }
      },

      order: {
        updatedAt: 'DESC'
      }
    });
  }

  public async findProducerTransactionInProgress(producerId: string): Promise<Transaction[]> {
    return this.transaction.find({
      where: {
        producerId,
        status: In(['waiting-for-payment', 'en-route', 'waiting-for-consumer-to-withdraw'])
      },

      select: {
        id: true,
        total: true,
        productQuantity: true,
        type: true,
        status: true,
        number: true,
        createdAt: true,
        payment: {
          id: true,
          name: true
        },
        market: {
          id: true,
          name: true
        },
        consumer: {
          id: true,
          name: true
        },
        selectedDay: {
          id: true,
          weekday: true
        }
      },

      relations: {
        market: true,
        payment: true,
        consumer: true,
        selectedDay: true
      },

      order: {
        updatedAt: 'DESC'
      }
    });
  }

  public async findProducerTransactionConcluded(producerId: string): Promise<Transaction[]> {
    return this.transaction.find({
      where: {
        producerId,
        status: Not(
          In([
            'confirmed-by-consumer',
            'in-separation',
            'waiting-for-confirmation-from-the-producer',
            'waiting-for-consumer-to-withdraw'
          ])
        )
      },

      select: {
        id: true,
        total: true,
        productQuantity: true,
        type: true,
        status: true,
        number: true,
        createdAt: true,
        payment: {
          id: true,
          name: true
        },
        market: {
          id: true,
          name: true
        },
        consumer: {
          id: true,
          name: true
        },
        selectedDay: {
          id: true,
          weekday: true
        }
      },

      relations: {
        market: true,
        payment: true,
        consumer: true,
        selectedDay: true
      },

      order: {
        updatedAt: 'DESC'
      }
    });
  }

  public async findConsumerTransactionConcluded(consumerId: string): Promise<Transaction[]> {
    return this.transaction.find({
      where: {
        consumerId,
        status: In(['concluded', 'canceled-by-producer', 'canceled-by-consumer'])
      },

      select: {
        id: true,
        total: true,
        productQuantity: true,
        type: true,
        status: true,
        number: true,
        payment: {
          id: true,
          name: true
        },
        market: {
          id: true,
          name: true
        },
        producer: {
          id: true,
          user: {
            name: true
          }
        }
      },

      relations: {
        market: true,
        payment: true,
        producer: {
          user: true
        }
      },

      order: {
        updatedAt: 'DESC'
      }
    });
  }

  public async findConsumerTransactionByStatus(
    consumerId: string,
    status: TransactionStatus
  ): Promise<Transaction[]> {
    return this.transaction.find({
      where: { consumerId, status },

      select: {
        id: true,
        total: true,
        productQuantity: true,
        type: true,
        status: true,
        number: true,
        payment: {
          id: true,
          name: true
        },
        market: {
          id: true,
          name: true
        },
        producer: {
          id: true,
          user: {
            name: true
          }
        }
      },

      relations: {
        market: true,
        payment: true,
        producer: {
          user: true
        }
      },

      order: {
        updatedAt: 'DESC'
      }
    });
  }

  public async findProducerTransactionByStatus(
    producerId: string,
    status: TransactionStatus
  ): Promise<Transaction[]> {
    return this.transaction.find({
      where: { producerId, status },

      select: {
        id: true,
        total: true,
        productQuantity: true,
        type: true,
        status: true,
        number: true,
        createdAt: true,
        payment: {
          id: true,
          name: true
        },
        market: {
          id: true,
          name: true
        },
        consumer: {
          id: true,
          name: true
        },
        selectedDay: {
          id: true,
          weekday: true
        }
      },

      relations: {
        market: true,
        payment: true,
        consumer: true,
        selectedDay: true
      },

      order: {
        updatedAt: 'DESC'
      }
    });
  }
}
