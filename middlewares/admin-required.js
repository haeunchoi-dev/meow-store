import jwt from 'jsonwebtoken';
import { getSecretKey } from '../jwt/secret-key';

function adminRequired(req, res, next) {
  const userToken =
    (req.headers['Authorization'] &&
      req.headers['Authorization'].split(' ')[1]) ||
    (req.headers['authorization'] &&
      req.headers['authorization'].split(' ')[1]);

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

    const role = jwtDecoded.role;

    if (role !== 'admin') {
      res.status(403).json({
        result: 'forbidden-approach',
        reason: '관리자 권한이 없습니다.',
      });

      return;
    }

    const userId = jwtDecoded.userId;
    req.currentUserId = userId;

    next();
  } catch (error) {
    next(error);

    return;
  }
}

export default adminRequired;
