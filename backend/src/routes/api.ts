import express from 'express';


// import authentications
import authController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';
import dummyController from '../controllers/dummy.controller';

const router = express.Router();

// authentications controller
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get("/auth/me", authMiddleware, authController.me);


// dummy controller
router.get('/dummy', dummyController.dummy);

export default router;