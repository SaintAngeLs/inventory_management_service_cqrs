import { IEvent, IEventHandler } from "../../application";
import { IMessageBroker } from "../../application/services/IMessageBroker";

export class EventBus {
  private handlers: Map<string, IEventHandler<IEvent>[]> = new Map();

  constructor(private readonly messageBroker: IMessageBroker) {}

  register<TEvent extends IEvent>(eventType: string, handler: IEventHandler<TEvent>): void {
    const handlers = this.handlers.get(eventType) || [];
    handlers.push(handler as IEventHandler<IEvent>);
    this.handlers.set(eventType, handlers);
  }

  async registerAsync<TEvent extends IEvent>(eventType: string, handler: IEventHandler<TEvent>): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.register(eventType, handler);
  }

  async publish<TEvent extends IEvent>(event: TEvent): Promise<void> {
    const handlers = this.handlers.get(event.constructor.name) || [];
    for (const handler of handlers) {
      await handler.handle(event);
    }

    await this.messageBroker.publishAsync(event.constructor.name, event);
  }

  async publishAsync<TEvent extends IEvent>(event: TEvent): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await this.publish(event);
  }

  async subscribeAsync<TEvent extends IEvent>(
    eventType: string,
    handler: IEventHandler<TEvent>
  ): Promise<void> {
    await this.registerAsync(eventType, handler);

    await this.messageBroker.subscribeAsync(eventType, async (message) => {
      const handlers = this.handlers.get(eventType) || [];
      for (const handler of handlers) {
        await handler.handle(message as TEvent);
      }
    });
  }
}
