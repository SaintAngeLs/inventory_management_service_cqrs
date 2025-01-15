import { IEvent } from './IEvent';

export class ProductSoldEvent implements IEvent {
  constructor(
    public readonly productId: string,
    public readonly soldAmount: number,
    public readonly remainingStock: number,
    public readonly timestamp: Date = new Date()
  ) {}
}
