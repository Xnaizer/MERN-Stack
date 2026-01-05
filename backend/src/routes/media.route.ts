import express from 'express';
import mediaController from '../controllers/media.controller';
import authMiddleware from '../middlewares/auth.middleware';
import aclMiddleware from '../middlewares/acl.middleware';
import mediaMiddleware from '../middlewares/media.middleware';
import { ROLES } from '../utils/constant';

const mediaRouter = express.Router();

mediaRouter.post(
    "/upload-single",
    [
        authMiddleware, 
        aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]), 
        mediaMiddleware.single('file')
    ],
    mediaController.single
);

mediaRouter.post(
    "/upload-multiple",
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
        mediaMiddleware.multiple('files')
    ],
    mediaController.multiple
);

mediaRouter.delete(
    "/remove-media",
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])
    ],
    mediaController.remove
)

export default mediaRouter;