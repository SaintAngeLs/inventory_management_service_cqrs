import { Service } from 'typedi';
import { IQueryHandler } from './IQueryHandler';
import { GetAllProductsQuery } from '../../../application/queries/GetAllProductsQuery';
import { IProductRepository } from '../../../core/repositories/IProductRepository';
import { ProductDto } from '../../../application/dto/ProductDto';
import { Product } from '../../../core/entities/Product';

@Service()
export class GetAllProductsQueryHandler implements IQueryHandler<GetAllProductsQuery, ProductDto[]> {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(query: GetAllProductsQuery): Promise<ProductDto[]> {
    const { page, pageSize, sortBy, sortDirection } = query;

    let products = await this.productRepository.findAll();

    products = products.sort((a, b) => {
      const fieldA = a[sortBy as keyof Product];
      const fieldB = b[sortBy as keyof Product];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }
      return 0;
    });

    const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);

    return paginatedProducts.map(
      (product) =>
        new ProductDto(
          product.id.value,
          product.name,
          product.description,
          product.price,
          product.stock
        )
    );
  }
}
