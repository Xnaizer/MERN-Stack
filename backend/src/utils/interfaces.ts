import { Types } from 'mongoose';
import type { Request } from "express";

export interface IUser {
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: string;
    profilePicture: string;
    isActive: boolean;
    activationCode: string;
    createdAt?: string;
}

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


export interface IReqUser extends Request {
    user?: IUserToken
}

