import express, { type Request, type Response } from 'express';
import dummyController from '../controllers/dummy.controller';
import authMiddleware from '../middlewares/auth.middleware';
import aclMiddleware from '../middlewares/acl.middleware';
import { ROLES } from '../utils/constant';
import response from '../utils/response';

const testRouter = express.Router();

// test acl
testRouter.get(
  '/test-acl',
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  (req: Request, res: Response) => {
    response.success(res, 'OK!', 'Success HIT!');
  },
);

// dummy controller
testRouter.get('/dummy', dummyController.dummy);

// test images statuses
testRouter.get(
  "/images",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])], 
  dummyController.getImages
);

export default testRouter;
