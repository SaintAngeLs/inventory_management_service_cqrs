import { ICommand } from './ICommand';

export class SellProductCommand implements ICommand {
  constructor(public readonly productId: string, public readonly amount: number) {}
}
