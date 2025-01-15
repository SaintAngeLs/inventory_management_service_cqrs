import { Kafka, Consumer, Producer, logLevel } from 'kafkajs';
import { IMessageBroker } from '../../application/services/IMessageBroker';
import { Logger } from '../logging/Logger';

export class KafkaMessageBroker implements IMessageBroker {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(brokerList: string[]) {
    this.kafka = new Kafka({
      clientId: 'inventory-service',
      brokers: brokerList,
      logLevel: logLevel.INFO,
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'inventory-service-group' });
  }

  async connect(): Promise<void> {
    await this.producer.connect();
    Logger.info('Kafka producer connected.');
    await this.consumer.connect();
    Logger.info('Kafka consumer connected.');
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    Logger.info('Kafka producer disconnected.');
    await this.consumer.disconnect();
    Logger.info('Kafka consumer disconnected.');
  }

  async publishAsync(topic: string, message: object): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
      Logger.info(`Message published to topic "${topic}": ${JSON.stringify(message)}`);
    } catch (error) {
      Logger.error('Error publishing message:', error as Error);
      throw error;
    }
  }

  async subscribeAsync(topic: string, callback: (message: any) => Promise<void>): Promise<void> {
    await this.consumer.subscribe({ topic, fromBeginning: true });

    this.consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const parsedMessage = JSON.parse(message.value?.toString() || '{}');
          await callback(parsedMessage);
          Logger.info(`Message processed from topic "${topic}": ${JSON.stringify(parsedMessage)}`);
        } catch (error) {
          Logger.error('Error processing message:', error as Error);
        }
      },
    });
  }
}
