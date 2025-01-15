import { IEvent } from './IEvent';

export class ProductCreatedEvent implements IEvent {
  public readonly timestamp: Date;

  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly stock: number,
    timestamp?: Date
  ) {
    this.timestamp = timestamp || new Date();
  }
}
