"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);