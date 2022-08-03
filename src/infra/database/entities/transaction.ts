import { ITransaction } from '@src/domain/interfaces';
import { TransactionStatus, TransactionType } from '@src/types/entities';
import { Nil } from '@src/types/global';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { Address } from './address';
import { BaseEntity } from './base-entity';
import { Market } from './market';
import { Payment } from './payment';
import { Producer } from './producer';
import { TransactionProduct } from './transaction-product';
import { User } from './user';
import { Workday } from './workday';

@Entity('transaction')
export class Transaction extends BaseEntity implements ITransaction {
  @PrimaryColumn({ type: 'uuid', name: 'transaction_id' })
  public readonly id!: string;

  @Index('IDX_transaction_number', { unique: true })
  @Column({ type: 'bigint', generated: 'increment' })
  public readonly number!: number;

  @Column({ type: 'uuid', name: 'consumer_id' })
  public readonly consumerId!: string;

  @Column({ type: 'uuid', name: 'producer_id' })
  public readonly producerId!: string;

  @Column({ type: 'uuid', name: 'payment_id' })
  public readonly paymentId!: string;

  @Column({ type: 'uuid', name: 'selected_day_id', nullable: true })
  public readonly selectedDayId: string | Nil;

  @Column({ type: 'uuid', name: 'market_id', nullable: true })
  public readonly marketId: string | Nil;

  @Column({ type: 'uuid', name: 'address_id', nullable: true })
  public readonly addressId: string | Nil;

  @Column({ type: 'float' })
  public readonly total!: number;

  @Column({ type: 'integer', name: 'product_quantity' })
  public readonly productQuantity!: number;

  @Index('IDX_transaction_type', { unique: false })
  @Column({ type: 'varchar' })
  public readonly type!: TransactionType;

  @Index('IDX_transaction_status', { unique: false })
  @Column({ type: 'varchar', default: 'waiting-for-confirmation-from-the-producer' })
  public readonly status!: TransactionStatus;

  @Column({ type: 'varchar', nullable: true })
  public readonly description: string | Nil;

  @Column({ type: 'varchar', nullable: true })
  public readonly observation: string | Nil;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public readonly updatedAt!: Date;

  @ManyToOne(() => User, consumer => consumer.transactions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'consumer_id', referencedColumnName: 'id' })
  public readonly consumer!: User;

  @ManyToOne(() => Producer, producer => producer.transactions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'producer_id', referencedColumnName: 'id' })
  public readonly producer!: Producer;

  @ManyToOne(() => Payment, payment => payment.transactions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'payment_id', referencedColumnName: 'id' })
  public readonly payment!: Payment;

  @ManyToOne(() => Workday, selectedDay => selectedDay.transactions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'selected_day_id', referencedColumnName: 'id' })
  public readonly selectedDay!: Workday;

  @ManyToOne(() => Market, market => market.transactions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'market_id', referencedColumnName: 'id' })
  public readonly market!: Market;

  @ManyToOne(() => Address, address => address.transactions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  public readonly address!: Address;

  @OneToMany(() => TransactionProduct, transactionProducts => transactionProducts.transaction, {
    cascade: true
  })
  public readonly transactionProducts!: TransactionProduct[];
}
