import { Product } from '../../core/entities/Product';
import { AggregateId } from '../../core/entities/AggregateId';
import { ProductDto } from '../../application/dto/ProductDto';
import { IProductDocument } from '../database/models/Product/IProductDocument';
import { Types } from 'mongoose';

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
      _id: new Types.ObjectId(entity.id.value),
      name: entity.name,
      description: entity.description,
      price: entity.price,
      stock: entity.stock,
    };
  }
}
