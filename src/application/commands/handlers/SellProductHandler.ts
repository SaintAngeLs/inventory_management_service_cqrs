import { ICommandHandler } from '../ICommandHandler';
import { SellProductCommand } from '../SellProductCommand';
import { IProductService } from '../../services/IProductService';
import { IMessageBroker } from '../../services/IMessageBroker';
import { ProductSoldEvent } from '../../events/ProductSoldEvent';

export class SellProductHandler implements ICommandHandler<SellProductCommand> {
  constructor(
    private readonly productService: IProductService,
    private readonly messageBroker: IMessageBroker
  ) {}

  async handleAsync(command: SellProductCommand): Promise<void> {
    const updatedProduct = await this.productService.sellProduct(
      command.productId,
      command.amount
    );

    const event = new ProductSoldEvent(
      updatedProduct.id,
      command.amount,
      updatedProduct.stock
    );
    await this.messageBroker.publishAsync('product.sold', event);
  }
}
