import { Types } from 'mongoose';
import { Document, Schema } from 'mongoose';

export interface IOrderDocument extends Document {
  _id: Types.ObjectId;
  customerId: string;
  products: { productId: string; quantity: number; price: number }[];
  totalAmount: number;
}
