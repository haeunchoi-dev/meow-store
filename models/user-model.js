import mongoose from 'mongoose';
import UserSchema from './schemas/user';

const User = mongoose.model('users', UserSchema);

class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });

    return user;
  }

  async create(userInfo) {
    const user = await User.create(userInfo);
    return user;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async deleteById(userId) {
    const result = await User.deleteOne({ _id: userId });
    return result;
  }
}

const userModel = new UserModel();

export default userModel;
