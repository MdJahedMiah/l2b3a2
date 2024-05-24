import { Request, Response } from 'express';
import { OrderModel } from '../models/order';
import { ProductModel } from '../models/product';
import { orderSchema } from '../validators/order';


const handleError = (err: unknown, res: Response) => {
  if (err instanceof Error) {
    res.status(500).json({ success: false, message: err.message });
  } else {
    res.status(500).json({ success: false, message: 'An unknown error occurred' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { error } = orderSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  const { productId, quantity } = req.body;

  try {
    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    if (product.inventory.quantity < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient quantity available in inventory' });
    }

    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    const order = new OrderModel(req.body);
    await order.save();

    res.status(201).json({ success: true, message: 'Order created successfully!', data: order });
  } catch (err) {
    handleError(err, res);
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json({ success: true, message: 'Orders fetched successfully!', data: orders });
  } catch (err) {
    handleError(err, res);
  }
};

export const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const orders = await OrderModel.find({ email });
    res.status(200).json({ success: true, message: 'Orders fetched successfully for user email!', data: orders });
  } catch (err) {
    handleError(err, res);
  }
};
