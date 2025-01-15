import { IEvent } from './IEvent';

export class OrderCreatedEvent implements IEvent {
  constructor(
    public readonly orderId: string,
    public readonly customerId: string,
    public readonly products: { productId: string; quantity: number }[],
    public readonly totalAmount: number,
    public readonly timestamp: Date = new Date()
  ) {}
}
