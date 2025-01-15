import { DomainException } from './DomainException';

export class InvalidAggregateIdException extends DomainException {
  constructor(message: string = 'Invalid aggregate ID.') {
    super(message, 'INVALID_AGGREGATE_ID');
  }
}
