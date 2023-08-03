import OrderService from '../services/order-service';

class OrderController {
  async createOrder(req, res) {
    const order = await OrderService.createOrder(req.body, req.currentUserId);
    res.status(200).json(order._id);
  }
  async getOrder(req, res) {
    const { id } = req.params;

    const order = await OrderService.getOrderById(id);
    res.status(200).json(order);
  }
  async cancelOrder(req, res) {
    const { id } = req.params;
    const result = await OrderService.cancelOrder(id);
    res.status(200).json(result);
  }
  async editOrderInfo(req, res) {
    const { id } = req.params;
    const updatedOrder = await OrderService.editOrderInfo(id, req.body);
    res.status(200).json(updatedOrder);
  }
  async removeOrderProducts(req, res) {
    const { id } = req.params;
    const result = await OrderService.removeOrderProducts(
      id,
      req.body.orderItemIds,
    );
    res.status(200).json(result);
  }
  async getOrderList(req, res) {
    const orders = await OrderService.getOrderList(req.currentUserId);
    res.status(200).json(orders);
  }

  async getAdminOrderList(req, res) {
    const orders = await OrderService.getAdminOrderList();
    res.status(200).json(orders);
  }

  async editOrderState(req, res) {
    const { id } = req.params;
    const updatedOrder = await OrderService.editOrderState(id, req.body);
    res.status(200).json(updatedOrder);
  }

  async removeOrder(req, res) {
    const { id } = req.params;
    const result = await OrderService.removeOrder(id);
    res.status(200).json(result);
  }
}
const orderController = new OrderController();
export default orderController;
