import { NextFunction, type Response } from "express"
import { type IReqUser } from "./auth.middleware"


export default (roles: string[]) => {
    return (req: IReqUser ,res: Response, next: NextFunction) => {
        const role = req.user?.role;

        if(!role || !roles.includes(role)) {
            return res.status(403).json({
                status: 'failed',
                message: "Forbidden access",
                data: null
            });

        }

        next();
    }
}