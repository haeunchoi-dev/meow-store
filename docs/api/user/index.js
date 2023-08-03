import register from './register';
import login from './login';
import logout from './logout';
import mypage from './mypage';

export default {
  ...register,
  ...login,
  ...logout,
  ...mypage,
};
