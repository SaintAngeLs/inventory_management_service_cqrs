import { DomainException } from './DomainException';

export class InvalidSellAmountException extends DomainException {
  constructor() {
    super('Sell amount must be greater than zero.', 'INVALID_SELL_AMOUNT');
  }
}
