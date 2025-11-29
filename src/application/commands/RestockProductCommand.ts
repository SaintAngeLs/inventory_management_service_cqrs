import { ICommand } from './ICommand';

export class RestockProductCommand implements ICommand {
  constructor(
    public readonly productId: string,
    public readonly amount: number
  ) {}
}
