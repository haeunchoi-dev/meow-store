import { Router } from 'express';
import { adminRequired } from '../middlewares';
import orderController from '../controllers/order-controller';
const adminOrderRouter = Router();

adminOrderRouter.post('/:id', adminRequired, orderController.editOrderState);
adminOrderRouter.delete('/:id', adminRequired, orderController.removeOrder);

export { adminOrderRouter };
