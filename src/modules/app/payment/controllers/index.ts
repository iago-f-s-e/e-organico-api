import { Controller, Get } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { IPaymentController } from '@src/domain/interfaces';
import { Payment } from '@src/infra/database/entities';
import { RedisService } from '@src/infra/redis/services';
import { FindPaymentUseCase } from '../use-cases';

@Controller()
export class PaymentController implements IPaymentController {
  private cacheKey = keys.PAYMENTS;

  constructor(
    private readonly findUseCase: FindPaymentUseCase,
    private readonly cache: RedisService
  ) {}

  private getCache(): Promise<Payment[] | null> {
    return this.cache.get<Payment[]>(this.cacheKey);
  }

  private async setCache(payments: Payment[]): Promise<void> {
    await this.cache.set(this.cacheKey, payments);
  }

  @Get()
  public async getAll(): Promise<Payment[]> {
    const cache = await this.getCache();

    if (cache) return cache;

    const payments = await this.findUseCase.exec();

    this.setCache(payments);

    return payments;
  }
}
