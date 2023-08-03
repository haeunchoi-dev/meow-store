import { Router } from 'express';
import { loginRequired, adminRequired } from '../middlewares';
import orderController from '../controllers/order-controller';
const orderRouter = Router();

const memberBaseUrl = '/member/order';

orderRouter.post(
  `${memberBaseUrl}`,
  loginRequired,
  orderController.createOrder,
);
orderRouter.get(
  `${memberBaseUrl}/:id`,
  loginRequired,
  orderController.getOrder,
);
orderRouter.post(
  `${memberBaseUrl}/:id`,
  loginRequired,
  orderController.cancelOrder,
);
orderRouter.post(
  `${memberBaseUrl}/:id/info`,
  loginRequired,
  orderController.editOrderInfo,
);
orderRouter.delete(
  `${memberBaseUrl}/:id/products`,
  loginRequired,
  orderController.removeOrderProducts,
);
orderRouter.get('/member/orders', loginRequired, orderController.getOrderList);

const adminBaseUrl = '/admin/order';
orderRouter.post(
  `${adminBaseUrl}/:id`,
  adminRequired,
  orderController.editOrderState,
);
orderRouter.delete(
  `${adminBaseUrl}/:id`,
  adminRequired,
  orderController.removeOrder,
);
orderRouter.get(
  '/admin/orders',
  adminRequired,
  orderController.getAdminOrderList,
);

export default orderRouter;
