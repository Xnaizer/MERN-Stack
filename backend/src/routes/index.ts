import express from 'express';
import authRouter from './auth.route';
import mediaRouter from './media.route';
import testRouter from './testing.route';
import categoryRouter from './category.route';
import regionRoute from './region.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/media', mediaRouter);
router.use('/test', testRouter);
router.use(categoryRouter);
router.use(regionRoute);

export default router;
