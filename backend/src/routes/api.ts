import express from 'express';


// import authentications
import authController from '../controllers/auth.controller';

import dummyController from '../controllers/dummy.controller';

const router = express.Router();

// authentications controller
router.post('/auth/register', authController.register);


// dummy controller
router.get('/dummy', dummyController.dummy);

export default router;