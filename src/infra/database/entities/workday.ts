import { IWorkday } from '@src/domain/interfaces';
import { Weekday } from '@src/types/entities';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Market } from './market';
import { Transaction } from './transaction';

@Entity('workday')
@Index('IDX_market_weekday', ['marketId', 'weekday'], { unique: true })
export class Workday extends BaseEntity implements IWorkday {
  @PrimaryColumn({ type: 'uuid', name: 'workday_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'market_id' })
  public readonly marketId!: string;

  @Column({ type: 'varchar' })
  public readonly weekday!: Weekday;

  @Column({ type: 'varchar' })
  public readonly opening!: string;

  @Column({ type: 'varchar' })
  public readonly closing!: string;

  @Index('IDX_workday_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true })
  public readonly isActive!: boolean;

  @ManyToOne(() => Market, market => market.workdays, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'market_id', referencedColumnName: 'id' })
  public readonly market!: Market;

  @OneToMany(() => Transaction, transaction => transaction.selectedDay)
  public readonly transactions!: Transaction[];
}
