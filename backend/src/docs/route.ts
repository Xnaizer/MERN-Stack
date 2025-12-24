import type { Express, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./swagger";

export default function docs(app: Express) {

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css"
    }));

    app.get("/api-docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    })

}
