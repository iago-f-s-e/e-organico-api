import { Column, Entity, Index, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { maxSize } from '@src/domain/constants';
import { Address } from './address';
import { BaseEntity } from './base-entity';
import { Producer } from './producer';
import { Score } from './score';
import { Transaction } from './transaction';
import { IUser } from '@src/domain/interfaces';

@Entity('user')
@Index('IDX_user_phone_email_document', ['phone', 'email', 'document'], { unique: true })
export class User extends BaseEntity implements IUser {
  @PrimaryColumn({ type: 'uuid', name: 'user_id' })
  public readonly id!: string;

  @Column({ type: 'varchar', length: maxSize.USER_NAME })
  public readonly name!: string;

  @Index('IDX_user_phone', { unique: true })
  @Column({ type: 'varchar', length: maxSize.USER_PHONE, unique: true })
  public readonly phone!: string;

  @Index('IDX_user_email', { unique: true })
  @Column({ type: 'varchar', length: maxSize.USER_EMAIL, unique: true })
  public readonly email!: string;

  @Index('IDX_user_document', { unique: true })
  @Column({
    type: 'varchar',
    length: maxSize.USER_DOCUMENT,
    unique: true,
    select: false,
    update: false
  })
  public readonly document!: string;

  @Column({ type: 'varchar', select: false })
  public readonly password!: string;

  @Index('IDX_user_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true })
  public readonly isActive!: boolean;

  @OneToMany(() => Address, address => address.user, { cascade: true })
  public readonly address!: Address[];

  @OneToMany(() => Transaction, transactions => transactions.consumer)
  public readonly transactions!: Transaction[];

  @OneToOne(() => Producer, producer => producer.user, { cascade: true })
  public readonly producer!: Producer;

  @OneToOne(() => Score, score => score.user, { cascade: true })
  public readonly score!: Score;
}
