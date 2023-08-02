import { Schema } from 'mongoose';
import { moment } from '../../utils/moment';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: new Schema(
        {
          zipCode: String,
          address: String,
          detailAddress: String,
        },
        {
          _id: false,
        },
      ),
      required: false,
    },
    role: {
      type: String,
      required: false,
      default: 'user',
      enum: ['admin', 'user'],
    },
    createDate: {
      type: String,
      default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
    },
  },
  {
    collection: 'users',
  },
);

export default UserSchema;
