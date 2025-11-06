import express from 'express';
import dummyController from '../controllers/dummy.controller';
import authController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();


/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         description: Bad request - Validation error
 *
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user and get access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       403:
 *         description: Invalid credentials
 *
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get current user profile (requires JWT)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Success Get User Profile!
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6719d2b3a0b5f4a1ef43b8a2
 *                     fullName:
 *                       type: string
 *                       example: John Doe
 *                     username:
 *                       type: string
 *                       example: johndoe123
 *                     email:
 *                       type: string
 *                       example: john.doe@gmail.com
 *                     role:
 *                       type: string
 *                       example: user
 *       403:
 *         description: Unauthorized - Missing or invalid token
 *
 * /auth/activation:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Activate a user account
 *     description: Activate user account using activation code sent via email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivationRequest'
 *     responses:
 *       200:
 *         description: Successfully activated user account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActivationResponse'
 *       403:
 *         description: Unauthorized - Invalid activation code
 */

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authMiddleware, authController.me);
router.post("/auth/activation", authController.activation);



router.get('/dummy', dummyController.dummy);

export default router;