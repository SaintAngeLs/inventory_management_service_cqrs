import { IEvent } from "./IEvent";

export interface IEventHandler<TEvent extends IEvent> {
    handle(event: TEvent): Promise<void>;
}
  