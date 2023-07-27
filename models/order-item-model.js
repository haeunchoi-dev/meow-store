import mongoose from 'mongoose';
import { moment } from '../utils/moment';
import orderItemSchema from './schemas/order-item';

const OrderItem = mongoose.model('order-items', orderItemSchema);

class OrderItemModel {
  async insertMany(orderItemList, option) {
    const newOrderItemList = await OrderItem.insertMany(orderItemList, option);
    return newOrderItemList;
  }

  async findByOrderId(orderId) {
    const orderItems = await OrderItem.find({ orderId }).populate('productId');
    return orderItems;
  }

  async cancelOderItems(orderItemIds) {
    const result = await OrderItem.updateMany(
      { _id: { $in: orderItemIds } },
      { cancelYn: 'Y', cancelDate: moment().format('YYYY-MM-DD HH:mm:ss') },
    );
    return result;
  }
}

const orderItemModel = new OrderItemModel();
export default orderItemModel;
