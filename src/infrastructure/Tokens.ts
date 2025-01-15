import { Token } from 'typedi';
import { IProductRepository } from '../core';
import { CreateProductCommand, GetAllProductsQuery, IProductService, RestockProductCommand, SellProductCommand } from '../application';
import { IMessageBroker } from '../application';
import { EventBus } from './services/EventBus';
import { ICommandHandler } from '../application/commands/ICommandHandler';
import { IQueryHandler } from './queries/handlers/IQueryHandler';

export const TOKENS = {
    IProductRepository: new Token<IProductRepository>('IProductRepository'),
    IProductService: new Token<IProductService>('IProductService'),
    IMessageBroker: new Token<IMessageBroker>('IMessageBroker'),
    EventBus: new Token<EventBus>('EventBus'),
    CreateProductCommandHandler: new Token<ICommandHandler<CreateProductCommand>>('CreateProductCommandHandler'),
    RestockProductCommandHandler: new Token<ICommandHandler<RestockProductCommand>>('RestockProductCommandHandler'),
    SellProductCommandHandler: new Token<ICommandHandler<SellProductCommand>>('SellProductCommandHandler'),
    GetAllProductsQueryHandler: new Token<IQueryHandler<GetAllProductsQuery, any>>('GetAllProductsQueryHandler'),
  };