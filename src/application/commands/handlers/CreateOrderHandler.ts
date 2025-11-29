import { OrderCreatedEvent } from "../../events/OrderCreatedEvent";
import { IMessageBroker } from "../../services/IMessageBroker";
import { IOrderService } from "../../services/IOrderService";
import { IProductService } from "../../services/IProductService";
import { CreateOrderCommand } from "../CreateOrderCommand";
import { ICommandHandler } from "../ICommandHandler";
import { ProductNotFoundException } from "../../exceptions/ProductNotFoundException";

export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderService: IOrderService,
    private readonly productService: IProductService,
    private readonly messageBroker: IMessageBroker
  ) {}

  async handleAsync(command: CreateOrderCommand): Promise<void> {
    const { customerId, products } = command;

    const productsWithPrice = [];
    for (const product of products) {
      const productDetails = await this.productService.findProductById(product.productId);

      if (!productDetails) {
        throw new ProductNotFoundException(product.productId);
      }

      if (productDetails.stock < product.quantity) {
        throw new Error(`Insufficient stock for product ID: ${product.productId}`);
      }

      productsWithPrice.push({
        ...product,
        price: productDetails.price,
      });

      await this.productService.sellProduct(product.productId, product.quantity);
    }

    const orderDto = await this.orderService.createOrder(customerId, productsWithPrice);

    const event = new OrderCreatedEvent(
      orderDto.id,
      orderDto.customerId,
      orderDto.products,
      orderDto.totalAmount,
      new Date()
    );

    await this.messageBroker.publishAsync('order.created', event);
  }
}
