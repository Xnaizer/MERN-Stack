import type { Request, Response } from "express";
import * as Yup from 'yup';
import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";

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

const registerValidateSchema = Yup.object({
    fullName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
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

            

            // validate password

            const validatePassword: boolean = encrypt(password) === userByIdentifier.password;

            if(!validatePassword) {
                return res.status(403).json({
                    status: "failed",
                    message: 'Password Doesn\'t Match!',
                    data: null
                });

            }

            res.status(200).json({
                status: "success",
                message: "Login Success",
                data: userByIdentifier
            });


        } catch (error) {
            const err  = error as unknown as Error;

            res.status(400).json({
                status: "Failed",
                message: err.message,
                data: null
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