import mongoose, { Schema, Document } from 'mongoose';
import { IProductDocument } from './IProductDocument';

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true, maxlength: 50 },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

ProductSchema.virtual('id').get(function (this: IProductDocument) {
  return this._id.toHexString(); 
});

export const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);
