import type { Response, Request, NextFunction } from "express"
import { getUserData, type IUserToken } from "../utils/jwt"

export interface IReqUser extends Request {
    user?: IUserToken;
}

export default(req: Request ,res: Response,next: NextFunction) => {
    const authorization = req.headers?.authorization;

    if(!authorization) {
        return res.status(403).json({
            status: "failed",
            message: "Unauthorized!",
            data: null
        });
    }

    const [prefix, accessToken] = authorization.split(" ");

    if(!(prefix === "Bearer" && accessToken)) {
        return res.status(403).json({
            status: "failed",
            message: "Unauthorized!",
            data: null
        });
    }

    const user = getUserData(accessToken);

    if(!user) {
        return res.status(403).json({
            status: "failed",
            message: "Unauthorized User Not Found!"
        });
    }

    (req as IReqUser).user = user;

    next();
}