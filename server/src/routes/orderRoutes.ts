import { Router } from 'express';
import * as orderController from '../controllers/orderController.js';

const router = Router();

router.post('/', orderController.createOrder);
router.get('/history', orderController.getOrdersByContact);

export default router;