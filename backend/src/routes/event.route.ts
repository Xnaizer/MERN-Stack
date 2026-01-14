import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import eventController from '../controllers/event.controller';
import { ROLES } from '../utils/constant';
import aclMiddleware from '../middlewares/acl.middleware';

const eventRouter = express.Router();

eventRouter.post(
    '/events',
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN])
    ],
    eventController.createEvent
);

eventRouter.get(
    "/events",
    eventController.findAllEvent
);

eventRouter.get(
    "/events/:id",
    eventController.findOneEvent
);

eventRouter.put(
    "/events/:id",
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN])
    ],
    eventController.updateEvent
);

eventRouter.delete(
    "/events/:id",
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN])
    ],
    eventController.removeEvent
);

eventRouter.get(
    "/events/:slug/slug",
    eventController.findOneEventBySlug
)

export default eventRouter;