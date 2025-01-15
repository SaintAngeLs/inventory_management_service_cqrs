import { DomainException } from './DomainException';

export class InvalidPriceException extends DomainException {
  constructor() {
    super('Price must be greater than zero.', 'INVALID_PRICE');
  }
}
