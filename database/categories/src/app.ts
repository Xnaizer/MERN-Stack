import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db";


const main = async () => {

    const mongoUri = process.env.MONGO_URI;
    const port = process.env.PORT;
    if(!mongoUri) throw new Error("Mongo url is missing")

    await connectDB(mongoUri);

    const app = express();
    app.use(express.json());

    app.get("/", (req,res) => {
        res.status(200).json({
            status: 200,
            message: "Server is running",
            data: null
        })
    })

}

main();