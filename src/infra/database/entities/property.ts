import { IProperty } from '@src/domain/interfaces';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Address } from './address';
import { BaseEntity } from './base-entity';
import { Producer } from './producer';

@Entity('property')
@Index('IDX_producer_property_name', ['name', 'producerId'], { unique: true })
export class Property extends BaseEntity implements IProperty {
  @PrimaryColumn({ type: 'uuid', name: 'property_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'producer_id' })
  public readonly producerId!: string;

  @Column({ type: 'varchar' })
  public readonly name!: string;

  @Index('IDX_property_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true })
  public readonly isActive!: boolean;

  @ManyToOne(() => Producer, producer => producer.properties, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'producer_id', referencedColumnName: 'id' })
  public readonly producer!: Producer;

  @OneToOne(() => Address, address => address.property)
  public readonly address!: Address;
}
