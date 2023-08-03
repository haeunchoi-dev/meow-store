import UserService from '../services/user-service';

class UserController {
  async register(req, res, next) {
    try {
      const newUser = await UserService.addUser(req.body);
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const user = await UserService.login(req.body);
      //쿠키
      res
        .cookie('loginToken', user.token)
        .cookie('isAdmin', user.isAdmin)
        .status(200)
        .json({});
    } catch (error) {
      next(error);
      return;
    }
  }

  async logout(req, res) {
    return res.clearCookie('loginToken').clearCookie('isAdmin').end();
  }

  async getUser(req, res, next) {
    try {
      const currentUserInfo = await UserService.getUserInfo(req.currentUserId);
      res.status(200).json(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, re, nexts) {
    try {
      const updatedUser = await UserService.updatedUserInfo(
        req.currentUserId,
        req.body,
      );
      res.status(200).json({ updatedUser });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      //TODO: 유저삭제시 관련 데이터 지우기
      await UserService.deleteUser(req.currentUserId, req.body);
      res
        .clearCookie('loginToken')
        .clearCookie('isAdmin')
        .status(200)
        .json({ success: true });
      //res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  async getUserByAdmin(req, res, next) {
    try {
      const { userId } = req.params;
      const currentUserInfo = await UserService.getUserInfo(userId);
      res.status(200).json(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }

  async updateUserByAdmin(req, res, next) {
    try {
      const { userId } = req.params;
      const updatedUser = await UserService.updatedUserInfo(userId, req.body);
      res.status(200).json({ updatedUser });
    } catch (error) {
      next(error);
    }
  }

  async deleteUserByAdmin(req, res, next) {
    try {
      const { userId } = req.params;
      //TODO: 유저삭제시 관련 데이터 지우기
      await UserService.deleteUser(userId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  async checkAuth(req, res, next) {
    try {
      res.status(200).json({ result: 'success' });
    } catch (error) {
      next(error);
    }
  }

  async checkAdmin(req, res, next) {
    try {
      res.status(200).json({ result: 'success' });
    } catch (error) {
      next(error);
    }
  }
}
const userController = new UserController();
export default userController;
