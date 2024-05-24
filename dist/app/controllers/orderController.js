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
exports.getOrdersByEmail = exports.getOrders = exports.createOrder = void 0;
const order_1 = require("../models/order");
const product_1 = require("../models/product");
const order_2 = require("../validators/order");
const handleError = (err, res) => {
    if (err instanceof Error) {
        res.status(500).json({ success: false, message: err.message });
    }
    else {
        res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
};
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = order_2.orderSchema.validate(req.body);
    if (error)
        return res.status(400).json({ success: false, message: error.details[0].message });
    const { productId, quantity } = req.body;
    try {
        const product = yield product_1.ProductModel.findById(productId);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        if (product.inventory.quantity < quantity) {
            return res.status(400).json({ success: false, message: 'Insufficient quantity available in inventory' });
        }
        product.inventory.quantity -= quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save();
        const order = new order_1.OrderModel(req.body);
        yield order.save();
        res.status(201).json({ success: true, message: 'Order created successfully!', data: order });
    }
    catch (err) {
        handleError(err, res);
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.OrderModel.find();
        res.status(200).json({ success: true, message: 'Orders fetched successfully!', data: orders });
    }
    catch (err) {
        handleError(err, res);
    }
});
exports.getOrders = getOrders;
const getOrdersByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const orders = yield order_1.OrderModel.find({ email });
        res.status(200).json({ success: true, message: 'Orders fetched successfully for user email!', data: orders });
    }
    catch (err) {
        handleError(err, res);
    }
});
exports.getOrdersByEmail = getOrdersByEmail;
