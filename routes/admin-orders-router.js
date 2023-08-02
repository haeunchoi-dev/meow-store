import { Router } from 'express';
import { adminRequired } from '../middlewares';
import orderController from '../controllers/order-controller';
const adminOrdersRouter = Router();

adminOrdersRouter.get('/', adminRequired, orderController.getAdminOrderList);

export { adminOrdersRouter };
