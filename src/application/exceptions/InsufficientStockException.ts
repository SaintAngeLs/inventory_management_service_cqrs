import { ApplicationException } from './ApplicationException';

export class InsufficientStockException extends ApplicationException {
  constructor(productId: string) {
    super(`Insufficient stock for product ID: ${productId}.`, 'INSUFFICIENT_STOCK');
  }
}
