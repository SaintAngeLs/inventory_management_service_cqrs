import { Token } from 'typedi';
import { IProductRepository, IOrderRepository } from '../core';
import {
  CreateProductCommand,
  GetAllProductsQuery,
  IProductService,
  RestockProductCommand,
  SellProductCommand,
} from '../application';
import { IMessageBroker } from '../application';
import { EventBus } from './services/EventBus';
import { ICommandHandler } from '../application/commands/ICommandHandler';
import { IQueryHandler } from './queries/handlers/IQueryHandler';
import { IOrderService } from '../application/services/IOrderService';
import { CreateOrderCommand } from '../application/commands/CreateOrderCommand';

export const TOKENS = {
  IProductRepository: new Token<IProductRepository>('IProductRepository'),
  IOrderRepository: new Token<IOrderRepository>('IOrderRepository'), 
  IProductService: new Token<IProductService>('IProductService'),
  IOrderService: new Token<IOrderService>('IOrderService'),
  IMessageBroker: new Token<IMessageBroker>('IMessageBroker'),
  EventBus: new Token<EventBus>('EventBus'),
  CreateProductCommandHandler: new Token<ICommandHandler<CreateProductCommand>>('CreateProductCommandHandler'),
  RestockProductCommandHandler: new Token<ICommandHandler<RestockProductCommand>>('RestockProductCommandHandler'),
  SellProductCommandHandler: new Token<ICommandHandler<SellProductCommand>>('SellProductCommandHandler'),
  CreateOrderCommandHandler: new Token<ICommandHandler<CreateOrderCommand>>('CreateOrderCommandHandler'),
  GetAllProductsQueryHandler: new Token<IQueryHandler<GetAllProductsQuery, any>>('GetAllProductsQueryHandler'),
};
