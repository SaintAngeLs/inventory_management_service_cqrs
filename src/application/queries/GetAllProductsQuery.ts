import { IQuery } from './IQuery';

export class GetAllProductsQuery implements IQuery {
  constructor(
    public readonly page: number = 1,
    public readonly pageSize: number = 10,
    public readonly sortBy: string = 'name', 
    public readonly sortDirection: 'asc' | 'desc' = 'asc'
  ) {}
}
