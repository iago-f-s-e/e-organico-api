import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user';
import { maxSize } from '@src/domain/constants';
import { Market } from './market';
import { Property } from './property';
import { Transaction } from './transaction';
import { StringOrNil } from '@src/types/global';
import { IAddress } from '@src/domain/interfaces';

@Entity('address')
export class Address extends BaseEntity implements IAddress {
  @PrimaryColumn({ type: 'uuid', name: 'address_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'user_id', nullable: true, update: false, select: false })
  public readonly userId!: string;

  @Column({ type: 'uuid', name: 'market_id', nullable: true, update: false, select: false })
  public readonly marketId!: string;

  @Column({ type: 'uuid', name: 'property_id', nullable: true, update: false, select: false })
  public readonly propertyId!: string;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_STATE })
  public readonly state!: string;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_CITY })
  public readonly city!: string;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_DISTRICT })
  public readonly district!: string;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_STREET, nullable: true })
  public readonly street: StringOrNil;

  @Column({ type: 'varchar', name: 'zip_code', length: maxSize.ADDRESS_ZIP_CODE, nullable: true })
  public readonly zipCode: StringOrNil;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_COMPLEMENT, nullable: true })
  public readonly complement: StringOrNil;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_LAT, nullable: true })
  public readonly lat: StringOrNil;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_LONG, nullable: true })
  public readonly long: StringOrNil;

  @Column({ type: 'varchar', nullable: true })
  public readonly number: StringOrNil;

  @ManyToOne(() => User, user => user.address, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public readonly user!: User;

  @OneToOne(() => Market, market => market.address, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'market_id', referencedColumnName: 'id' })
  public readonly market!: Market;

  @OneToMany(() => Transaction, transaction => transaction.address)
  public readonly transactions!: Transaction[];

  @OneToOne(() => Property, property => property.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'property_id', referencedColumnName: 'id' })
  public readonly property!: Property;
}
