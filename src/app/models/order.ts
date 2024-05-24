import { Schema, model } from 'mongoose';

interface Order {
  email: string;
  productId: Schema.Types.ObjectId;
  price: number;
  quantity: number;
}

const orderSchema = new Schema<Order>({
  email: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

export const OrderModel = model<Order>('Order', orderSchema);
