import express from 'express';
import authRouter from './auth.route';
import mediaRouter from './media.route';
import testRouter from './testing.route';
import categoryRouter from './category.route';
import regionRouter from './region.route';
import eventRouter from './event.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/media', mediaRouter);
router.use('/test', testRouter);
router.use(categoryRouter);
router.use(regionRouter);
router.use(eventRouter);

export default router;
