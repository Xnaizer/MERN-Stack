import swaggerAutogen from 'swagger-autogen';


const doc = {
    info: {
        version: "v0.0.1",
        title: "Dokumentasi MERN Stack Backend API",
        description: "Docs here"
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Local Server"
        },
        {
            url: "https://mern-stack-be.vercel.app/api",
            description: "Deploy Server"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            }
        },
        schemas: {
            LoginRequest: {
                identifier: "seseorang@gmail.com",
                password: "12341234"
            }
        }
    }
}


const outputFile = "./swagger_output.json";
const endpointFiles = [
  "../routes/api.ts",
  "../controllers/auth.controller.ts",
  "../controllers/dummy.controller.ts"
];


swaggerAutogen({ openapi: "3.0.0"})(outputFile, endpointFiles, doc);