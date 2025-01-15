import { IQuery } from "../../../application";

export interface IQueryHandler<TQuery extends IQuery, TResult> {
    execute(query: TQuery): Promise<TResult>;
  }
  