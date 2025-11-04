import type { Request, Response } from "express";
import * as Yup from 'yup';
import UserModel from "../models/user.model";

type TRegister = {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
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
    })

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
                message: "Succes Registrations!",
                data: resultUserModel
            });

        } catch (error){
            const err = error as unknown as Error;
            
            res.status(400).json({
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