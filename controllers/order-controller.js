import OrderService from '../services/order-service';

class OrderController {
  async createOrder(req, res, next) {
    try {
      const order = await OrderService.createOrder(req.body, req.currentUserId);
      res.status(200).json(order._id);
    } catch (error) {
      next(error);
    }
  }
  async getOrder(req, res, next) {
    try {
      const { id } = req.params;

      const order = await OrderService.getOrderById(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
  async cancelOrder(req, res, next) {
    try {
      const { id } = req.params;
      const result = await OrderService.cancelOrder(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async editOrderInfo(req, res, next) {
    try {
      const { id } = req.params;
      const updatedOrder = await OrderService.editOrderInfo(id, req.body);
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
  async removeOrderProducts(req, res, next) {
    try {
      const { id } = req.params;
      const result = await OrderService.removeOrderProducts(
        id,
        req.body.orderItemIds,
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async getOrderList(req, res, next) {
    try {
      const orders = await OrderService.getOrderList(req.currentUserId);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getAdminOrderList(req, res, next) {
    try {
      const orders = await OrderService.getAdminOrderList();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async editOrderState(req, res, next) {
    try {
      const { id } = req.params;
      const updatedOrder = await OrderService.editOrderState(id, req.body);
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  async removeOrder(req, res, next) {
    try {
      const { id } = req.params;
      const result = await OrderService.removeOrder(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
const orderController = new OrderController();
export default orderController;
