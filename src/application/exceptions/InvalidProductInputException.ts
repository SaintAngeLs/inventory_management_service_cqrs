import { ApplicationException } from './ApplicationException';

export class InvalidProductInputException extends ApplicationException {
  constructor(message: string) {
    super(message, 'INVALID_PRODUCT_INPUT');
  }
}
