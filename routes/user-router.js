import { Router } from 'express';
import { adminRequired, loginRequired } from '../middlewares';
import userController from '../controllers/user-controller';
const userRouter = Router();

const userMypageBaseUrl = '/user/mypage';
userRouter.get(
  `${userMypageBaseUrl}/:userId`,
  adminRequired,
  userController.getUserByAdmin,
); //TODO: admin 사용자가 다른 사용자정보 조회가능
userRouter.post(
  `${userMypageBaseUrl}/:userId`,
  adminRequired,
  userController.updateUserByAdmin,
); //TODO: admin 사용자가 다른 사용자 업데이트 가능
userRouter.delete(
  `${userMypageBaseUrl}/:userId`,
  adminRequired,
  userController.deleteUserByAdmin,
); //TODO: admin 사용자가 다른 사용자 탈퇴가능

userRouter.get(`${userMypageBaseUrl}`, loginRequired, userController.getUser);
userRouter.post(
  `${userMypageBaseUrl}`,
  loginRequired,
  userController.updateUser,
);
userRouter.delete(
  `${userMypageBaseUrl}`,
  loginRequired,
  userController.deleteUser,
);

userRouter.post('/user/register', userController.register);
userRouter.post('/user/login', userController.login);
userRouter.put('/user/logout', userController.logout);

userRouter.get('/user/auth/check', loginRequired, userController.checkAuth);
userRouter.get('/user/admin/check', adminRequired, userController.checkAdmin);

export default userRouter;
