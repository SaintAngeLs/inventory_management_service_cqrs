import { IEvent } from './IEvent';

export class ProductRestockedEvent implements IEvent {
  constructor(
    public readonly productId: string,
    public readonly restockAmount: number,
    public readonly newStockLevel: number,
    public readonly timestamp: Date = new Date()
  ) {}
}
