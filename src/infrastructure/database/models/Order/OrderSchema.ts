import mongoose, { Schema } from 'mongoose';
import { IOrderDocument } from './IOrderDocument';

const OrderSchema = new Schema<IOrderDocument>({
  customerId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
}, {
  timestamps: true,
});

OrderSchema.virtual('id').get(function (this: IOrderDocument) {
    return this._id.toHexString(); 
  });

export const OrderModel = mongoose.model<IOrderDocument>('Order', OrderSchema);
