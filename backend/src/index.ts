import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/api';
import db from './utils/database';
import docs from './docs/route';
import cors from 'cors';

async function init() {
    
    try {

        const resultConnectDb = await db();
        console.log("Database Status: ", resultConnectDb);

        const app = express();

        app.use(cors());

        app.use(bodyParser.json());

        const PORT = 3000;

        app.get("/", (req, res) => {
            res.status(200).json({
                status: "success",
                message: "Server Is Running!",
                data: null
            })
        })


        app.use('/api', router);
        docs(app);

        app.listen(PORT, () => {
            console.log(`Hey teman!, Server Running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
}


init();
