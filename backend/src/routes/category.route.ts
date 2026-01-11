import express from 'express';
import categoryController from '../controllers/category.controller';
import authMiddleware from '../middlewares/auth.middleware';
import aclMiddleware from '../middlewares/acl.middleware';
import { ROLES } from '../utils/constant';

const categoryRouter = express.Router();

categoryRouter.post(
    '/category',
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN])
    ], 
    categoryController.create
);

categoryRouter.get(
    '/category', 
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])
    ], 
    categoryController.findAll
);

categoryRouter.get(
    '/category/:id',
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])
    ],  
    categoryController.findOne
);

categoryRouter.put(
    '/category/:id',
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN])
    ],  
    categoryController.update
);

categoryRouter.delete(
    '/category/:id',
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN])
    ],  
    categoryController.remove
);

export default categoryRouter;
