import { Router } from 'express';
import { adminRequired, loginRequired } from '../middlewares';
import userController from '../controllers/user-controller';
const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);

userRouter.get('/mypage/:userId', adminRequired, userController.getUserByAdmin); //TODO: admin 사용자가 다른 사용자정보 조회가능
userRouter.post(
  '/mypage/:userId',
  adminRequired,
  userController.updateUserByAdmin,
); //TODO: admin 사용자가 다른 사용자 업데이트 가능
userRouter.delete(
  '/mypage/:userId',
  adminRequired,
  userController.deleteUserByAdmin,
); //TODO: admin 사용자가 다른 사용자 탈퇴가능

userRouter.get('/mypage', loginRequired, userController.getUser); //TODO: admin 사용자가 다른 사용자정보 조회가능
userRouter.post('/mypage', loginRequired, userController.updateUser); //TODO: admin 사용자가 다른 사용자 업데이트 가능
userRouter.delete('/mypage', loginRequired, userController.deleteUser); //TODO: admin 사용자가 다른 사용자 탈퇴가능

export { userRouter };
