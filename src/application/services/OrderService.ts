import { IOrderService } from './IOrderService';
import { IOrderRepository } from '../../core/repositories/IOrderRepository';
import { OrderDto } from '../dto/OrderDto';
import { Order } from '../../core/entities/Order';
import { AggregateId } from '../../core/entities/AggregateId';

export class OrderService implements IOrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async createOrder(
    customerId: string,
    products: { productId: string; quantity: number; price: number }[]
  ): Promise<OrderDto> {
    const totalAmount = products.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const order = Order.create(new AggregateId(), customerId, products, totalAmount);

    await this.orderRepository.save(order);

    return new OrderDto(
      order.id.value,
      order.getCustomerId(),
      order.getProducts(),
      order.getTotalAmount(),
      new Date()
    );
  }

  async getOrdersByCustomer(customerId: string): Promise<OrderDto[]> {
    const orders = await this.orderRepository.findByCustomerId(customerId);

    return orders.map(
      (order) =>
        new OrderDto(
          order.id.value,
          order.getCustomerId(),
          order.getProducts(),
          order.getTotalAmount(),
          new Date()
        )
    );
  }

  async getAllOrders(): Promise<OrderDto[]> {
    const orders = await this.orderRepository.findAll();

    return orders.map(
      (order) =>
        new OrderDto(
          order.id.value,
          order.getCustomerId(),
          order.getProducts(),
          order.getTotalAmount(),
          new Date()
        )
    );
  }
}
