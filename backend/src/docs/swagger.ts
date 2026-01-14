import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../package.json';
import path from 'path';
import authDocsSchema from './auth.schema';
import mediaDocsSchema from './media.schema';
import categoryDocsSchema from './category.schema';
import eventDocsSchema from './event.schema';
import regionDocsSchema from './region.schema';

const isProd = process.env.NODE_ENV === 'production';

const routesPath = isProd
  ? path.resolve(__dirname, '../routes/*.js')
  : path.resolve(__dirname, '../routes/*.ts');

const controllersPath = isProd
  ? path.resolve(__dirname, '../controllers/*.js')
  : path.resolve(__dirname, '../controllers/*.ts');

const doc: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN Stack Backend API',
      description: 'Swagger Documentation for MERN Stack Backend API',
      version,
    },
    servers: [
      {
        url: isProd ? 'https://mern-stack-snowy.vercel.app/api' : 'http://localhost:3000/api',
        description: isProd ? 'Production Server' : 'Local Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token here (format: Bearer <token>)',
        },
      },
      schemas: {
        ...authDocsSchema,
        ...mediaDocsSchema,
        ...categoryDocsSchema,
        ...eventDocsSchema,
        ...regionDocsSchema,
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

console.log('🟢 Swagger scanning files:');
console.log('   Routes:', routesPath);
console.log('   Controllers:', controllersPath);
console.log('   Environment:', isProd ? 'Production' : 'Development');

export const swaggerSpec = swaggerJSDoc(doc);
