/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Response } from 'express';
import * as Yup from 'yup';
import mongoose from 'mongoose';
import type { TPagination } from './types';

type TMeta = {
  status: number;
  message: string;
}

const json = (
  res:  Response, 
  status: number,
  message: string,
  data: any,
  extra?: any 
) => {
  res.status(status).json({
    meta: {
      status,
      message
    } satisfies TMeta,
    data,
    ...(extra ?? {})
  })
}


export default {
  
  success(
    res: Response, 
    data: any, 
    message = "Success"
  ) {
    return json(res, 200, message, data);
  },

  pagination(
    res: Response, 
    data: any[], 
    pagination: TPagination, 
    message = "Success"
  ) {
    return json(res, 200, message, data, { pagination });
  },

  unauthenticated(
    res: Response,
    message = "Unauthenticated"
  ) {
    return json(res, 401, message, null);
  },

  unauthorized(
    res: Response,
    message = "Unauthorized"
  ) {
    return json(res, 403, message, null);
  },

  notFound(
    res: Response,
    message = "Not Found"
  ) {
    return json(res, 404, message, null);
  },

  error(
    res: Response,
    error: unknown,
    message = "Something went wrong"
  ) {
    if(error instanceof Yup.ValidationError) {
      return json(res, 400, message, {
        [String(error.path)]: error.errors[0],
      })
    }

    if(error instanceof mongoose.Error.ValidationError) {
      const fieldErrors: Record<string, string> = {};

      for(const [key,val] of Object.entries(error.errors)) {
        fieldErrors[key] = (val as any)?.message ?? "Invalid value";
      }
      return json(res, 400, error.message, fieldErrors);
    }

    if(error instanceof mongoose.Error.CastError) {
      return json(res, 400, `Invalid ${error.path}`, { value: error.value})
    }

    const anyErr = error as any;

    if(anyErr?.code === 11000) {
      return json(res, 409, "Duplicate key", anyErr?.keyValue ?? anyErr);
    }

    if(error instanceof mongoose.Error) {
      return json(res, 500, error.message, error.name);
    }

    return json(res, 500, message, null);

  }
}