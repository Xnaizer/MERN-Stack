import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface IActivation {
    code: string;
}

interface IUserExtended extends User {
    accessToken?: string;
    role?: string;
}

interface ISessionExtended extends Session {
    accessToken?: string;
}

interface IJWTExtended extends JWT {
    user? : IUserExtended
}

interface ILogin {
    identifier: string;
    password: string;
}

export type {
    IRegister,
    IActivation,
    IUserExtended,
    IJWTExtended,
    ISessionExtended,
    ILogin
}