import { Types } from "mongoose";
import { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./env";

export interface IUserToken extends Omit<
    IUser,  
    "password" |  
    "activationCode" | 
    "isActive" | 
    "email" | 
    "fullName" | 
    "profilePicture" | 
    "username"
    >{
    id?: Types.ObjectId;
}


export const generateToken = (user: IUserToken): string => {
    const token = jwt.sign(user, SECRET_KEY, {
        expiresIn: '1h',
    });

    return token;
};

export const getUserData = (token: string) => {
    const user = jwt.verify(token, SECRET_KEY) as IUserToken;

    return user;
};