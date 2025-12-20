import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL: string = process.env.DATABASE_URL as unknown as string;
export const SECRET_KEY: string = process.env.SECRET_KEY as unknown as string;