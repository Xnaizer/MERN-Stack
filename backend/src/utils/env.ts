import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL: string = process.env.DATABASE_URL as unknown as string;
export const SECRET_KEY: string = process.env.SECRET_KEY as unknown as string;

export const EMAIL_SMTP_SECURE: boolean = Boolean(process.env.EMAIL_SMTP_SECURE) as unknown as boolean;
export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER as unknown as string;
export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS as unknown as string;
export const EMAIL_SMTP_PORT: number = Number(process.env.EMAIL_SMTP_PORT) as unknown as number;
export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST as unknown as string;
export const EMAIL_SMTP_SERVICE_NAME: string = process.env.EMAIL_SMTP_SERVICE_NAME as unknown as string;

export const CLIENT_HOST: string = process.env.CLIENT_HOST as unknown as string;