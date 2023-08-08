import { Router } from 'express';
import { adminRequired, loginRequired, errorHandler } from '../middlewares';
import userController from '../controllers/user-controller';

const userRouter = Router();

const userMypageBaseUrl = '/user/mypage';
userRouter.get(
  `${userMypageBaseUrl}/:userId`,
  adminRequired,
  errorHandler(userController.getUserByAdmin),
); //TODO: admin 사용자가 다른 사용자정보 조회가능
userRouter.post(
  `${userMypageBaseUrl}/:userId`,
  adminRequired,
  errorHandler(userController.updateUserByAdmin),
); //TODO: admin 사용자가 다른 사용자 업데이트 가능
userRouter.delete(
  `${userMypageBaseUrl}/:userId`,
  adminRequired,
  errorHandler(userController.deleteUserByAdmin),
); //TODO: admin 사용자가 다른 사용자 탈퇴가능

userRouter.get(
  `${userMypageBaseUrl}`,
  loginRequired,
  errorHandler(userController.getUser),
);
userRouter.post(
  `${userMypageBaseUrl}`,
  loginRequired,
  errorHandler(userController.updateUser),
);
userRouter.delete(
  `${userMypageBaseUrl}`,
  loginRequired,
  errorHandler(userController.deleteUser),
);

userRouter.post('/user/register', errorHandler(userController.register));
userRouter.post('/user/login', errorHandler(userController.login));
userRouter.put('/user/logout', errorHandler(userController.logout));

userRouter.get(
  '/user/auth/check',
  loginRequired,
  errorHandler(userController.checkAuth),
);
userRouter.get(
  '/user/admin/check',
  adminRequired,
  errorHandler(userController.checkAdmin),
);

export default userRouter;
