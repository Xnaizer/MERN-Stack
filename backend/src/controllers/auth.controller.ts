import type { Request, Response } from 'express';
import * as Yup from 'yup';

import UserModel from '../models/user.model';
import { encrypt } from '../utils/encryption';
import { generateToken } from '../utils/jwt';
import { TLogin, TRegister } from '../utils/types';
import { IReqUser } from '../utils/interfaces';
import response from '../utils/response';

const registerValidateSchema = Yup.object({
  fullName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .required()
    .min(6, 'password must be 6 characters')
    .test('at-least-one-uppercase-letter', 'contains at least one uppercase letter', (value) => {
      if (!value) return false;

      const regex = /^(?=.*[A-Z])/;
      return regex.test(value);
    })
    .test('at-least-one-number', 'contains at least one number', (value) => {
      if (!value) return false;

      const regex = /^(?=.*\d)/;
      return regex.test(value);
    }),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), ''], 'Password not match'),
});

export default {
  async register(req: Request, res: Response) {
    const { fullName, username, email, password, confirmPassword } =
      req.body as unknown as TRegister;

    try {
      await registerValidateSchema.validate({
        fullName,
        username,
        email,
        password,
        confirmPassword,
      });

      const result = await UserModel.create({
        fullName,
        username,
        email,
        password,
      });

      response.success(res, result, 'Registration Success');
    } catch (error) {
      response.error(res, error, 'Failed registration');
    }
  },

  async login(req: Request, res: Response) {
    const { identifier, password } = req.body as unknown as TLogin;

    try {
      const userByIdentifier = await UserModel.findOne({
        $or: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
      });

      if (!userByIdentifier) {
        return response.unauthorized(res, 'User Not Found!');
      }

      if (!userByIdentifier.isActive) {
        return response.unauthorized(res, 'Complete your account activation on your email!');
      }

      const validatePassword: boolean = encrypt(password) === userByIdentifier.password;

      if (!validatePassword) {
        return response.unauthorized(res, 'Incorrect password');
      }

      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      response.success(res, token, 'Login success');
    } catch (error) {
      response.error(res, error, 'Login failed');
    }
  },

  async me(req: IReqUser, res: Response) {
    try {
      const user = req.user;

      const result = await UserModel.findById(user?.id);

      response.success(res, result, 'Success get user profile');
    } catch (error) {
      response.error(res, error, 'Failed get user info');
    }
  },

  async activation(req: Request, res: Response) {
    try {
      const { code } = req.body as { code: string };

      if (!code) {
        return response.unauthorized(res, 'Activation code is required');
      }

      const user = await UserModel.findOneAndUpdate(
        { activationCode: code },
        { isActive: true },
        { new: true },
      );

      if (!user) {
        return response.unauthorized(res, 'Invalid activation code');
      }

      return response.success(res, user, 'User successfully activated');
    } catch (error) {
      response.error(res, error, 'Activation failed');
    }
  },
};
