import { Response } from 'express';
import * as Yup from 'yup';

export default {
  success(res: Response, data: any, message: string) {},
  error() {},
  unauthenticated() {},
  unauthorized() {},
  pagination() {},
};
