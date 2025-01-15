import { Product } from '../entities/Product';
import { IBaseRepository } from './IBaseRepository';

export interface IProductRepository extends IBaseRepository<Product> {
  findByName(name: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
}
