import { Router } from 'express';
import { loginRequired } from '../middlewares';
import orderController from '../controllers/order-controller';
const memberOrdersRouter = Router();

memberOrdersRouter.get('/', loginRequired, orderController.getOrderList);

export { memberOrdersRouter };
