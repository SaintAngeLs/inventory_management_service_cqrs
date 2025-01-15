export interface IMessageBroker {
    publishAsync(topic: string, message: object): Promise<void>;
    subscribeAsync(topic: string, callback: 
        (message: any) => Promise<void>): Promise<void>;
  }
  