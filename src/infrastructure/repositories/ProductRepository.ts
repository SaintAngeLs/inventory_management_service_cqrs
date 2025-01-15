import { IProductRepository } from '../../core/repositories/IProductRepository';
import { Product } from '../../core/entities/Product';
import { ProductModel } from '../database/models/Product/ProductSchema';
import { RepositoryExtensions } from './RepositoryExtensions';


export class ProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    const document = await ProductModel.findById(id);

    return document ? RepositoryExtensions.asEntity(document) : null;
  }

  async findByName(name: string): Promise<Product | null> {
    const document = await ProductModel.findOne({ name });

    return document ? RepositoryExtensions.asEntity(document) : null;
  }

  async findAll(): Promise<Product[]> {
    const documents = await ProductModel.find();

    return documents.map(RepositoryExtensions.asEntity);
  }

  async save(entity: Product): Promise<void> {
    const document = new ProductModel(RepositoryExtensions.asDocument(entity));
    
    await document.save();
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.findByIdAndUpdate(
      entity.id.value,
      RepositoryExtensions.asDocument(entity),
      { new: true }
    );
  }

  async delete(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id);
  }
}
