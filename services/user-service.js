import User from '../models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getSecretKey } from '../jwt/secret-key';

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async addUser(userInfo) {
    const { name, contact, email, address, password, role } = userInfo;

    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdNewUser = await this.userModel.create({
      name,
      contact,
      email,
      address,
      password: hashedPassword,
      role,
    });

    return createdNewUser;
  }

  async login(loginInfo) {
    const { email, password } = loginInfo;

    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    //JWT 웹 토큰 생성
    const secretKey = getSecretKey();
    //const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

    const isAdmin = user.role === 'admin';

    return { token, isAdmin };
  }

  async getUserInfo(userId) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    return user;
  }
  async updatedUserInfo(userId, toUpdate) {
    let user = await this.userModel.findById(userId);

    const { currentPassword } = toUpdate;

    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    if (currentPassword) {
      const correctPasswordHash = user.password;
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        correctPasswordHash,
      );

      if (!isPasswordCorrect) {
        throw new Error(
          '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
        );
      }

      const { password } = toUpdate;

      if (password) {
        const newPasswordHash = await bcrypt.hash(password, 10);
        toUpdate.password = newPasswordHash;
      }
    }

    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    return user;
  }

  async deleteUser(userId, { password }) {
    //TODO:비밀번호 확인
    const user = await this.userModel.findById(userId);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const result = await this.userModel.deleteById(userId);

    if (result.deletedCount === 0) {
      throw new Error(`${userId} 사용자 데이터의 삭제에 실패하였습니다.`);
    }
    console.log(result);
    return result;
  }
}

//의존성주입이라곤 하지만 엄밀히 말하면 의존성 주입이 아니지 않나?
//다른 방식이 있는지 찾아볼것
const userService = new UserService(User);
export default userService;
