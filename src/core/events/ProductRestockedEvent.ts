import { IDomainEvent } from './IDomainEvent';
import { AggregateId } from '../entities/AggregateId';

export class ProductRestockedEvent implements IDomainEvent {
  public readonly occurredOn: Date;
  public readonly productId: AggregateId;
  public readonly restockAmount: number;
  public readonly newStockLevel: number;

  constructor(productId: AggregateId, restockAmount: number, newStockLevel: number) {
    this.occurredOn = new Date();
    this.productId = productId;
    this.restockAmount = restockAmount;
    this.newStockLevel = newStockLevel;
  }
}
