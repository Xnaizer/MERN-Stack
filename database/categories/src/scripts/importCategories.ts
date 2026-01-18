import "dotenv/config";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { connectDB } from "../config/db";
import CategoryModel from "../models/Category.model";

type TCategory = {
    name: string;
    description: string;
    icon: string;
}

const main = async () => {
    const mongoUri = process.env.MONGO_URI;
    if(!mongoUri) throw new Error("MONGO_URI is missing")

    await connectDB(mongoUri);

    const filePath = path.join(process.cwd(), "data", "categories.json");
    const raw = await readFile(filePath, "utf-8");
    const items = JSON.parse(raw) as TCategory[];

    const result = await CategoryModel.insertMany(items, {
        ordered: false
    })

    process.stdout.write(
        JSON.stringify(
            {
                meta: {
                    status: 200,
                    message: "Import categories success"
                },
                data: {
                    inserted: result.length
                },
            },
            null,
            2
        ) + "\n"
    )

    process.exit(0)
}

main().catch((e) => {
    process.stderr.write(String(e) + "\n");
    process.exit(1);
})