import express from 'express';
import authRouter from './auth.route';
import mediaRouter from './media.route';
import testRouter from './testing.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/media', mediaRouter);
router.use('/test', testRouter);

export default router;
