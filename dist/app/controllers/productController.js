"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_1 = require("../models/product");
const product_2 = require("../validators/product");
const handleError = (err, res) => {
    if (err instanceof Error) {
        res.status(500).json({ success: false, message: err.message });
    }
    else {
        res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
};
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = product_2.productSchema.validate(req.body);
    if (error)
        return res.status(400).json({ success: false, message: error.details[0].message });
    try {
        const product = new product_1.ProductModel(req.body);
        yield product.save();
        res.status(201).json({ success: true, message: 'Product created successfully!', data: product });
    }
    catch (err) {
        handleError(err, res);
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.ProductModel.find();
        res.status(200).json({ success: true, message: 'Products fetched successfully!', data: products });
    }
    catch (err) {
        handleError(err, res);
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.ProductModel.findById(req.params.productId);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, message: 'Product fetched successfully!', data: product });
    }
    catch (err) {
        handleError(err, res);
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = product_2.productSchema.validate(req.body);
    if (error)
        return res.status(400).json({ success: false, message: error.details[0].message });
    try {
        const product = yield product_1.ProductModel.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, message: 'Product updated successfully!', data: product });
    }
    catch (err) {
        handleError(err, res);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.ProductModel.findByIdAndDelete(req.params.productId);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, message: 'Product deleted successfully!', data: null });
    }
    catch (err) {
        handleError(err, res);
    }
});
exports.deleteProduct = deleteProduct;
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const products = yield product_1.ProductModel.find({ name: { $regex: searchTerm, $options: 'i' } });
        res.status(200).json({ success: true, message: `Products matching search term '${searchTerm}' fetched successfully!`, data: products });
    }
    catch (err) {
        handleError(err, res);
    }
});
exports.searchProducts = searchProducts;
