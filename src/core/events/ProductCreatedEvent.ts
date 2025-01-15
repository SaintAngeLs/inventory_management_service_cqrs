import { IDomainEvent } from './IDomainEvent';
import { AggregateId } from '../entities/AggregateId';

export class ProductCreatedEvent implements IDomainEvent {
  public readonly occurredOn: Date;
  public readonly productId: AggregateId;
  public readonly name: string;
  public readonly price: number;
  public readonly stock: number;

  constructor(productId: AggregateId, name: string, price: number, stock: number) {
    this.occurredOn = new Date();
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}
