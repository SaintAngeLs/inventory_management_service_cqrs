import { InvalidAggregateIdException } from '../exceptions/InvalidAggregateIdException';

export class AggregateId {
  public readonly value: string;

  constructor(value?: string) {
    if (value) {
      if (!this.isValidUUID(value)) {
        throw new InvalidAggregateIdException('Invalid aggregate ID format.');
      }
      this.value = value;
    } else {
      this.value = this.generateUUID();
    }
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  toString(): string {
    return this.value;
  }
}
