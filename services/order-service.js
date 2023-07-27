import { startSession } from 'mongoose';
import { moment } from '../utils/moment';
import Product from '../models/product-model';
import Order from '../models/order-model';
import OrderItem from '../models/order-item-model';

class OrderService {
  async createOrder(
    {
      orderItemList,
      receiver,
      receiverContact,
      zipCode,
      address,
      detailAddress,
      shippingMessage,
      totalPrice,
    },
    userId,
  ) {
    const session = await startSession();

    try {
      session.startTransaction();

      const reqProduct = await Product.findById(orderItemList[0].productId);
      const title =
        orderItemList.length > 1
          ? `${reqProduct.name} 외 ${orderItemList.length - 1}건`
          : `${reqProduct.name}`;
      const [newOrder] = await Order.createWithSession(
        {
          userId,
          receiver,
          receiverContact,
          zipCode,
          address,
          detailAddress,
          shippingMessage,
          totalPrice,
          title,
          repImgUrl: reqProduct.repImgUrl,
        },
        { session },
      );

      //TODO:재고가 있는지 확인할것
      await OrderItem.insertMany(
        orderItemList.map((orderItemData) => ({
          orderId: newOrder._id,
          ...orderItemData,
        })),
        { session },
      );

      await session.commitTransaction();

      return newOrder;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getOrderById(id) {
    const order = await Order.findById(id);
    const orderItemList = await OrderItem.findByOrderId(id);

    return { order, orderItemList };
  }

  async cancelOrder(id) {
    //TODO : 재고에 추가 할것
    const order = await Order.findById(id);
    if (order.status !== '결제완료') {
      throw new Error('결제완료 상태일때만 취소할 수 있습니다.');
    }

    const updatedOrder = await Order.updateById(id, {
      status: '취소',
      cancelDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return updatedOrder;
  }

  async editOrderInfo(id, update) {
    const order = await Order.findById(id);
    if (order.status !== '결제완료') {
      throw new Error('결제완료 상태일때만 수정할 수 있습니다.');
    }
    const updatedOrder = await Order.updateById(id, update);
    return updatedOrder;
  }

  async removeOrderProducts(orderId, orderItemIds) {
    //TODO : 재고에 추가 할것
    const order = await Order.findById(orderId);
    if (order.status !== '결제완료') {
      throw new Error('결제완료 상태일때만 수정할 수 있습니다.');
    }
    await OrderItem.cancelOderItems(orderItemIds);
    const orderItemList = await OrderItem.findByOrderId(orderId);

    let cacleTotalAmount = 0;
    let cancleItem = 0;
    console.log(orderItemList);
    orderItemList.forEach((item) => {
      if (item.cancelYn === 'Y') {
        cacleTotalAmount += item.totalPrice;
        cancleItem += 1;
      }
    });

    //업데이트
    let update = {
      cacleTotalAmount,
    };
    console.log(orderItemList);
    if (orderItemList.length === cancleItem) {
      update.status = '취소';
      update.cancelDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    const updatedOrder = await Order.updateById(orderId, update);
    return { order: updatedOrder, orderItemList };
  }

  async getOrderList(userId) {
    const orders = await Order.findAll({ userId });
    return orders;
  }

  async getAdminOrderList() {
    const orders = await Order.findAll({ deleteYn: 'N' });
    return orders;
  }

  async editOrderState(id, update) {
    let option = {
      ...update,
    };
    if (update.status === '취소') {
      option.cancelDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    const updatedOrder = await Order.updateById(id, option);
    return updatedOrder;
  }

  async removeOrder(id) {
    const order = await Order.findById(id);
    if (order.status !== '취소') {
      throw new Error('취소 상태일때만 삭제할 수 있습니다.');
    }
    const result = await Order.updateById(id, {
      deleteYn: 'Y',
      deleteDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return result;
  }
}

const orderService = new OrderService();
export default orderService;
