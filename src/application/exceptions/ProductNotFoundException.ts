import { ApplicationException } from './ApplicationException';

export class ProductNotFoundException extends ApplicationException {
  constructor(productId: string) {
    super(`Product with ID: ${productId} was not found.`, 'PRODUCT_NOT_FOUND');
  }
}
