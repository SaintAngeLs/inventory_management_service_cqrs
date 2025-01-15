import { RestockProductCommand } from '../RestockProductCommand';
import { ICommandHandler } from '../ICommandHandler';
import { IProductService } from '../../services/IProductService';
import { IMessageBroker } from '../../services/IMessageBroker';
import { ProductRestockedEvent } from '../../events/ProductRestockedEvent';

export class RestockProductHandler implements ICommandHandler<RestockProductCommand> {
  constructor(
    private readonly productService: IProductService,
    private readonly messageBroker: IMessageBroker
  ) {}

  async handleAsync(command: RestockProductCommand): Promise<void> {
    const updatedProduct = await this.productService.restockProduct(
      command.productId,
      command.amount
    );

    const event = new ProductRestockedEvent(
      updatedProduct.id,
      command.amount,
      updatedProduct.stock
    );
    await this.messageBroker.publishAsync('product.restocked', event);
  }
}
