import 'reflect-metadata';
import { Container } from 'typedi';
import { TOKENS } from './Tokens';
import { IProductRepository } from '../core/repositories/IProductRepository';
import { ProductRepository } from './repositories/ProductRepository';
import { IMessageBroker } from '../application/services/IMessageBroker';
import { KafkaMessageBroker } from './services/KafkaMessageBroker';
import { EventBus } from './services/EventBus';
import { CreateProductHandler } from '../application/commands/handlers/CreateProductHandler';
import { RestockProductHandler } from '../application/commands/handlers/RestockProductHandler';
import { SellProductHandler } from '../application/commands/handlers/SellProductHandler';
import { GetAllProductsQueryHandler } from './queries/handlers/GetAllProductsQueryHandler';
import { IProductService } from '../application/services/IProductService';
import { ProductService } from '../application/services/ProductService';

export function AddInfrastrucutre(): void {
  Container.set(TOKENS.IProductRepository, new ProductRepository());

  const messageBroker = new KafkaMessageBroker(['localhost:9092']);
  Container.set(TOKENS.IMessageBroker, messageBroker);

  const eventBus = new EventBus(messageBroker);
  Container.set(EventBus, eventBus);

  const productRepository = Container.get<IProductRepository>(TOKENS.IProductRepository);
  const productService = new ProductService(productRepository);
  Container.set(TOKENS.IProductService, productService);

  Container.set(
    TOKENS.CreateProductCommandHandler,
    new CreateProductHandler(productService, messageBroker)
  );
  Container.set(
    TOKENS.RestockProductCommandHandler,
    new RestockProductHandler(productService, messageBroker)
  );
  Container.set(
    TOKENS.SellProductCommandHandler,
    new SellProductHandler(productService, messageBroker)
  );

  Container.set(
    TOKENS.GetAllProductsQueryHandler,
    new GetAllProductsQueryHandler(productRepository)
  );
}
