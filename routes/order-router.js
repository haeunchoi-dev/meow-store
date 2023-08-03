import { Router } from 'express';
import { loginRequired, adminRequired, errorHandler } from '../middlewares';
import orderController from '../controllers/order-controller';

const orderRouter = Router();

const memberBaseUrl = '/member/order';

orderRouter.post(
  `${memberBaseUrl}`,
  loginRequired,
  errorHandler(orderController.createOrder),
);
orderRouter.get(
  `${memberBaseUrl}/:id`,
  loginRequired,
  errorHandler(orderController.getOrder),
);
orderRouter.post(
  `${memberBaseUrl}/:id`,
  loginRequired,
  errorHandler(orderController.cancelOrder),
);
orderRouter.post(
  `${memberBaseUrl}/:id/info`,
  loginRequired,
  errorHandler(orderController.editOrderInfo),
);
orderRouter.delete(
  `${memberBaseUrl}/:id/products`,
  loginRequired,
  errorHandler(orderController.removeOrderProducts),
);
orderRouter.get(
  '/member/orders',
  loginRequired,
  errorHandler(orderController.getOrderList),
);

const adminBaseUrl = '/admin/order';
orderRouter.post(
  `${adminBaseUrl}/:id`,
  adminRequired,
  errorHandler(orderController.editOrderState),
);
orderRouter.delete(
  `${adminBaseUrl}/:id`,
  adminRequired,
  errorHandler(orderController.removeOrder),
);
orderRouter.get(
  '/admin/orders',
  adminRequired,
  errorHandler(orderController.getAdminOrderList),
);

export default orderRouter;
