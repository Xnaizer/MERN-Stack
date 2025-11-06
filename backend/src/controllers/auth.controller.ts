import type { Request, Response } from "express";
import * as Yup from 'yup';
import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { type IReqUser } from "../middlewares/auth.middleware";

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

// export default {
//     register(req: Request,res: Response) {
//         const {
//             fullName,
//             username,
//             email,
//             password,
//             confirmPassword
//         } = req.body as unknown as TRegister; 
//     }
// }

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - fullName
 *         - username
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         fullName:
 *           type: string
 *           example: John Doe
 *         username:
 *           type: string
 *           example: johndoe123
 *         email:
 *           type: string
 *           example: john.doe@gmail.com
 *         password:
 *           type: string
 *           example: john12345
 *         confirmPassword:
 *           type: string
 *           example: john12345
 */


const registerValidateSchema = Yup.object({
    fullName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required().min(6, "Password must be at least 6 character").test("at-least-one-uppercase-letter", "Contains at lest one uppercase letter", (value) => {
        if(!value) return false;

        const regex = /^(?=.*[A-Z])/;
        return regex.test(value);
    }).test("at-least-one-number", "Contains at lest one number", (value) => {
        if(!value) return false;

        const regex = /^(?=.*\d)/;
        return regex.test(value);
    }),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), ""], "Password not match")
});

export default {
    async register(req: Request<{},{},TRegister>,res: Response) {

        
        const {
            fullName,
            username,
            email,
            password,
            confirmPassword
        } = req.body; 

        try{
            await registerValidateSchema.validate({
                fullName,
                username,
                email,
                password,
                confirmPassword
            });

            const resultUserModel = await UserModel.create({
                fullName,
                username,
                email,
                password,
            })

            res.status(200).json({
                status: 'success',
                message: "Success Registrations!",
                data: resultUserModel
            });

        } catch (error){
            const err = error as unknown as Error;
            
            res.status(400).json({
                status: "Failed",
                message: err.message,
                data: null
            })
        }
    },

    async login(req: Request<{},{},TLogin>, res: Response) {

        const {
            identifier,
            password
        } = req.body;

        try {

            // get user with id -> login with email dan username

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

            console.log(!userByIdentifier.isActive)

            // validate password

            const validatePassword: boolean = encrypt(password) === userByIdentifier.password;

            if(!validatePassword) {
                return res.status(403).json({
                    status: "failed",
                    message: 'Password Doesn\'t Match!',
                    data: null
                });

            }



            const token = generateToken({
                id: userByIdentifier._id,
                role: userByIdentifier.role
            })

            res.status(200).json({
                status: "success",
                message: "Login Success",
                data: token
            });


        } catch (error) {
            const err  = error as unknown as Error;

            res.status(400).json({
                status: "Failed",
                message: err.message,
                data: null
            })
        }
    },

    async me(req: IReqUser, res: Response) {

        
        try {

            const user = req.user;

            const result = await UserModel.findById(user?.id);

            if(!result) {
                res.status(400).json({
                    status: "failed",
                    message: "User Not Found!",
                    body: null
                });
            }

            res.status(200).json({
                status: "success",
                message: "Success Get User Profile!",
                data: result
            });

        } catch (error) {
            const err = error as unknown as Error;
            res.status(400).json({
                status: "failed",
                message: err.message,
                data: null
            });
        }
    },

    async activation(req: Request, res: Response) {
        try {

            const  { code }  = req.body as { code : string };

            const user = await UserModel.findOneAndUpdate(
                {
                    activationCode: code,
                },
                {
                    isActive: true,
                },
                {
                    new: true,
                }
            );

            res.status(200).json({
                status: "success",
                message : "User successfully activated!",
                body: user
            })

        } catch (error) {
            const err = error as unknown as Error;
            res.status(400).json({
                status: "failed",
                message: err.message,
                body: null
            })
        }
    }

    




}







// Request<{},{},TRegister

// contoh : 

// interface Params { id: string; }
// interface Body { email: string; password: string; }
// interface Query { lang?: string; }

// function updateUser(req: Request<Params, {}, Body, Query>, res: Response) {
//   console.log(req.params.id);   // dari /users/:id
//   console.log(req.body.email);  // dari form JSON
//   console.log(req.query.lang);  // dari ?lang=en
// }