import UserService from '../services/user-service';

class UserController {
  async register(req, res) {
    const newUser = await UserService.addUser(req.body);
    res.status(201).json({ success: true, data: newUser });
  }

  async login(req, res) {
    const user = await UserService.login(req.body);
    //쿠키
    res
      .cookie('loginToken', user.token)
      .cookie('isAdmin', user.isAdmin)
      .status(200)
      .json({});
  }

  async logout(req, res) {
    return res.clearCookie('loginToken').clearCookie('isAdmin').end();
  }

  async getUser(req, res) {
    const currentUserInfo = await UserService.getUserInfo(req.currentUserId);
    res.status(200).json(currentUserInfo);
  }

  async updateUser(req, res) {
    const updatedUser = await UserService.updatedUserInfo(
      req.currentUserId,
      req.body,
    );
    res.status(200).json({ updatedUser });
  }

  async deleteUser(req, res) {
    await UserService.deleteUser(req.currentUserId, req.body);
    res
      .clearCookie('loginToken')
      .clearCookie('isAdmin')
      .status(200)
      .json({ success: true });
    //res.status(204).end();
  }

  async getUserByAdmin(req, res) {
    const { userId } = req.params;
    const currentUserInfo = await UserService.getUserInfo(userId);
    res.status(200).json(currentUserInfo);
  }

  async updateUserByAdmin(req, res) {
    const { userId } = req.params;
    const updatedUser = await UserService.updatedUserInfo(userId, req.body);
    res.status(200).json({ updatedUser });
  }

  async deleteUserByAdmin(req, res) {
    const { userId } = req.params;
    //TODO: 유저삭제시 관련 데이터 지우기
    await UserService.deleteUser(userId);
    res.status(204).end();
  }

  async checkAuth(req, res) {
    res.status(200).json({ result: 'success' });
  }

  async checkAdmin(req, res) {
    res.status(200).json({ result: 'success' });
  }
}
const userController = new UserController();
export default userController;
