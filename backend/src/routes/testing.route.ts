import express, { type Request, type Response } from 'express';
import dummyController from '../controllers/dummy.controller';
import authMiddleware from '../middlewares/auth.middleware';
import aclMiddleware from '../middlewares/acl.middleware';
import { ROLES } from '../utils/constant';

const testRouter = express.Router();

// test acl
testRouter.get(
  '/test-acl',
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'HIT OK',
      data: 'Success HIT',
    });
  },
);

// dummy controller
testRouter.get('/dummy', dummyController.dummy);

export default testRouter;
