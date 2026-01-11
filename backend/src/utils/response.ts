import { Response } from 'express';
import * as Yup from 'yup';
import { TPagination } from './types';

export default {
  success(res: Response, data: any, message: string) {
    res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
    });
  },
  error(res: Response, error: unknown, message: string) {
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({
        meta: {
          status: 400,
          message,
        },
        data: error.errors,
      });
    }
  },
  unauthenticated(res: Response, message: string = 'unauthenticated') {
    res.status(401).json({
      meta: {
        status: 401,
        message,
      },
      data: null,
    });
  },
  unauthorized(res: Response, message: string = 'unauthorized') {
    res.status(403).json({
      meta: {
        status: 403,
        message,
      },
      data: null,
    });
  },
  pagination(res: Response, data: any[], pagination: TPagination, message: string) {
    res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
      pagination,
    });
  },
};
