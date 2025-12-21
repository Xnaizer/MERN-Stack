import type { Request, Response } from 'express';
import * as Yup from 'yup';

import UserModel from '../models/user.model';
import { encrypt } from '../utils/encryption';
import { generateToken } from '../utils/jwt';
import { IReqUser } from '../middlewares/auth.middleware';


type TRegister = {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type TLogin = {
    identifier: string;
    password: string;
}

const registerValidateSchema = Yup.object({
    fullName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6, "password must be 6 characters").test(
        'at-least-one-uppercase-letter', 
        "contains at least one uppercase letter", 
        (value) => {
            if(!value) return false;

            const regex = /^(?=.*[A-Z])/;
            return regex.test(value);
        }
    ).test(
        'at-least-one-number', 
        "contains at least one number", 
        (value) => {
            if(!value) return false;

            const regex = /^(?=.*\d)/;
            return regex.test(value);
        }
    ),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), ""], "Password not match")
})

export default {

    async register(req: Request, res: Response) {
        const {
            fullName, username, email, password, confirmPassword
        } = req.body as unknown as TRegister;
        
        try {
            
            await registerValidateSchema.validate({
                fullName, username, email, password, confirmPassword
            });

            const result = await UserModel.create({
                fullName, username, email, password
            })

            res.status(200).json({
                status: "Success",
                message: "Registration Success",
                data: result
            })


        } catch (error) {
            
            const err = error as unknown as Error;

            res.status(400).json({
                status: "Failed",
                message: err.message,
                data: null
            });
        }
    },

    async login (req: Request, res: Response) {
        const {identifier, password} = req.body as unknown as TLogin;

        try {

            const userByIdentifier = await UserModel.findOne({
                $or: [
                    {
                        email: identifier,
                    },
                    {
                        username: identifier,
                    }
                ],
            });

            
            if(!userByIdentifier) {
                return res.status(403).json({
                    status: "failed",
                    message: "User Not Found!",
                    data: null
                });
            }

            if(!userByIdentifier.isActive){
                return res.status(403).json({
                    status: "failed",
                    message: "Complete your account activation on your email!",
                    data: null
                })
            }

            
            const validatePassword: boolean = encrypt(password) === userByIdentifier.password;

            if(!validatePassword) {
                return res.status(403).json({
                    status: 'failed',
                    message : 'incorrect password',
                    data: null
                })
            }

            const token = generateToken({
                id: userByIdentifier._id,
                role: userByIdentifier.role
            })

            res.status(200).json({
                status: 'success',
                message: 'login success',
                data: token
            })

        } catch (error) {
            const err = error as unknown as Error;
            res.status(400).json({
                status: 'Failed',
                message: err.message,
                data: null
            })
        }
    },

    async me (req: IReqUser, res: Response) {
        try {
            const user = req.user;

            const result = await UserModel.findById(user?.id);

            res.status(200).json({
                status: 'success',
                message: 'success get user profile',
                data: result
            })

        } catch (error) {
            const err = error as unknown as Error;
            res.status(400).json({
                status: 'failed',
                message: err.message,
                data: null
            })
        }
    },
    
    async activation(req: Request, res: Response) {
        try {
            const { code } = req.body as { code: string };

            if (!code) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'activation code is required',
                    data: null
                });
            }

            const user = await UserModel.findOneAndUpdate(
                { activationCode: code },
                { isActive: true },
                { new: true }
            );

            if (!user) {
                return res.status(403).json({
                    status: 'failed',
                    message: 'invalid activation code',
                    data: null
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'user successfully activated',
                data: user
            })

        } catch (error) {
            const err = error as unknown as Error;

            res.status(400).json({
                status: 'failed',
                message: err.message,
                data: null
            })
        }
    }


}
