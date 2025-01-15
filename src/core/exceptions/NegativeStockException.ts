import { DomainException } from './DomainException';

export class NegativeStockException extends DomainException {
  constructor() {
    super('Stock cannot be negative.', 'NEGATIVE_STOCK');
  }
}
