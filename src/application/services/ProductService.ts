import { IProductRepository } from '../../core/repositories/IProductRepository';
import { Product } from '../../core/entities/Product';
import { AggregateId } from '../../core/entities/AggregateId';
import { ProductDto } from '../dto/ProductDto';
import { IProductService } from './IProductService';
import { ProductNotFoundException } from '../exceptions/ProductNotFoundException';

export class ProductService implements IProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async getAllProducts(): Promise<ProductDto[]> {
    const products = await this.productRepository.findAll();
    return products.map(
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

  async createProduct(name: string, description: string, price: number, stock: number): Promise<ProductDto> {
    const newProduct = Product.create(new AggregateId(), name, description, price, stock);
    await this.productRepository.save(newProduct);

    return new ProductDto(
      newProduct.id.value,
      newProduct.name,
      newProduct.description,
      newProduct.price,
      newProduct.stock
    );
  }

  async restockProduct(productId: string, amount: number): Promise<ProductDto> {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new ProductNotFoundException(productId);

    product.restock(amount);
    await this.productRepository.update(product);

    return new ProductDto(
      product.id.value,
      product.name,
      product.description,
      product.price,
      product.stock
    );
  }

  async sellProduct(productId: string, amount: number): Promise<ProductDto> {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new ProductNotFoundException(productId);

    product.sell(amount);
    await this.productRepository.update(product);

    return new ProductDto(
      product.id.value,
      product.name,
      product.description,
      product.price,
      product.stock
    );
  }

  async findProductById(productId: string): Promise<ProductDto> {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new ProductNotFoundException(productId);

    return new ProductDto(
      product.id.value,
      product.name,
      product.description,
      product.price,
      product.stock
    );
  }
}
