"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
router.post('/orders', orderController_1.createOrder);
router.get('/orders', orderController_1.getOrders);
router.get('/orders/email', orderController_1.getOrdersByEmail);
exports.default = router;
