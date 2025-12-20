import express from "express";
import router from "./routes/api";
import bodyParser from 'body-parser';
import db from "./utils/database";

async function init() {
  
  console.log("Server is starting...");

  try {

    const dbConnection = await db();
    console.log("database status:", dbConnection);
    
    const app = express();
    app.use(bodyParser.json());

    const PORT = 3000;

    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/api`);
    });

  } catch (error) {
    console.log(error);
  }

}

init();

