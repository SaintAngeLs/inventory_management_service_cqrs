import { OrderDto } from '../dto/OrderDto';

export interface IOrderService {
  createOrder(customerId: string, products: { productId: string; quantity: number }[]): Promise<OrderDto>;
  getOrdersByCustomer(customerId: string): Promise<OrderDto[]>;
  getAllOrders(): Promise<OrderDto[]>;
}
