import { Product } from '../../core/entities/Product';
import { AggregateId } from '../../core/entities/AggregateId';
import { ProductDto } from '../../application/dto/ProductDto';
import { IProductDocument } from '../database/models/Product/IProductDocument';
import { Types } from 'mongoose';
import { Order } from '../../core/entities/Order';
import { OrderDto } from '../../application/dto/OrderDto';
import { IOrderDocument } from '../database/models/Order/IOrderDocument';

export class RepositoryExtensions {
  static asEntity(document: IProductDocument): Product {
    return Product.recreate(
      new AggregateId(document._id.toString()),
      document.name,
      document.description,
      document.price,
      document.stock
    );
  }

  static asDto(entity: Product): ProductDto {
    return new ProductDto(
      entity.id.value,
      entity.name,
      entity.description,
      entity.price,
      entity.stock
    );
  }

  static asDocument(entity: Product): Partial<IProductDocument> {
    return {
      _id: Types.ObjectId.isValid(entity.id.value) ? new Types.ObjectId(entity.id.value) : undefined,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      stock: entity.stock,
    };
  }

  static asOrderEntity(document: IOrderDocument): Order {
    return Order.create(
      new AggregateId(document._id.toString()),
      document.customerId,
      document.products,
      document.totalAmount
    );
  }

  static asOrderDto(entity: Order): OrderDto {
    return new OrderDto(
      entity.id.value,
      entity.getCustomerId(),
      entity.getProducts(),
      entity.getTotalAmount(),
      new Date()
    );
  }

  static asOrderDocument(entity: Order): Partial<IOrderDocument> {
    return {
      _id: Types.ObjectId.isValid(entity.id.value) ? new Types.ObjectId(entity.id.value) : new Types.ObjectId(),
      customerId: entity.getCustomerId(),
      products: entity.getProducts(),
      totalAmount: entity.getTotalAmount(),
    };
  }
}
