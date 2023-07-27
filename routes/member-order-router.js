import { Router } from 'express';
import { loginRequired } from '../middlewares';
import orderController from '../controllers/order-controller';
const memberOrderRouter = Router();

memberOrderRouter.post('/', loginRequired, orderController.createOrder);
memberOrderRouter.get('/:id', loginRequired, orderController.getOrder);
memberOrderRouter.post('/:id', loginRequired, orderController.cancelOrder);
memberOrderRouter.post(
  '/:id/info',
  loginRequired,
  orderController.editOrderInfo,
);
memberOrderRouter.delete(
  '/:id/products',
  loginRequired,
  orderController.removeOrderProducts,
);

export { memberOrderRouter };
