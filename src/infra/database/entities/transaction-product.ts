import { ITransactionProduct } from '@src/domain/interfaces';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { ProducerProduct } from './producer-product';
import { Transaction } from './transaction';

@Entity('transaction-product')
export class TransactionProduct extends BaseEntity implements ITransactionProduct {
  @PrimaryColumn({ type: 'uuid', name: 'transaction_product_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'transaction_id' })
  public readonly transactionId!: string;

  @Column({ type: 'uuid', name: 'producer_product_id' })
  public readonly producerProductId!: string;

  @Column({ type: 'float' })
  public readonly quantity!: number;

  @Column({ type: 'float' })
  public readonly total!: number;

  @ManyToOne(() => Transaction, transaction => transaction.transactionProducts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  public readonly transaction!: Transaction;

  @ManyToOne(() => ProducerProduct, producerProduct => producerProduct.transactionProducts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'producer_product_id', referencedColumnName: 'id' })
  public readonly producerProduct!: ProducerProduct;
}
