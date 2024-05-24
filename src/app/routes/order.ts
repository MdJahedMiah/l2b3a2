import { Router } from 'express';
import { createOrder, getOrders, getOrdersByEmail } from '../controllers/orderController';

const router = Router();

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/email', getOrdersByEmail);

export default router;
