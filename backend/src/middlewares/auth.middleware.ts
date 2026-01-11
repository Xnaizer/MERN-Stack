import type { NextFunction, Request, Response } from 'express';
import { getUserData } from '../utils/jwt';
import { IReqUser } from '../utils/interfaces';
import response from '../utils/response';

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers?.authorization;

  if (!authorization) {
    return response.unauthenticated(res, 'Authentications needed');
  }

  const [prefix, accessToken] = authorization.split(' ');

  if (!(prefix === 'Bearer' && accessToken)) {
    return response.unauthenticated(res, 'Authentications needed');
  }

  try {
    const user = getUserData(accessToken);

    if (!user) {
      return response.unauthenticated(res, 'Token invalid!, Failed Authentications');
    }

    (req as IReqUser).user = user;

    next();
  } catch {
    return response.unauthenticated(res, 'Error occurred!, Failed Authentications');
  }
};
