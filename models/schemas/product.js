import { Schema } from 'mongoose';
import { moment } from '../../utils/moment';

const ProductSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subcategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    repImgUrl: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      min: 0,
      default: 0,
      // required: true,
    },
    createDate: {
      type: String,
      default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    deleteYn: {
      type: String,
      default: 'N',
    },
    deleteDate: {
      type: String,
    },
  },
  {
    collection: 'products',
  },
);

export default ProductSchema;
