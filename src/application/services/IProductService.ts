import { ProductDto } from '../dto/ProductDto';

export interface IProductService {
  getAllProducts(): Promise<ProductDto[]>;
  createProduct(name: string, description: string, price: number, stock: number): Promise<ProductDto>;
  restockProduct(productId: string, amount: number): Promise<ProductDto>; 
  sellProduct(productId: string, amount: number): Promise<ProductDto>;    
  findProductById(productId: string): Promise<ProductDto>;
}
