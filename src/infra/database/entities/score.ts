import { IScore } from '@src/domain/interfaces';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Market } from './market';
import { ProducerProduct } from './producer-product';
import { User } from './user';

@Entity('score')
export class Score extends BaseEntity implements IScore {
  @PrimaryColumn({ type: 'uuid', name: 'score_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'user_id', nullable: true, update: false, select: false })
  public readonly userId!: string;

  @Column({ type: 'uuid', name: 'market_id', nullable: true, update: false, select: false })
  public readonly marketId!: string;

  @Column({
    type: 'uuid',
    name: 'producer_product_id',
    nullable: true,
    update: false,
    select: false
  })
  public readonly producerProductId!: string;

  @Column({ type: 'int', default: 0 })
  public readonly transactions!: number;

  @Column({ type: 'float', default: 0 })
  public readonly rating!: number;

  @Column({ type: 'int', default: 0 })
  public readonly ratingQuantity!: number;

  @Column({ type: 'int', default: 0 })
  public readonly totalRating!: number;

  @OneToOne(() => User, user => user.score, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public readonly user!: User;

  @OneToOne(() => Market, market => market.score, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'market_id', referencedColumnName: 'id' })
  public readonly market!: Market;

  @OneToOne(() => ProducerProduct, producerProduct => producerProduct.score, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'producer_product_id', referencedColumnName: 'id' })
  public readonly producerProduct!: ProducerProduct;
}
