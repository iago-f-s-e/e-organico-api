import { BeforeInsert } from 'typeorm';
import { randomUUID } from 'crypto';

export class BaseEntity {
  public id!: string;

  @BeforeInsert()
  private setId(): void {
    this.id = randomUUID();
  }
}
