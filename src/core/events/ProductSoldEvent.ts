import { IDomainEvent } from './IDomainEvent';
import { AggregateId } from '../entities/AggregateId';

export class ProductSoldEvent implements IDomainEvent {
  public readonly occurredOn: Date;
  public readonly productId: AggregateId;
  public readonly soldAmount: number;
  public readonly remainingStock: number;

  constructor(productId: AggregateId, soldAmount: number, remainingStock: number) {
    this.occurredOn = new Date();
    this.productId = productId;
    this.soldAmount = soldAmount;
    this.remainingStock = remainingStock;
  }
}
