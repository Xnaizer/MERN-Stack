import type { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

import fs from 'fs';
import path from 'path';

export default function docs(app: Express) {
  const css = fs.readFileSync(
    path.resolve(__dirname, '../../node_modules/swagger-ui-dist/swagger-ui.css'),
    'utf-8',
  );

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: css,
    }),
  );

  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
