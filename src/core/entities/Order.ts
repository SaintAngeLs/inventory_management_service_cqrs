import { AggregateRoot } from './AggregateRoot';
import { AggregateId } from './AggregateId';
import { OrderCreatedEvent } from '../events/OrderCreatedEvent';

export class Order extends AggregateRoot {
  private customerId: string;
  private products: { productId: string; quantity: number; price: number }[];
  private totalAmount: number;

  private constructor(
    id: AggregateId,
    customerId: string,
    products: { productId: string; quantity: number; price: number }[],
    totalAmount: number
  ) {
    super(id);
    this.customerId = customerId;
    this.products = products;
    this.totalAmount = totalAmount;
  }

  public static create(
    id: AggregateId,
    customerId: string,
    products: { productId: string; quantity: number; price: number }[],
    totalAmount: number
  ): Order {
    const order = new Order(id, customerId, products, totalAmount);
    order.addEvent(new OrderCreatedEvent(id, customerId, products, totalAmount));
    return order;
  }

  public getCustomerId(): string {
    return this.customerId;
  }

  public getProducts(): { productId: string; quantity: number; price: number }[] {
    return this.products;
  }

  public getTotalAmount(): number {
    return this.totalAmount;
  }
}
