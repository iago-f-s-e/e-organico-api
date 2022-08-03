import { IPayment } from '@src/domain/interfaces';
import { PaymentType } from '@src/types/entities';
import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Transaction } from './transaction';

@Entity('payment')
export class Payment extends BaseEntity implements IPayment {
  @PrimaryColumn({ type: 'uuid', name: 'payment_id' })
  public readonly id!: string;

  @Index('IDX_payment_name', { unique: true })
  @Column({ type: 'varchar', unique: true })
  public readonly name!: string;

  @Index('IDX_payment_type', { unique: false })
  @Column({ type: 'varchar', default: 'in-person' })
  public readonly type!: PaymentType;

  @OneToMany(() => Transaction, transactions => transactions.payment)
  public readonly transactions!: Transaction[];
}
