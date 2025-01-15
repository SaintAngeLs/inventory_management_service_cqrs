import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory',
  KAFKA_BROKER: process.env.KAFKA_BROKER || 'localhost:9092',
};
