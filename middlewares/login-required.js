import jwt from 'jsonwebtoken';
import { getSecretKey } from '../jwt/secret-key';

function loginRequired(req, res, next) {
  // const userToken =
  //   (req.headers['Authorization'] &&
  //     req.headers['Authorization'].split(' ')[1]) ||
  //   (req.headers['authorization'] &&
  //     req.headers['authorization'].split(' ')[1]);
  const userToken = req.cookies.loginToken;

  if (!userToken || userToken === 'null') {
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });
    return;
  }

  try {
    const secretKey = getSecretKey();
    //const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const userId = jwtDecoded.userId;
    req.currentUserId = userId;

    next();
  } catch (error) {
    // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
    // 403 코드로 JSON 형태로 프론트에 전달함.
    res.clearCookie('loginToken').clearCookie('isAdmin').status(403).json({
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.',
    });

    return;
  }
}

export default loginRequired;
