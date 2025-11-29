import { Document, Types } from 'mongoose';

export interface IProductDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  stock: number;
}
