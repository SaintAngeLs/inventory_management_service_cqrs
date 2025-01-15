import { AggregateRoot } from './AggregateRoot';
import { AggregateId } from './AggregateId';
import { ProductCreatedEvent } from '../events/ProductCreatedEvent';
import { InvalidPriceException } from '../exceptions/InvalidPriceException';
import { NegativeStockException } from '../exceptions/NegativeStockException';
import { InvalidRestockAmountException } from '../exceptions/InvalidRestockAmountException';
import { InvalidSellAmountException } from '../exceptions/InvalidSellAmountException';
import { InsufficientStockException } from '../exceptions/InsufficientStockException';
import { ProductRestockedEvent } from '../events/ProductRestockedEvent';
import { ProductSoldEvent } from '../events/ProductSoldEvent';

export class Product extends AggregateRoot {
  public name: string;
  public description: string;
  public price: number;
  public stock: number;

  private constructor(id: AggregateId, name: string, description: string, price: number, stock: number) {
    super(id);

    if (price <= 0) 
        throw new InvalidPriceException();

    if (stock < 0) 
        throw new NegativeStockException();

    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }

  public static create(id: AggregateId, name: string, description: string, price: number, stock: number): Product {
    const product = new Product(id, name, description, price, stock);
    product.addEvent(new ProductCreatedEvent(id, name, price, stock));

    return product;
  }

  public static recreate(id: AggregateId, name: string, description: string, price: number, stock: number): Product {
    return new Product(id, name, description, price, stock);
  }


  public restock(amount: number): void {
    if (amount <= 0) 
        throw new InvalidRestockAmountException();

    this.stock += amount;
    this.addEvent(new ProductRestockedEvent(this.id, amount, this.stock));
  }

  public sell(amount: number): void {
    if (amount <= 0) 
        throw new InvalidSellAmountException();

    if (this.stock < amount) 
        throw new InsufficientStockException();

    this.stock -= amount;
    this.addEvent(new ProductSoldEvent(this.id, amount, this.stock));
  }

  getDetails(): { name: string; description: string; price: number; stock: number } {
    return {
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
    };
  }
}
