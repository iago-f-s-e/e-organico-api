import { IProducerMarket } from '@src/domain/interfaces';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Market } from './market';
import { Producer } from './producer';

@Entity('producer_market')
export class ProducerMarket implements IProducerMarket {
  @PrimaryColumn({ type: 'uuid', name: 'producer_id' })
  public readonly producerId!: string;

  @PrimaryColumn({ type: 'uuid', name: 'market_id' })
  public readonly marketId!: string;

  @Index('IDX_producer_market_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true })
  public readonly isActive!: boolean;

  @ManyToOne(() => Market, market => market.producerMarkets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'market_id', referencedColumnName: 'id' })
  public readonly market!: Market;

  @ManyToOne(() => Producer, producer => producer.producerMarkets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'producer_id', referencedColumnName: 'id' })
  public readonly producer!: Producer;
}
