import { AggregateId } from './AggregateId';
import { IDomainEvent } from '../events/IDomainEvent';

export abstract class AggregateRoot {
  private readonly _events: IDomainEvent[] = [];
  public readonly id: AggregateId;
  public version: number;

  constructor(id: AggregateId, version: number = 0) {
    this.id = id;
    this.version = version;
  }

  protected addEvent(event: IDomainEvent): void {
    this._events.push(event);
  }

  public get events(): IDomainEvent[] {
    return this._events;
  }

  public clearEvents(): void {
    this._events.length = 0;
  }
}
