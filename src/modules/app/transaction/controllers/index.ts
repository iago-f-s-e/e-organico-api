import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post
} from '@nestjs/common';
import { GetTransaction, TransactionDTO } from '@src/domain/dtos/transaction';
import { ITransactionController } from '@src/domain/interfaces';
import { CreateTransactionModel } from '@src/domain/models/app/transaction';
import { minimalTransactionToClient, transactionToClient } from '@src/domain/toClient';
import { Transaction } from '@src/infra/database/entities';
import { Current } from '@src/modules/common/guard';
import { CurrentUser } from '@src/types/global';
import * as UseCases from '../use-cases';

@Controller()
export class TransactionController implements ITransactionController {
  constructor(
    private readonly createUseCase: UseCases.CreateTransactionUseCase,
    private readonly findUseCase: UseCases.FindTransactionUseCase,
    private readonly updateUseCase: UseCases.UpdateTransactionUseCase
  ) {}

  @Post()
  public create(
    @Body() body: TransactionDTO,
    @Current() consumer: CurrentUser
  ): Promise<Transaction> {
    const transaction = new CreateTransactionModel({ ...body, consumer });

    return this.createUseCase.exec(transaction.value);
  }

  @Get('in-progress')
  public async getInProgress(@Current() current: CurrentUser): GetTransaction {
    return (await this.findUseCase.findInProgress(current)).map(transaction =>
      minimalTransactionToClient(transaction, current)
    );
  }

  @Get('in-separation')
  public async getInSeparation(@Current() current: CurrentUser): GetTransaction {
    return (await this.findUseCase.findInSeparation(current)).map(transaction =>
      minimalTransactionToClient(transaction, current)
    );
  }

  @Get('pending')
  public async getPending(@Current() current: CurrentUser): GetTransaction {
    return (await this.findUseCase.findPending(current)).map(transaction =>
      minimalTransactionToClient(transaction, current)
    );
  }

  @Get('concluded')
  public async getConcluded(@Current() current: CurrentUser): GetTransaction {
    return (await this.findUseCase.findConcluded(current)).map(transaction =>
      minimalTransactionToClient(transaction, current)
    );
  }

  @Get(':id')
  public async getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Current() current: CurrentUser
  ): GetTransaction {
    const transaction = await this.findUseCase.findById(id, current);

    if (transaction.isLeft()) throw transaction.value;

    return transactionToClient(transaction.value, current);
  }

  @Patch(':id/confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  public confirm(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Current() current: CurrentUser
  ): void {
    return this.updateUseCase.confirm(id, current);
  }

  @Patch(':id/cancel')
  @HttpCode(HttpStatus.NO_CONTENT)
  public cancel(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Current() current: CurrentUser
  ): void {
    return this.updateUseCase.cancel(id, current);
  }

  @Patch(':id/separate')
  @HttpCode(HttpStatus.NO_CONTENT)
  public separate(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): void {
    return this.updateUseCase.separate(id);
  }

  @Patch(':id/deliver')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deliver(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): void {
    return this.updateUseCase.deliver(id);
  }
}
