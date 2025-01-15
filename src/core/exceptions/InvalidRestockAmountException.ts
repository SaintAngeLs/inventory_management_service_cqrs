import { DomainException } from './DomainException';

export class InvalidRestockAmountException extends DomainException {
  constructor() {
    super('Restock amount must be greater than zero.', 'INVALID_RESTOCK_AMOUNT');
  }
}
