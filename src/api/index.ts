import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Container } from 'typedi';
import { AddInfrastrucutre } from '../infrastructure/Extensions';
import { TOKENS } from '../infrastructure/Tokens';
import { KafkaMessageBroker } from '../infrastructure/services/KafkaMessageBroker';
import routes from './routes';
import { config } from '../config';

export const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

export async function initializeConnections(): Promise<void> {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB successfully.');

    const kafkaBroker = Container.get<KafkaMessageBroker>(TOKENS.IMessageBroker);
    await kafkaBroker.connect();
    console.log('Connected to Kafka successfully.');
  } catch (error) {
    console.error('Error initializing connections:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  (async () => {
    AddInfrastrucutre();
    await initializeConnections();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    process.on('SIGINT', async () => {
      console.log('Shutting down gracefully...');
      const kafkaBroker = Container.get<KafkaMessageBroker>(TOKENS.IMessageBroker);
      await kafkaBroker.disconnect();
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB and Kafka.');
      process.exit(0);
    });
  })();
}
