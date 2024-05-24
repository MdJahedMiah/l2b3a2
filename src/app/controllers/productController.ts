import { Request, Response } from 'express';
import { ProductModel } from '../models/product';
import { productSchema } from '../validators/product';

const handleError = (err: unknown, res: Response) => {
  if (err instanceof Error) {
    res.status(500).json({ success: false, message: err.message });
  } else {
    res.status(500).json({ success: false, message: 'An unknown error occurred' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json({ success: true, message: 'Product created successfully!', data: product });
  } catch (err) {
    handleError(err, res);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ success: true, message: 'Products fetched successfully!', data: products });
  } catch (err) {
    handleError(err, res);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product fetched successfully!', data: product });
  } catch (err) {
    handleError(err, res);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product updated successfully!', data: product });
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product deleted successfully!', data: null });
  } catch (err) {
    handleError(err, res);
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const products = await ProductModel.find({ name: { $regex: searchTerm, $options: 'i' } });
    res.status(200).json({ success: true, message: `Products matching search term '${searchTerm}' fetched successfully!`, data: products });
  } catch (err) {
    handleError(err, res);
  }
};
