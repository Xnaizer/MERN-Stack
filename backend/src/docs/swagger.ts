import swaggerJSDoc from "swagger-jsdoc";
import { version } from "../../package.json";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

const routesPath = isProd
  ? path.resolve(__dirname, "../routes/*.js")
  : path.resolve(__dirname, "../routes/*.ts");

const controllersPath = isProd
  ? path.resolve(__dirname, "../controllers/*.js")
  : path.resolve(__dirname, "../controllers/*.ts");

const doc: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN Stack Backend API",
      description: "Swagger Documentation for MERN Stack Backend API",
      version,
    },
    servers: [
      {
        url: isProd
          ? "https://mern-stack-be.vercel.app/api"
          : "http://localhost:3000/api",
        description: isProd ? "Production Server" : "Local Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token here (format: Bearer <token>)",
        },
      },
      schemas: {
        CreateUserInput: {
          type: "object",
          required: [
            "fullName",
            "username",
            "email",
            "password",
            "confirmPassword",
          ],
          properties: {
            fullName: { type: "string", example: "John Doe" },
            username: { type: "string", example: "johndoe123" },
            email: { type: "string", example: "john.doe@gmail.com" },
            password: { type: "string", example: "john12345" },
            confirmPassword: { type: "string", example: "john12345" },
          },
        },
        CreateUserResponse: {
          type: "object",
          properties: {
            _id: { type: "string", example: "6719d2b3a0b5f4a1ef43b8a2" },
            fullName: { type: "string", example: "John Doe" },
            username: { type: "string", example: "johndoe123" },
            email: { type: "string", example: "john.doe@gmail.com" },
            role: { type: "string", example: "user" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["identifier", "password"],
          properties: {
            identifier: { type: "string", example: "john.doe@gmail.com" },
            password: { type: "string", example: "john12345" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "success" },
            message: { type: "string", example: "Login Success" },
            data: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [routesPath, controllersPath],
};

console.log("🟢 Swagger scanning files:");
console.log("   Routes:", routesPath);
console.log("   Controllers:", controllersPath);
console.log("   Environment:", isProd ? "Production" : "Development");

export const swaggerSpec = swaggerJSDoc(doc);
