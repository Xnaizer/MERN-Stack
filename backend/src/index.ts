import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';
import db from './utils/database';
import docs from './docs/route';
import cors from 'cors';
import { PORT_VALUE } from './utils/env';
import job from './utils/cron';

async function init() {
  console.log('Server is starting...');

  try {
    const dbConnection = await db();
    console.log('database status:', dbConnection);

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    job.start();

    const PORT = PORT_VALUE;

    app.get('/', (req, res) => {
      res.status(200).json({
        status: 'success',
        message: 'server is running',
        data: null,
      });
    });

    app.use('/api', router);
    docs(app);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
