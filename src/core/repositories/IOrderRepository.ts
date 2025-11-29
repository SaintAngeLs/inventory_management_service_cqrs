import { Order } from '../entities/Order';
import { IBaseRepository } from './IBaseRepository';

export interface IOrderRepository extends IBaseRepository<Order> {
  findByCustomerId(customerId: string): Promise<Order[]>;
  findAll(): Promise<Order[]>;
}
