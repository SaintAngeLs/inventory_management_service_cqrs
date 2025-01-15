import { IDomainEvent } from './IDomainEvent';
import { AggregateId } from '../entities/AggregateId';

export class ProductDeletedEvent implements IDomainEvent {
  public readonly occurredOn: Date;
  public readonly productId: AggregateId;

  constructor(productId: AggregateId) {
    this.occurredOn = new Date();
    this.productId = productId;
  }
}
