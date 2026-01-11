import type { Request, Response } from 'express';
import response from '../utils/response';

export default {
  dummy(req: Request, res: Response) {
    response.success(res, 'OK!', 'Success hit dummy API!');
  },
};
