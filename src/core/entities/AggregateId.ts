import { Types } from 'mongoose';
import { InvalidAggregateIdException } from '../exceptions/InvalidAggregateIdException';

export class AggregateId {
  public readonly value: string;

  constructor(value?: string) {
    if (value) {
      if (!Types.ObjectId.isValid(value)) {
        throw new InvalidAggregateIdException('Invalid aggregate ID format.');
      }
      this.value = value;
    } else {
      this.value = new Types.ObjectId().toHexString();
    }
  }

  toString(): string {
    return this.value;
  }
}
