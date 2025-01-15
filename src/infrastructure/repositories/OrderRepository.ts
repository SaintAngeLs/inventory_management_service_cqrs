import { IOrderRepository } from '../../core/repositories/IOrderRepository';
import { Order } from '../../core/entities/Order';
import { RepositoryExtensions } from './RepositoryExtensions';
import { OrderModel } from '../database/models/Order/OrderSchema';

export class OrderRepository implements IOrderRepository {
  async findById(id: string): Promise<Order | null> {
    const document = await OrderModel.findById(id);

    return document ? RepositoryExtensions.asOrderEntity(document) : null;
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    const documents = await OrderModel.find({ customerId });

    return documents.map(RepositoryExtensions.asOrderEntity);
  }

  async findAll(): Promise<Order[]> {
    const documents = await OrderModel.find();

    return documents.map(RepositoryExtensions.asOrderEntity);
  }

  async save(entity: Order): Promise<void> {
    const document = new OrderModel(RepositoryExtensions.asOrderDocument(entity));
    
    await document.save();
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.findByIdAndUpdate(
      entity.id.value,
      RepositoryExtensions.asOrderDocument(entity),
      { new: true }
    );
  }

  async delete(id: string): Promise<void> {
    await OrderModel.findByIdAndDelete(id);
  }
}
