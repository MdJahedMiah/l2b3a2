import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, searchProducts } from '../controllers/productController';

const router = Router();

router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/products/search', searchProducts);
router.get('/products/:productId', getProductById);
router.put('/products/:productId', updateProduct);
router.delete('/products/:productId', deleteProduct);

export default router;
