import { IDomainEvent } from './IDomainEvent';
import { AggregateId } from '../entities/AggregateId';

export class OrderCreatedEvent implements IDomainEvent {
  public readonly occurredOn: Date;

  constructor(
    public readonly orderId: AggregateId,
    public readonly customerId: string,
    public readonly products: { productId: string; quantity: number }[],
    public readonly totalAmount: number
  ) {
    this.occurredOn = new Date();
  }
}
