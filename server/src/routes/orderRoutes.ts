import { Router } from 'express';
import * as orderController from '../controllers/orderController.js';
import { validateOrder } from '../middleware/validateOrder.js';

const router = Router();

router.post('/', validateOrder, orderController.checkout);
router.get('/history', orderController.getHistory);

export default router;