import { Request, Response, NextFunction } from 'express';
import response from '../utils/response';

export default function errorMiddleware( err: unknown, req: Request, res: Response, next: NextFunction ) {
    return response.error(res, err);
}