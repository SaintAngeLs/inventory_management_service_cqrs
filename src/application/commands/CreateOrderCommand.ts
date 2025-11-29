import { ICommand } from './ICommand';

export class CreateOrderCommand implements ICommand {
  constructor(
    public readonly customerId: string,
    public readonly products: { productId: string; quantity: number }[]
  ) {}
}
