import { CreateProductCommand } from '../CreateProductCommand';
import { ICommandHandler } from '../ICommandHandler';
import { IProductService } from '../../services/IProductService';
import { IMessageBroker } from '../../services/IMessageBroker';
import { ProductCreatedEvent } from '../../events/ProductCreatedEvent';

export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    private readonly productService: IProductService,
    private readonly messageBroker: IMessageBroker
  ) {}

  async handleAsync(command: CreateProductCommand): Promise<void> {
    const product = await this.productService.createProduct(
      command.name,
      command.description,
      command.price,
      command.stock
    );

    const event = new ProductCreatedEvent(
      product.id,
      product.name,
      product.description,
      product.price,
      product.stock
    );

    await this.messageBroker.publishAsync('product.created', event);
  }
}
