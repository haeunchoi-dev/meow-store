import { Schema } from 'mongoose';
import { moment } from '../../utils/moment';

const OrderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'orders',
      required: true,
    },
    //TODO:product 스키마를 넣을지 => 복사해서 고민해볼것
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    createDate: {
      type: String,
      default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    cancelYn: {
      type: String,
      default: 'N',
    },
    cancelDate: {
      type: String,
    },
  },
  {
    collection: 'order-items',
  },
);

export default OrderItemSchema;
